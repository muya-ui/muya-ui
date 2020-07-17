import dayjs from 'dayjs';

import { act, renderHook } from '@testing-library/react-hooks';

import { IDateTimePickerProps } from './types';
import useDateTimePicker, { getTimeFormatByFormat } from './useDateTimePicker';

describe('测试 getTimeFormatByFormat', () => {
  test('默认值 或是传函数', () => {
    expect(getTimeFormatByFormat('YYYY-MM-DD HH:mm:ss')).toBe('HH:mm:ss');
    expect(getTimeFormatByFormat(() => false)).toBe('HH:mm:ss');
    expect(getTimeFormatByFormat('() => false')).toBe('HH:mm:ss');
  });

  test('HH:mm:ss', () => {
    expect(getTimeFormatByFormat('YYYY-MM-DD HH:mm:s')).toBe('HH:mm:s');
    expect(getTimeFormatByFormat('YYYY-MM-DD H:m:s')).toBe('H:m:s');
    expect(getTimeFormatByFormat('YYYY-MM-DD H-m-sss')).toBe('H-m-sss');
  });
  test('HH:mm', () => {
    expect(getTimeFormatByFormat('YYYY-MM-DD HH:mm')).toBe('HH:mm');
    expect(getTimeFormatByFormat('YYYY-MM-DD H:m')).toBe('H:m');
    expect(getTimeFormatByFormat('YYYY-MM-DD H-m')).toBe('H-m');
  });
  test('HH', () => {
    expect(getTimeFormatByFormat('YYYY-MM-DD HH')).toBe('HH');
    expect(getTimeFormatByFormat('YYYY-MM-DD H')).toBe('H');
  });
});

describe('测试 useDatePicker 基础的UI逻辑', () => {
  test('一般情况', () => {
    const onUIChange = jest.fn();
    const { result } = renderHook(() => useDateTimePicker({ onUIChange }));
    const today = dayjs();
    expect(result.current.finalUIState.viewDate.isSame(today, 'day')).toBe(true);
    expect(result.current.finalUIState.viewType).toBe('month');

    act(() => {
      const e = {};
      result.current.handleFocus(e as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.finalUIState.popupOpen).toBe(true);

    act(() => {
      result.current.handleClickAway();
    });
    expect(result.current.finalUIState.popupOpen).toBe(false);
    // 不报错
    result.current.handleClickAway();
  });

  test('受控', () => {
    const onUIChange = jest.fn();
    const { result } = renderHook((props: IDateTimePickerProps) => useDateTimePicker(props), {
      initialProps: {
        viewType: 'month',
        viewDate: dayjs('2020-02-11'),
        popupOpen: false,
        onUIChange,
      },
    });

    act(() => {
      result.current.handleCalendarUIChange({
        viewType: 'year',
        viewDate: dayjs('2020-04-11'),
        popupOpen: true,
      });
    });
    expect(onUIChange.mock.calls).toHaveLength(1);
  });
});

describe('测试 useDatePicker 参数处理 finalInputDate', () => {
  test('默认值', () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        defaultValue: '2020-05-09',
      }),
    );
    expect(result.current.finalUIState.viewDate.format('MM-DD')).toBe('05-09');
    expect(result.current.finalInputDate!.format('MM-DD')).toBe('05-09');
  });
  test('默认值不合法', () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        defaultValue: '2ss5-09',
      }),
    );
    expect(result.current.finalInputDate).toBe(undefined);
  });
  test('受控传 undefined', () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: undefined,
      }),
    );
    expect(result.current.finalInputDate).toBe(undefined);
  });
  test('受控传 不合法值', () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: 'undefined',
      }),
    );
    expect(result.current.finalInputDate).toBe(undefined);
  });
  test('受控传 合法值', () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: '2020-05-06',
      }),
    );
    expect(result.current.finalInputDate!.format('MM-DD')).toBe('05-06');
  });
});

describe('测试 useDatePicker 值变化', () => {
  test('handleConfirm', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useDateTimePicker({ onChange }));
    act(() => {
      result.current.handleConfirm(dayjs('2020-05-09'));
    });
    expect(result.current.finalInputDate!.format('MM-DD')).toBe('05-09');
  });

  test('handleClear', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDateTimePicker({ onChange, defaultValue: '2020-05-09' }),
    );
    act(() => {
      result.current.handleClear();
    });
    expect(result.current.finalInputDate).toBe(undefined);
  });
  test('handleCalendarChange', () => {
    const { result } = renderHook(() => useDateTimePicker({ defaultValue: '2020-05-09' }));
    act(() => {
      result.current.handleCalendarChange();
    });
    expect(result.current.finalInputDate).toBe(undefined);
    act(() => {
      result.current.handleCalendarChange(dayjs('2020-05-09'));
    });
    expect(result.current.calendarDate!.format('MM-DD')).toBe('05-09');
  });
});

test('自定义 format', () => {
  const { result } = renderHook(() =>
    useDateTimePicker({ defaultValue: '2020-05-09', format: () => 'xxx' }),
  );
  expect(result.current.finalValue).toBe('xxx');
});
