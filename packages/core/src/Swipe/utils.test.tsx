import { mount } from 'enzyme';
import React, { createRef } from 'react';
import mockConsole from 'test/utils/mockConsole';

import {
  calculateCloneNum,
  calculateSize,
  cloneChildren,
  getChildStyle,
  rectSizeEqual,
  transformItems,
} from './utils';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});
test('测试 rectSizeEqual', () => {
  expect(rectSizeEqual()).toBe(false);
  expect(rectSizeEqual({ width: 1, height: 1 }, { width: 2, height: 1 })).toBe(false);
  expect(rectSizeEqual({ width: 1, height: 1 }, { width: 1, height: 1 })).toBe(true);
});

test('测试 calculateCloneNum', () => {
  const items = [
    { width: 60, height: 10, top: 0, bottom: 10, right: 60, left: 0 },
    { width: 60, height: 10, top: 10, bottom: 20, right: 120, left: 60 },
    { width: 60, height: 10, top: 20, bottom: 30, right: 180, left: 120 },
    { width: 60, height: 10, top: 30, bottom: 40, right: 240, left: 180 },
  ];
  const n1 = calculateCloneNum(items, true, 100);
  expect(n1).toBe(2);
  const n2 = calculateCloneNum(items, false, 15);
  expect(n2).toBe(2);
});
test('测试 calculateSize', () => {
  const items = [
    { width: 60, height: 10, top: 0, bottom: 10, right: 60, left: 0 },
    { width: 60, height: 10, top: 0, bottom: 10, right: 120, left: 60 },
    { width: 60, height: 10, top: 0, bottom: 10, right: 180, left: 120 },
    { width: 60, height: 10, top: 0, bottom: 100, right: 240, left: 180 },
  ];
  const n1 = calculateSize(items, true);
  expect(n1).toBe(240);
  const n2 = calculateSize(items, false);
  expect(n2).toBe(100);
});

test('测试 transformItems', () => {
  const el = document.createElement('div');
  const items = [createRef<HTMLDivElement>()];
  (items[0] as any).current = el;
  const newItems = transformItems(items);
  expect(newItems[0]).toBeTruthy();
});

test('测试 cloneChildren with style', () => {
  const { nodes: res1, refs: items1 } = cloneChildren(
    [
      'sss',
      <div key="1" id="test">
        1
      </div>,
      <div key="2">2</div>,
    ],
    {
      width: 100,
      height: 100,
    },
  );
  const w1 = mount(<>{res1}</>);
  expect(items1).toHaveLength(2);
  expect(w1.find('#test').hostNodes()).toHaveLength(1);
  const { nodes: res2, refs: items2 } = cloneChildren([
    'sss',
    <div key="1" id="test">
      1
    </div>,
    <div key="2">2</div>,
  ]);
  const w2 = mount(<>{res2}</>);
  expect(items2).toHaveLength(2);
  expect(w2.find('#test').hostNodes()).toHaveLength(1);
});

test('测试 cloneChildren clone more items', () => {
  const { nodes, refs } = cloneChildren(
    [
      'sss',
      <div key="1" className="test">
        1
      </div>,
      <div key="2">2</div>,
    ],
    {
      width: 100,
      height: 100,
    },
    2,
  );
  const w1 = mount(<div>{nodes}</div>);
  expect(refs).toHaveLength(2);
  expect(w1.find('.test')).toHaveLength(2);
});

test('测试 cloneChildren clone 超过自身数量', () => {
  const { nodes, refs } = cloneChildren(
    [
      'sss',
      <div key="1" className="test">
        1
      </div>,
      <div key="2">2</div>,
    ],
    {
      width: 100,
      height: 100,
    },
    4,
  );
  const w1 = mount(<div>{nodes}</div>);
  expect(refs).toHaveLength(2);
  expect(w1.find('.test')).toHaveLength(3);
});

test('getChildStyle 水平等分', () => {
  expect(
    getChildStyle(
      true,
      {
        width: 100,
        height: 100,
      },
      2,
      0,
    ),
  ).toEqual({
    width: 50,
  });
});

test('getChildStyle 水平等分 gutter = 10', () => {
  expect(
    getChildStyle(
      true,
      {
        width: 100,
        height: 100,
      },
      2,
      10,
    ),
  ).toEqual({
    marginRight: 10,
    width: 45,
  });
});

test('getChildStyle 垂直等分', () => {
  expect(
    getChildStyle(
      false,
      {
        width: 100,
        height: 100,
      },
      2,
      0,
    ),
  ).toEqual({
    height: 50,
  });
});
