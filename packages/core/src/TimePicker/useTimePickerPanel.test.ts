import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import * as scrollIntoViewMod from '../utils/scrollIntoView';
import useTimePickerPanel from './useTimePickerPanel';

test('测试 useTimePickerPanel 默认空状态', () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();
  const { result } = renderHook(() => useTimePickerPanel({}));
  expect(result.current.selectedHour).toBe(-1);
  expect(result.current.selectedMinute).toBe(-1);
  expect(result.current.selectedSecond).toBe(-1);

  // expect(() => {
  //   sinon.assert.calledOnce(scrollIntoView);
  // }).not.toThrow();

  scrollIntoView.restore();
});

test('测试 useTimePickerPanel 受控', () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();

  const onChange = sinon.spy();

  const disabledHours = (num: number) => {
    return num > 1 && num < 10;
  };
  const disabledMinutes = (selectedHour: number) => (num: number) => {
    return selectedHour === 13 && num > 1 && num < 10;
  };

  const disabledSeconds = (selectedHour: number, selectedMinute: number) => (num: number) => {
    return selectedHour === 14 && selectedMinute === 5 && num > 1 && num < 10;
  };
  const { result, rerender } = renderHook(
    ({ value }: { value: string }) =>
      useTimePickerPanel({
        value,
        onChange,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
      }),
    {
      initialProps: {
        value: '2020-1-1 12:11:11',
      },
    },
  );
  expect(result.current.selectedHour).toBe(12);
  expect(result.current.selectedMinute).toBe(11);
  expect(result.current.selectedSecond).toBe(11);

  rerender({ value: '2020-1-1 12:11:12' });

  act(() => {
    result.current.handleMinuteChange(30);
  });

  expect(() => {
    sinon.assert.calledOnce(onChange);
  }).not.toThrow();

  scrollIntoView.restore();
});
