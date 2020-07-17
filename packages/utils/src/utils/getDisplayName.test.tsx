import React, { Ref } from 'react';

import getDisplayName from './getDisplayName';

describe('测试 getDisplayName', () => {
  test('gets the display name of a React component', () => {
    class SomeComponent extends React.Component {
      render() {
        return <div />;
      }
    }

    class SomeOtherComponent extends React.Component {
      static displayName = 'CustomDisplayName';

      render() {
        return <div />;
      }
    }

    function YetAnotherComponent() {
      return <div />;
    }

    const AndAnotherComponent = () => <div />;

    const AnonymousForwardRefComponent = React.forwardRef((props, ref: Ref<HTMLDivElement>) => (
      <div {...props} ref={ref} />
    ));

    const ForwardRefComponent = React.forwardRef(function Div(props, ref: Ref<HTMLDivElement>) {
      return <div {...props} ref={ref} />;
    });

    const NamedForwardRefComponent = React.forwardRef((props, ref: Ref<HTMLDivElement>) => (
      <div {...props} ref={ref} />
    ));
    NamedForwardRefComponent.displayName = 'Div';

    expect(getDisplayName(SomeComponent)).toBe('SomeComponent');
    expect(getDisplayName(SomeOtherComponent)).toBe('CustomDisplayName');
    expect(getDisplayName(YetAnotherComponent)).toBe('YetAnotherComponent');
    expect(getDisplayName(AndAnotherComponent)).toBe('AndAnotherComponent');
    expect(getDisplayName(() => <div />)).toBe('Component');
    expect(getDisplayName('div')).toBe('div');
    expect(getDisplayName(AnonymousForwardRefComponent)).toBe('ForwardRef');
    expect(getDisplayName(ForwardRefComponent)).toBe('ForwardRef(Div)');
    expect(getDisplayName(NamedForwardRefComponent)).toBe('Div');
    expect(getDisplayName(null)).toBe(undefined);
    expect(getDisplayName({})).toBe(undefined);
    expect(getDisplayName(false)).toBe(undefined);
  });
});
