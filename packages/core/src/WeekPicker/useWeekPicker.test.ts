import dayjs from 'dayjs';
import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import useWeekPicker from './useWeekPicker';
import { formatWeek } from './utils';

test('测试 useWeekPicker 基础的UI逻辑', () => {
  const onUIChange = jest.fn();
  const { result } = renderHook(() =>
    useWeekPicker({
      onUIChange,
    }),
  );
  const today = dayjs();
  expect(result.current.finalUIState.viewDate.isSame(today, 'day')).toBe(true);
  expect(result.current.finalUIState.viewType).toBe('month');

  act(() => {
    result.current.handleFocus({});
  });
  expect(result.current.finalUIState.popupOpen).toBe(true);

  act(() => {
    result.current.handleCalendarUIChange({
      viewType: 'decade',
    });
  });
  expect(result.current.finalUIState.popupOpen).toBe(true);
  expect(result.current.finalUIState.viewType).toBe('decade');

  act(() => {
    result.current.handleClickAway();
  });
  act(() => {
    result.current.handleClickAway();
  });
  expect(result.current.finalUIState.popupOpen).toBe(false);
  expect(onUIChange.mock.calls).toHaveLength(3);
});

test('选中逻辑', () => {
  const { result } = renderHook(() => useWeekPicker({}));
  act(() => {
    result.current.handleCalendarChange(formatWeek('2020-06-09'));
  });
  expect(result.current.finalSelectedWeek![0].format('MM-DD')).toBe('06-08');

  act(() => {
    result.current.handleClear();
  });
  expect(result.current.finalSelectedWeek).toBe(undefined);
});

test('受控逻辑', () => {
  const onChange = jest.fn();
  const { result } = renderHook(() =>
    useWeekPicker({
      value: '2020-06-08',
      defaultValue: '2020-06-08',
      onChange,
    }),
  );
  act(() => {
    result.current.handleCalendarChange(formatWeek('2020-06-22'));
    result.current.handleCalendarChange();
  });
  const changeWeek1 = onChange.mock.calls[0][0];
  const changeWeek2 = onChange.mock.calls[1][0];
  expect(changeWeek1[0].format('MM-DD')).toBe('06-22');
  expect(changeWeek2[0].isValid()).toBe(false);
});

test('format', () => {
  const { result } = renderHook(() =>
    useWeekPicker({
      format() {
        return '111';
      },
    }),
  );
  expect(result.current.formatWeekStr()).toBe('');
});
