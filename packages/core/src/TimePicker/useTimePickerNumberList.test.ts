import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import * as scrollIntoViewMod from '../utils/scrollIntoView';
import useTimePickerNumberList from './useTimePickerNumberList';

test('测试 useTimePickerNumberList 基础的UI逻辑', () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();
  const { result } = renderHook(() =>
    useTimePickerNumberList({
      label: 'sss',
      disableNum(num) {
        return num > 10;
      },
    }),
  );

  expect(result.current.items[11].disabled).toBe(true);
  (result.current.selectedRef as any).current = {};
  (result.current.scrollContainerRef as any).current = {};
  act(() => {
    result.current.items[1].handleClick();
  });
  expect(result.current.finalSelected).toBe(1);

  expect(() => {
    sinon.assert.calledOnce(scrollIntoView);
  }).not.toThrow();

  scrollIntoView.restore();
});

test('测试 useTimePickerNumberList 受控', () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();
  const onChange = sinon.spy();
  const { result } = renderHook(() =>
    useTimePickerNumberList({
      label: 'sss',
      selected: 8,
      hideDisabledNum: true,
      onChange,
      step: 2,
      disableNum(num) {
        return num > 10;
      },
    }),
  );

  expect(result.current.finalSelected).toBe(8);
  expect(result.current.items).toHaveLength(6);
  result.current.items[4].handleClick();
  act(() => {
    result.current.items[1].handleClick();
  });
  expect(() => {
    sinon.assert.calledOnce(onChange);
  }).not.toThrow();
  scrollIntoView.restore();
});
