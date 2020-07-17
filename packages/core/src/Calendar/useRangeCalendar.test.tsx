import dayjs from 'dayjs';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { en_US, LocaleProvider, zh_CN } from '../Locale';
import { IRangeCalendarProps } from './types';
import useRangeCalendar, {
  formatRangeState, getFixedState, getStateFromProps, getUIStateFromProps, updateRangeViewDate,
  updateRangeViewType
} from './useRangeCalendar';

describe('useRangeCalendar # getUIStateFromProps', () => {
  test('正常情况', () => {
    const state1 = getUIStateFromProps({});
    expect(state1.viewType).toEqual(['month', 'month']);
    expect(state1.viewDate[0].isSame(dayjs(), 'day')).toBe(true);

    const state2 = getUIStateFromProps({
      viewType: ['month', 'decade'],
    });
    expect(state2.viewType).toEqual(['month', 'decade']);

    const state3 = getUIStateFromProps({
      range: ['2020-01-01', '2020-01-02'],
    });
    expect(state3.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');

    const state4 = getUIStateFromProps({
      defaultRange: ['2020-01-01', '2020-01-02'],
    });
    expect(state4.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');

    const state5 = getUIStateFromProps({
      viewDate: ['2020-01-01', '2020-01-02'],
    });
    expect(state5.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');

    const state5_1 = getUIStateFromProps({
      defaultViewDate: ['2020-01-01', '2020-01-02'],
    });
    expect(state5_1.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');
  });

  test('fixed start or end', () => {
    const state1 = getUIStateFromProps({}, dayjs('2020-01-01'));
    expect(state1.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');

    const state2 = getUIStateFromProps({}, undefined, dayjs('2020-01-01'));
    expect(state2.viewDate[1].format('YYYY-MM-DD')).toBe('2020-01-01');
  });

  test('有 start 或者 end 的情况', () => {
    const state1 = getUIStateFromProps({
      start: '2020-01-01',
      end: '2020-01-10',
    });
    expect(state1.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');
    const state2 = getUIStateFromProps({
      start: '2020-01-01',
    });
    expect(state2.viewDate[0].format('YYYY-MM-DD')).toBe('2020-01-01');
    const state3 = getUIStateFromProps({
      end: '2020-01-01',
    });
    expect(state3.viewDate[0].format('YYYY-MM-DD')).toBe('2019-12-01');
  });
});

test('useRangeCalendar # getStateFromProps', () => {
  const state1 = getStateFromProps({});
  expect(state1).toEqual({});

  const state1_1 = getStateFromProps({
    defaultRange: ['2020-01-03'],
  });
  expect(state1_1).toEqual({});

  const state2 = getStateFromProps({
    defaultRange: ['2020-01-03', '2020-01-02'],
  });
  expect(state2.start!.format('YYYY-MM-DD')).toEqual('2020-01-02');
  expect(state2.end!.format('YYYY-MM-DD')).toEqual('2020-01-03');

  const state3 = getStateFromProps({
    start: '2020-01-03',
  });
  expect(state3.start!.format('YYYY-MM-DD')).toEqual('2020-01-03');

  const state4 = getStateFromProps({
    end: '2020-01-03',
  });
  expect(state4.end!.format('YYYY-MM-DD')).toEqual('2020-01-03');
});

test('useRangeCalendar # getFixedState', () => {
  const state1 = getFixedState({});
  expect(state1).toEqual({});

  const state2 = getFixedState({}, dayjs('2020-01-01'));
  expect(state2.start!.format('YYYY-MM-DD')).toEqual('2020-01-01');

  const state3 = getFixedState({}, undefined, dayjs('2020-01-01'));
  expect(state3.end!.format('YYYY-MM-DD')).toEqual('2020-01-01');
});

test('useRangeCalendar # updateRangeViewType', () => {
  const result = updateRangeViewType(0, ['month', 'month'], 'year');
  expect(result).toEqual(['year', 'month']);

  const result1 = updateRangeViewType(1, ['month', 'month'], 'year');
  expect(result1).toEqual(['month', 'year']);
});

test('useRangeCalendar # updateRangeViewDate', () => {
  const result = updateRangeViewDate(
    0,
    [dayjs('2018-10-11'), dayjs('2018-10-11')],
    dayjs('2018-10-12'),
  );
  expect(result[0].isSame(dayjs('2018-10-12'), 'day')).toBe(true);
  expect(result[1].isSame(dayjs('2018-10-11'), 'day')).toBe(true);
});

test('useRangeCalendar # formatRangeState', () => {
  const result1 = formatRangeState({}, 'date');
  expect(result1).toEqual({});

  const result2 = formatRangeState(
    {
      start: dayjs('2019-01-01'),
    },
    'date',
  );
  expect(result2.start!.format('YYYY-MM-DD HH:mm:ss SSS')).toBe('2019-01-01 00:00:00 000');

  const result3 = formatRangeState(
    {
      start: dayjs('2019-01-01'),
      range: [dayjs('2019-01-01'), dayjs('2019-01-01')],
    },
    'date',
  );
  expect(result3.range![0]!.format('YYYY-MM-DD HH:mm:ss SSS')).toBe('2019-01-01 00:00:00 000');

  const result4 = formatRangeState(
    {
      end: dayjs('2019-01-01'),
    },
    'date',
  );
  expect(result4.end!.format('YYYY-MM-DD HH:mm:ss SSS')).toBe('2019-01-01 23:59:59 999');

  const result5 = formatRangeState(
    {
      end: dayjs('2019-01-01'),
      range: [dayjs('2019-01-01'), dayjs('2019-01-01')],
    },
    'date',
  );
  expect(result5.range![1]!.format('YYYY-MM-DD HH:mm:ss SSS')).toBe('2019-01-01 23:59:59 999');
});

test('useRangeCalendar handleSwitch', async () => {
  const onUIChange = sinon.spy();
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-11', '2019-09-15'],
      onUIChange,
    },
  });
  expect(result.current.finalUIState.viewType).toEqual(['month', 'month']);
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2019-09-11');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-10-11');

  act(() => {
    result.current.handleLeftSwitch('decade');
  });
  expect(result.current.finalUIState.viewType).toEqual(['decade', 'month']);
  expect(() => {
    sinon.assert.calledOnce(onUIChange);
  }).not.toThrow();
});

test('useRangeCalendar handleMove', async () => {
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-11', '2019-09-15'],
    },
  });

  act(() => {
    result.current.handleLeftNextMonth();
  });

  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2019-10-11');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-11-11');
  act(() => {
    result.current.handleRightPrevMonth();
  });
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2019-09-11');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-10-11');
});

