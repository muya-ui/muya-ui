import dayjs from 'dayjs';

import { act, renderHook } from '@testing-library/react-hooks';

import { IDateTimeCalendarProps } from './innerTypes';
import useDateTimeCalendar, {
  transformDateByDate,
  transformDateByTime,
} from './useDateTimeCalendar';

test('useDateTimeCalendar UI 逻辑测试', () => {
  const { result, rerender } = renderHook(
    (props: IDateTimeCalendarProps) => useDateTimeCalendar(props),
    {
      initialProps: {
        defaultViewDate: '2019-09-11',
      },
    },
  );
  expect(result.current.calendarState.finalUIState.viewDate.format('YYYY-MM-DD')).toBe(
    '2019-09-11',
  );
  expect(result.current.calendarState.finalUIState.viewType).toBe('month');

  act(() => {
    result.current.calendarState.handleSwitch('year');
  });
  expect(result.current.calendarState.finalUIState.viewType).toBe('year');

  act(() => {
    result.current.calendarState.handleNextMonth();
  });
  expect(result.current.calendarState.finalUIState.viewDate.format('YYYY-MM-DD')).toBe(
    '2019-10-11',
  );

  rerender({
    viewType: 'month',
    viewDate: dayjs('2020-06-01'),
  });
  expect(result.current.calendarState.finalUIState.viewDate.format('MM-DD')).toBe('06-01');
});

test('useDateTimeCalendar 操作值', () => {
  const { result } = renderHook((props: IDateTimeCalendarProps) => useDateTimeCalendar(props), {
    initialProps: {
      defaultViewDate: '2020-06-11',
    },
  });
  act(() => {
    result.current.handleTimeChange(dayjs('2020-06-11 10:11:11'));
  });
  expect(result.current.finalValue!.format('MM-DD HH:mm:ss')).toBe('06-11 10:11:11');
  act(() => {
    result.current.handleDateChange(dayjs('2020-06-12 12:11:11'));
  });
  expect(result.current.finalValue!.format('MM-DD HH:mm:ss')).toBe('06-12 10:11:11');
  act(() => {
    result.current.handleClear();
  });
  act(() => {
    result.current.handleDateChange(dayjs('2020-06-12 12:11:11'));
  });
  expect(result.current.finalValue!.format('MM-DD')).toBe('06-12');
  act(() => {
    result.current.handleDateChange();
  });
  expect(result.current.finalValue).toBe(undefined);
});

describe('useDateTimeCalendar 默认值处理', () => {
  test('defaultDate', () => {
    const { result } = renderHook(() =>
      useDateTimeCalendar({
        defaultDate: '2020-06-11 10:11:11',
      }),
    );
    expect(result.current.finalValue!.format('MM-DD HH:mm:ss')).toBe('06-11 10:11:11');
  });

  test('defaultDate isValid() === false', () => {
    const { result } = renderHook(() =>
      useDateTimeCalendar({
        defaultDate: 'xxx',
      }),
    );
    expect(result.current.finalValue).toBe(undefined);
  });

  test('isControlled selectedDate === "" ', () => {
    const { result } = renderHook(() =>
      useDateTimeCalendar({
        selectedDate: '',
      }),
    );
    expect(result.current.finalValue).toBe(undefined);
  });

  test('isControlled selectedDate.isValid() === false', () => {
    const { result } = renderHook(() =>
      useDateTimeCalendar({
        selectedDate: 'xxxxx',
      }),
    );
    expect(result.current.finalValue).toBe(undefined);
  });

  test('isControlled selectedDate.isValid() === true', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onSelect = jest.fn();
    const onConfirm = jest.fn();
    const { result } = renderHook(() =>
      useDateTimeCalendar({
        selectedDate: '2020-07-10',
        onChange,
        onClear,
        onSelect,
        onConfirm,
      }),
    );
    expect(result.current.finalValue!.format('MM-DD')).toBe('07-10');
    act(() => {
      result.current.updateValue();
    });
    act(() => {
      result.current.updateValue(dayjs('2020-08-10'));
    });
    expect(onChange.mock.calls).toHaveLength(2);
    expect(onClear.mock.calls).toHaveLength(1);
    expect(onSelect.mock.calls).toHaveLength(1);

    //
    result.current.handleConfirm();
    expect(onConfirm.mock.calls[0][0].format('MM-DD')).toBe('07-10');
  });
});

describe('测试日期转化', () => {
  test('transformDateByTime', () => {
    const now = dayjs();
    expect(transformDateByTime(dayjs('2020-06-07 20:11:11'), 'now').format('HH:mm')).toBe(
      now.format('HH:mm'),
    );
    expect(transformDateByTime(dayjs('2020-06-07 20:11:11'), '11:11:11').format('HH:mm')).toBe(
      '11:11',
    );
  });
  test('transformDateByDate', () => {
    expect(
      transformDateByDate(dayjs('2020-06-07 20:11:11'), dayjs('2020-06-07 11:11:11')).format(
        'HH:mm',
      ),
    ).toBe('11:11');
  });
});
