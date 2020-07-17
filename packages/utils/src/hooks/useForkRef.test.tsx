import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import useForkRef, { forkRef, setRef } from './useForkRef';

describe('setRef', () => {
  test('can handle callback refs', () => {
    const ref = sinon.spy();
    const instance = 'proxy';

    setRef(ref, instance);

    expect(() => {
      sinon.assert.called(ref);
    }).not.toThrow();
    expect(() => {
      sinon.assert.calledWith(ref, instance);
    }).not.toThrow();
  });

  test('can handle ref objects', () => {
    const ref = React.createRef();
    const instance = 'proxy';

    setRef(ref, instance);

    expect(ref.current).toBe(instance);
  });

  test('ignores falsy refs without errors', () => {
    const instance = 'proxy';

    expect(() => {
      // all no-ops
      setRef(undefined, instance);
      setRef(null, instance);
    }).not.toThrow();
  });
});

describe('forkRef', () => {
  test('can handle callback refs', () => {
    const refA = React.createRef<number>();
    const refB = React.createRef<number>();
    const hanldeRef = forkRef(refA, refB);
    hanldeRef(2);
    expect(refA.current).toBe(2);
    expect(refB.current).toBe(2);
  });
});

describe('useForkRef', () => {
  beforeAll(() => {
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('returns a single ref-setter function that forks the ref to its inputs', () => {
    function Component(props: any) {
      const { innerRef } = props;
      const ownRef = React.useRef(null);
      const [n, forceUpdate] = React.useState(0);
      React.useEffect(() => {
        if (!n) {
          forceUpdate(1);
        }
      }, [n]);

      const handleRef = useForkRef(innerRef, ownRef);

      return <div ref={handleRef}>{ownRef.current ? 'has a ref' : 'has no ref'}</div>;
    }

    const outerRef = React.createRef<HTMLDivElement>();
    mount(<Component innerRef={outerRef} />);
    expect(outerRef.current!.textContent).toBe('has a ref');

    // assert.strictEqual(consoleErrorMock.callCount(), 0);
  });

  test('forks if only one of the branches requires a ref', () => {
    const Component = React.forwardRef((props, ref) => {
      const [hasRef, setHasRef] = React.useState(false);
      const handleOwnRef = React.useCallback(() => {
        setHasRef(true);
      }, []);
      const handleRef = useForkRef(handleOwnRef, ref);

      return (
        <div ref={handleRef} {...props}>
          {String(hasRef)}
        </div>
      );
    });

    const wrapper = mount(<Component />);
    expect(wrapper.containsMatchingElement(<div>true</div>)).toBe(true);
  });

  test('does nothing if none of the forked branches requires a ref', () => {
    const Outer = React.forwardRef<any, { children: any }>(function Outer(props, ref) {
      const { children } = props;
      const handleRef = useForkRef(children.ref, ref);

      return React.cloneElement(children, { ref: handleRef });
    });

    function Inner() {
      return <div />;
    }

    mount(
      <Outer>
        <Inner />
      </Outer>,
    );
  });
});

describe('changing refs', () => {
  // use named props rather than ref attribute because enzyme ignores
  // ref attributes on the root component
  function Div(props: any) {
    const { leftRef, rightRef, ...other } = props;
    const handleRef = useForkRef<HTMLDivElement>(leftRef, rightRef);

    return <div {...other} ref={handleRef} />;
  }

  test('handles changing from no ref to some ref', () => {
    const wrapper = mount(<Div id="test" />);

    // assert.strictEqual(consoleErrorMock.callCount(), 0);

    const ref = React.createRef<HTMLDivElement>();
    wrapper.setProps({ leftRef: ref });
    expect(ref.current!.id).toBe('test');
  });

  test('cleans up detached refs', () => {
    const firstLeftRef = React.createRef<HTMLDivElement>();
    const firstRightRef = React.createRef<HTMLDivElement>();
    const secondRightRef = React.createRef<HTMLDivElement>();

    const wrapper = mount(<Div leftRef={firstLeftRef} rightRef={firstRightRef} id="test" />);

    expect(firstLeftRef.current!.id).toBe('test');
    expect(firstRightRef.current!.id).toBe('test');
    expect(secondRightRef.current).toBe(null);

    wrapper.setProps({ rightRef: secondRightRef });

    expect(firstLeftRef.current!.id).toBe('test');
    expect(firstRightRef.current).toBe(null);
    expect(secondRightRef.current!.id).toBe('test');
  });
});
