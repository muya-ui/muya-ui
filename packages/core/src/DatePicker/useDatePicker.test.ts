import dayjs from 'dayjs';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useDatePicker from './useDatePicker';

test('测试 useDatePicker 基础的UI逻辑', () => {
  const blurFn = sinon.spy();
  const { result } = renderHook(() => useDatePicker({}));
  const today = dayjs();
  expect(result.current.finalUIState.viewDate.isSame(today, 'day')).toBe(true);
  expect(result.current.finalUIState.viewType).toBe('month');
  (result.current.innerInputRef.current as any) = {
    blur: blurFn,
  };

  act(() => {
    const e = {};

    result.current.handleFocus(e as React.FocusEvent<HTMLInputElement>);
  });
  expect(result.current.finalUIState.popupOpen).toBe(true);

  act(() => {
    result.current.handleClickAway();
  });
  expect(result.current.finalUIState.popupOpen).toBe(false);

  act(() => {
    result.current.handlePressEnter();
  });

  expect(() => {
    sinon.assert.calledOnce(blurFn);
  }).not.toThrow();
});

test('测试 useDatePicker input 输入的逻辑', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useDatePicker({
      inputDelay: 10,
    }),
  );

  act(() => {
    const e = {};
    result.current.handleFocus(e as React.FocusEvent<HTMLInputElement>);
  });
  act(() => {
    const e = {
      target: {
        value: '2020-1-10',
      },
    };
    result.current.handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
  });
  await waitForNextUpdate();
  expect(result.current.finalValue).toBe('2020-1-10');

  act(() => {
    result.current.handlePressEnter();
  });
  expect(result.current.finalValue).toBe('2020-01-10');
});

test('测试 useDatePicker calendar change', async () => {
  const onChange = sinon.spy();
  const onDateChange = sinon.spy();
  const onUIChange = sinon.spy();
  const { result } = renderHook(() =>
    useDatePicker({
      onChange,
      onDateChange,
      onUIChange,
    }),
  );

  act(() => {
    result.current.handleCalendarChange(dayjs('2020-01-11'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2020-01-11');

  act(() => {
    result.current.handleCalendarUIChange({
      viewType: 'month',
      viewDate: dayjs('2020-01-01'),
    });
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2020-01-01');

  act(() => {
    result.current.handleClear();
  });
  expect(result.current.finalSelectedDate).toBe(undefined);

  expect(() => {
    sinon.assert.called(onChange);
    sinon.assert.called(onDateChange);
    sinon.assert.called(onUIChange);
  }).not.toThrow();
});

test('测试 useDatePicker 受控', async () => {
  const onChange = sinon.spy();
  const onDateChange = sinon.spy();
  const onUIChange = sinon.spy();
  const { result, waitForNextUpdate } = renderHook(() =>
    useDatePicker({
      onChange,
      onDateChange,
      onUIChange,
      popupOpen: false,
      value: '2020-01-12',
    }),
  );
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2020-01-12');

  act(() => {
    const e = {};
    result.current.handleFocus(e as React.FocusEvent<HTMLInputElement>);
  });

  expect(result.current.finalUIState.popupOpen).toBe(false);

  act(() => {
    result.current.handleCalendarChange(dayjs('2020-01-11'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2020-01-12');

  act(() => {
    const e = {
      target: {
        value: 'ssssssss',
      },
    };
    result.current.handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
  });
  await waitForNextUpdate();
  expect(result.current.finalValue).toBe('2020-01-12');

  expect(() => {
    sinon.assert.called(onChange);
    sinon.assert.called(onDateChange);
    sinon.assert.called(onUIChange);
  }).not.toThrow();
});
