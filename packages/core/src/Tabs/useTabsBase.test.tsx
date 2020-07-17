import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useTabsBase, { getItemDividerStatus } from './useTabsBase';

describe('getItemDividerStatus', () => {
  const configs = [
    { selected: false, index: 0 },
    { selected: true, index: 1 },
    { selected: false, index: 2 },
    { selected: false, index: 3 },
  ];
  test('当前项选中，则 divider = "off" ', () => {
    expect(getItemDividerStatus(configs, 1)).toBe('off');
  });

  test('最后一项，则 divider = "off" ', () => {
    expect(getItemDividerStatus(configs, 3)).toBe('off');
  });

  test('下一项是选中的时候，则 divider = "off" ', () => {
    expect(getItemDividerStatus(configs, 0)).toBe('off');
  });

  test('其他情况是 undefined', () => {
    expect(getItemDividerStatus(configs, 2)).toBe(undefined);
  });
});

describe('测试默认值', () => {
  test('什么都不设置', async () => {
    const { result } = renderHook(() =>
      useTabsBase({
        children: [<div key={0}>1</div>, <div key={1}>2</div>],
      }),
    );

    expect(result.current.finalIndex).toBe(0);
    expect(result.current.items).toHaveLength(2);
    expect(result.current.selectedIndex).toBe(0);
  });

  test('设置 defaultIndex ', async () => {
    const { result } = renderHook(() =>
      useTabsBase({
        defaultIndex: 1,
        children: [<div key={0}>1</div>, <div key={1}>2</div>],
      }),
    );

    expect(result.current.finalIndex).toBe(1);
  });

  test('设置 index ', async () => {
    const { result } = renderHook(() =>
      useTabsBase({
        index: 1,
        children: [<div key={0}>1</div>, <div key={1}>2</div>],
      }),
    );

    expect(result.current.finalIndex).toBe(1);
  });
});

test('测试 useTabsBase 有不合法的 element', async () => {
  const { result } = renderHook(() =>
    useTabsBase({
      children: ['ss', <div key={0}>1</div>, <div key={1}>2</div>],
    }),
  );
  expect(result.current.items).toHaveLength(2);
});

test('测试 useTabsBase 受控情况', async () => {
  const { result } = renderHook(() =>
    useTabsBase({
      children: [<div key={0}>1</div>, <div key={1}>2</div>],
      type: 'card',
      index: 0,
    }),
  );

  expect(result.current.finalIndex).toBe(0);
});

test('测试 useTabsBase updateIndex', async () => {
  const { result } = renderHook(() =>
    useTabsBase({
      children: [<div key={0}>1</div>, <div key={1}>2</div>],
      type: 'card',
    }),
  );

  act(() => {
    result.current.updateIndex(1);
  });
  expect(result.current.finalIndex).toBe(1);
});

describe('测试 Tab onClick', () => {
  test('正常的点击切换', () => {
    const onClick = sinon.spy();
    const onChange = sinon.spy();
    const Comp = React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const { children } = props;
      const { children: resultChildren } = useTabsBase({
        children,
        onChange,
        type: 'card',
      });

      return <div ref={ref}>{resultChildren}</div>;
    });

    const wrapper = mount(
      <Comp>
        111
        <div>1</div>
        <div>2</div>
        <div id="test2">3</div>
        <div id="test1" onClick={onClick}>
          4
        </div>
      </Comp>,
    );
    const n = wrapper.find('#test1');
    n.simulate('click');
    n.simulate('click');
    expect(() => {
      sinon.assert.calledTwice(onClick);
      sinon.assert.calledOnce(onChange);
    }).not.toThrow();
  });
});
