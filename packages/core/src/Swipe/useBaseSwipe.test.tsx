import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useBaseSwipe from './useBaseSwipe';
import * as utils from './utils';

interface IProps {
  enableDiffChildren: boolean;
  children: React.ReactNode;
}
test('测试 useBaseSwipe 一般情况情况', async () => {
  const containerRef = React.createRef<HTMLDivElement>();
  (containerRef as any).current = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };
  const onRectChange = sinon.spy();
  const transformItems = sinon.stub(utils, 'transformItems');
  transformItems.returns([]);

  const defaultChildren = [<div key="1">1</div>, <div key="2">2</div>];
  const { result, rerender } = renderHook(
    ({ enableDiffChildren, children }: IProps) =>
      useBaseSwipe({
        containerRef,
        enableDiffChildren,
        children,
        onRectChange,
      }),
    {
      initialProps: {
        enableDiffChildren: false,
        children: defaultChildren,
      },
    },
  );

  expect(result.current.state.status).toBe('done');
  rerender({
    enableDiffChildren: false,
    children: defaultChildren,
  });

  expect(() => {
    sinon.assert.calledOnce(onRectChange);
  }).not.toThrow();
  rerender({
    enableDiffChildren: true,
    children: [],
  });

  expect(() => {
    sinon.assert.calledTwice(onRectChange);
  }).not.toThrow();

  transformItems.restore();
});

test('测试 useBaseSwipe loop=true', async () => {
  const containerRef = React.createRef<HTMLDivElement>();
  let rect = {
    width: 100,
    height: 100,
  };
  (containerRef as any).current = {
    getBoundingClientRect() {
      return rect;
    },
  };
  const onRectChange = sinon.spy();
  const transformItems = sinon.stub(utils, 'transformItems');
  transformItems.returns([]);
  const calculateSize = sinon.stub(utils, 'calculateSize');
  calculateSize.returns(200);
  const calculateCloneNum = sinon.stub(utils, 'calculateCloneNum');
  calculateCloneNum.returns(10);

  const { result } = renderHook(() =>
    useBaseSwipe({
      containerRef,
      children: [<div key="1">1</div>, <div key="2">2</div>],
      loop: true,
      onRectChange,
    }),
  );

  // 直接调用不报错
  await result.current.shouldUpdateContainer();
  rect = {
    width: 101,
    height: 100,
  };
  await act(async () => {
    await result.current.shouldUpdateContainer();
  });

  transformItems.restore();
});