test('useRangeCalendar handleItemClick', async () => {
  const onSelect = sinon.spy();
  const onChange = sinon.spy();
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      onSelect,
      onChange,
      minRangeLength: 60,
      defaultRange: ['2019-09-14', '2019-09-15'],
    },
  });

  act(() => {
    result.current.handleLeftClick(dayjs('2019-09-14'));
  });
  act(() => {
    result.current.handleLeftClick(dayjs('2019-09-14'));
  });
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2019-09-14');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-11-13');
  act(() => {
    result.current.handleLeftClick(dayjs('2019-12-16'));
  });
  expect(result.current.finalState.end!.format('YYYY-MM-DD')).toBe('2019-12-16');

  expect(() => {
    sinon.assert.calledOnce(onSelect);
    sinon.assert.calledThrice(onChange);
  }).not.toThrow();
});

test('useRangeCalendar handleItemClick allowClear', async () => {
  const { result, rerender } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-14', '2019-09-15'],
    },
  });

  act(() => {
    result.current.handleLeftClick(dayjs('2019-09-14'));
  });

  expect(result.current.finalState.start).toBe(undefined);
  expect(result.current.finalState.end).toBe(undefined);
  act(() => {
    result.current.handleLeftClick(dayjs('2019-09-14'));
  });
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2019-09-14');
  act(() => {
    result.current.handleLeftClick(dayjs('2019-12-16'));
  });
  expect(result.current.finalState.end!.format('YYYY-MM-DD')).toBe('2019-12-16');

  rerender({
    defaultRange: ['2019-09-14', '2019-09-15'],
    allowClear: false,
  });
  act(() => {
    result.current.handleLeftClick(dayjs('2019-09-14'));
  });
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2019-09-14');
  expect(result.current.finalState.end).toBe(undefined);
});

