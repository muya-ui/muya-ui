import dayjs from 'dayjs';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { IRangeInputElement } from '../Input';
import useRangeDatePicker from './useRangeDatePicker';

test('测试 useRangeDatePicker 基础的UI逻辑', () => {
  const inputRef = React.createRef<IRangeInputElement>();
  const blurFn = sinon.spy();
  (inputRef as any).current = {
    blur: blurFn,
  };
  const { result } = renderHook(() => useRangeDatePicker({}, inputRef));
  const today = dayjs();
  expect(result.current.finalUIState.viewDate[0].isSame(today, 'day')).toBe(true);
  expect(result.current.finalUIState.viewType[0]).toBe('month');

  act(() => {
    const e = {};

    result.current.handleFocus(e as React.FocusEvent<IRangeInputElement>);
  });
  expect(result.current.finalUIState.popupOpen).toBe(true);

  act(() => {
    result.current.handleClickAway();
  });
  expect(result.current.finalUIState.popupOpen).toBe(false);
  act(() => {
    result.current.handleClickAway();
  });
  expect(result.current.finalUIState.popupOpen).toBe(false);

  act(() => {
    result.current.handlePressEnter();
  });

  expect(() => {
    sinon.assert.calledTwice(blurFn);
  }).not.toThrow();
});

test('测试 useRangeDatePicker input 输入的逻辑', async () => {
  const inputRef = React.createRef<IRangeInputElement>();
  const { result, waitForNextUpdate } = renderHook(() =>
    useRangeDatePicker(
      {
        inputDelay: 10,
      },
      inputRef,
    ),
  );

  act(() => {
    const e = {};
    result.current.handleFocus(e as React.FocusEvent<IRangeInputElement>);
  });

  act(() => {
    result.current.handleInputChange({
      value: ['2020-1-10', 'sdfs'],
    });
  });
  await waitForNextUpdate();
  expect(result.current.finalValue).toEqual(['2020-1-10', 'sdfs']);
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2020-01-10');

  act(() => {
    result.current.handleInputChange({
      value: ['sdfs', '2020-1-1'],
    });
  });
  await waitForNextUpdate();
  expect(result.current.finalValue).toEqual(['sdfs', '2020-1-1']);
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2020-01-01');

  act(() => {
    result.current.handleInputChange({
      value: ['2020-1-10', '2020-1-12'],
    });
  });
  await waitForNextUpdate();
  expect(result.current.finalValue).toEqual(['2020-1-10', '2020-1-12']);

  act(() => {
    result.current.handlePressEnter();
  });
  expect(result.current.finalValue).toEqual(['2020-01-10', '2020-01-12']);
});

test('测试 useRangeDatePicker calendar change', async () => {
  const inputRef = React.createRef<IRangeInputElement>();
  const onChange = sinon.spy();
  const onDateChange = sinon.spy();
  const onUIChange = sinon.spy();
  const { result } = renderHook(() =>
    useRangeDatePicker(
      {
        onChange,
        onDateChange,
        onUIChange,
      },
      inputRef,
    ),
  );

  act(() => {
    result.current.handleCalendarChange({
      start: dayjs('2020-01-11'),
      end: dayjs('2020-01-12'),
      range: [dayjs('2020-01-11'), dayjs('2020-01-12')],
    });
  });
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2020-01-11');
  expect(result.current.finalState.end!.format('YYYY-MM-DD')).toBe('2020-01-12');

  act(() => {
    result.current.handleCalendarUIChange({
      viewType: ['month', 'month'],
      viewDate: [dayjs('2020-01-01'), dayjs('2020-01-01')],
    });
  });
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2020-02-01');

  act(() => {
    result.current.handleClear();
  });
  expect(result.current.finalState.start).toBe(undefined);
  expect(result.current.finalState.end).toBe(undefined);

  expect(() => {
    sinon.assert.called(onChange);
    sinon.assert.called(onDateChange);
    sinon.assert.called(onUIChange);
  }).not.toThrow();
});

test('测试 useRangeDatePicker checkLeftValue checkRightValue', async () => {
  const inputRef = React.createRef<IRangeInputElement>();
  const { result, rerender } = renderHook(() =>
    useRangeDatePicker(
      {
        disableDate(date) {
          return date.format('YYYY') === '2020';
        },
      },
      inputRef,
    ),
  );
  expect(result.current.checkLeftValue('2020-01-11')[0]).toBe(false);
  expect(result.current.checkRightValue('2020-01-11')[0]).toBe(false);

  rerender({
    fixedStartDate: '2020-06-01',
  });
  expect(result.current.checkLeftValue('2020-01-11')[0]).toBe(false);
  expect(result.current.checkRightValue('2020-01-11')[0]).toBe(false);

  rerender({
    fixedEndDate: '2019-06-01',
  });
  expect(result.current.checkLeftValue('2020-01-11')[0]).toBe(false);
  expect(result.current.checkRightValue('2020-01-11')[0]).toBe(false);
});