test('useRangeCalendar handleItemHover', async () => {
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-22', '2019-09-15'],
    },
  });
  act(() => {
    result.current.handleItemHover(dayjs('2019-09-14'));
  });

  act(() => {
    result.current.handleLeftClick(dayjs('2019-09-24'));
  });
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2019-09-24');
  act(() => {
    result.current.handleItemHover(dayjs('2019-09-14'));
  });
  expect(result.current.finalState.range![0].format('YYYY-MM-DD')).toBe('2019-09-14');
  expect(result.current.finalState.range![1].format('YYYY-MM-DD')).toBe('2019-09-24');
  expect(result.current.finalState.start).toBeFalsy();
  act(() => {
    result.current.handleItemHover(dayjs('2019-09-26'));
  });
  expect(result.current.finalState.range![0].format('YYYY-MM-DD')).toBe('2019-09-24');
  expect(result.current.finalState.range![1].format('YYYY-MM-DD')).toBe('2019-09-26');
  expect(result.current.finalState.end).toBeFalsy();
});

test('useRangeCalendar selectRange', async () => {
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-22', '2019-09-15'],
    },
  });
  act(() => {
    result.current.selectRange([dayjs('2019-11-14'), dayjs('2019-12-14')]);
  });

  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2019-11-14');
  expect(result.current.finalState.end!.format('YYYY-MM-DD')).toBe('2019-12-14');
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2019-11-14');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-12-14');

  act(() => {
    result.current.selectRange([dayjs('2019-11-15'), dayjs('2019-12-16')]);
  });
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2019-11-14');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-12-14');
});

test('useRangeCalendar selectFirstDate', async () => {
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-22', '2019-09-15'],
      minRangeLength: 60,
    },
  });
  act(() => {
    result.current.selectFirstDate(dayjs('2019-11-14'), 1, true);
  });

  expect(result.current.finalState.end!.format('YYYY-MM-DD')).toBe('2019-11-14');
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2019-09-15');
  expect(result.current.finalUIState.viewDate[1].format('YYYY-MM-DD')).toBe('2019-11-14');
});

test('useRangeCalendar handleItemClick & handleSwitch', async () => {
  const { result } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-11', '2019-09-15'],
    },
  });

  act(() => {
    result.current.handleLeftSwitch('decade');
  });
  act(() => {
    result.current.handleLeftClick(dayjs('2018-08-14'));
  });
  expect(result.current.finalUIState.viewDate[0].format('YYYY-MM-DD')).toBe('2018-09-11');
  act(() => {
    result.current.handleLeftClick(dayjs('2018-08-14'));
  });
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2018-08-14');
});

test('useRangeCalendar 受控和 rerender', () => {
  const { result, rerender } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      defaultRange: ['2019-09-11', '2019-09-15'],
      viewDate: ['2019-09-11', '2019-10-11'],
      viewType: ['month', 'month'],
      start: '2019-10-01',
      end: '2019-10-07',
      range: ['2019-10-01', '2019-10-07'],
    },
  });

  act(() => {
    result.current.handleOptionSelect([dayjs('2019-10-11'), dayjs('2019-10-15')]);
  });
  // state not change
  expect(result.current.finalState.start!.format('YYYY-MM-DD')).toBe('2019-10-01');

  rerender({
    selectType: 'month',
  });
  expect(result.current.finalUIState.viewType).toEqual(['year', 'year']);
});

test('useRangeCalendar i18n', () => {
  let localeData = zh_CN;
  const wrapper = ({ children }: { children?: React.ReactNode }) => {
    return <LocaleProvider locale={localeData}>{children}</LocaleProvider>;
  };
  const { result, rerender } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {},
    wrapper,
  });

  act(() => {
    result.current.handleOptionSelect([dayjs('2019-10-11'), dayjs('2019-10-15')]);
  });

  localeData = en_US;
  rerender();
  expect(result.current.finalUIState.viewDate[0].locale()).toBe('en');
});

test('useRangeCalendar options', () => {
  // 默认会报一个 warning
  const { result, rerender } = renderHook((props: IRangeCalendarProps) => useRangeCalendar(props), {
    initialProps: {
      options: [{ label: 'test', range: [] }],
    },
  });
  // 再报一个
  rerender({
    options: [{ label: 'test', range: () => [dayjs(''), dayjs('')] }],
  });

  rerender({
    options: [
      { label: 'test', range: () => [dayjs('2020-06-07'), dayjs('2020-06-11')] },
      { label: 'test', range: [dayjs('2020-06-11'), dayjs('2020-06-05')] },
    ],
  });

  act(() => {
    result.current.finalOptions![0].onClick!();
  });
  expect(result.current.finalState!.start!.format('MM-DD')).toBe('06-07');
  act(() => {
    result.current.finalOptions![1].onClick!();
  });
  expect(result.current.finalState!.start!.format('MM-DD')).toBe('06-05');
});
