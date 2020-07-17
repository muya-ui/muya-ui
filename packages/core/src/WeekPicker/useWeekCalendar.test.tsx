import dayjs from 'dayjs';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { en_US, LocaleProvider, zh_CN } from '../Locale';
import { IWeekCalendarProps } from './innerTypes';
import useWeekCalendar from './useWeekCalendar';
import { formatWeek } from './utils';

test('useWeekCalendar UI 逻辑测试', () => {
  const { result } = renderHook((props: IWeekCalendarProps) => useWeekCalendar(props), {
    initialProps: {
      defaultViewDate: '2019-09-11',
    },
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2019-09-11');
  expect(result.current.finalUIState.viewType).toBe('month');

  act(() => {
    result.current.handleSwitch('year');
  });
  expect(result.current.finalUIState.viewType).toBe('year');

  act(() => {
    result.current.handleNextMonth();
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2019-10-11');
});

test('useWeekCalendar UI 受控', () => {
  const onUIChange = jest.fn();
  const { result } = renderHook((props: IWeekCalendarProps) => useWeekCalendar(props), {
    initialProps: {
      viewDate: '2020-06-11',
      viewType: 'year',
      onUIChange,
    },
  });
  expect(result.current.finalUIState.viewDate.format('MM-DD')).toBe('06-11');
  expect(result.current.finalUIState.viewType).toBe('year');

  act(() => {
    result.current.handleItemClick(dayjs('2020-07-12'));
  });
  const uiState = onUIChange.mock.calls[0][0];
  expect(uiState.viewType).toBe('month');
  expect(uiState.viewDate.format('MM-DD')).toBe('07-11');
});

test('useWeekCalendar hover 和 选中', () => {
  const { result } = renderHook((props: IWeekCalendarProps) => useWeekCalendar(props), {
    initialProps: {
      defaultWeek: '2020-06-11',
    },
  });
  expect(result.current.finalSelectedWeek![0].format('MM-DD')).toBe('06-08');
  // hover 到8号那周，无状态变化
  result.current.handleItemHover(dayjs('2020-06-11'), 'range');
  act(() => {
    result.current.handleItemHover(dayjs('2020-06-21'), 'normal');
  });
  expect(result.current.stateHoveredWeek![0].format('MM-DD')).toBe('06-15');

  act(() => {
    result.current.handleItemClick(dayjs('2020-06-11'));
  });
  expect(result.current.finalSelectedWeek).toBe(undefined);

  act(() => {
    result.current.handleLeavePanel();
  });
  expect(result.current.stateHoveredWeek).toBe(undefined);
  // 不报错
  result.current.handleLeavePanel();
});

test('测试 option 相关的逻辑', () => {
  const { result } = renderHook((props: IWeekCalendarProps) => useWeekCalendar(props), {
    initialProps: {
      defaultWeek: '2020-06-11',
      options: [{ label: '测试', week: '2020-06-21' }, { label: '测试', week: 'd' }],
    },
  });

  act(() => {
    result.current.finalOptions![0].onClick!();
  });
  expect(result.current.finalSelectedWeek![0].format('MM-DD')).toBe('06-15');
});

test('selectedWeek 受控逻辑', () => {
  const onChange = sinon.spy();
  const onSelect = sinon.spy();
  const { result } = renderHook((props: IWeekCalendarProps) => useWeekCalendar(props), {
    initialProps: {
      selectedWeek: '2020-06-11',
      onChange,
      onSelect,
      allowClear: false,
    },
  });
  act(() => {
    result.current.selectWeek(formatWeek('2020-06-16')!);
  });

  expect(() => {
    sinon.assert.calledOnce(onChange);
    sinon.assert.calledWith(
      onChange,
      sinon.match((args: any) => {
        return args && args[0].format('MM-DD') === '06-15';
      }),
    );
  }).not.toThrow();

  act(() => {
    result.current.selectWeek(formatWeek('2020-07-01')!);
  });

  expect(result.current.finalUIState.viewDate.format('MM-DD')).toBe('07-05');
});

test('useCalendar i18n 动态变化', async () => {
  let localeData = zh_CN;
  const wrapper = ({ children }: { children?: React.ReactNode }) => {
    return <LocaleProvider locale={localeData}>{children}</LocaleProvider>;
  };

  const { result, rerender } = renderHook((props: IWeekCalendarProps) => useWeekCalendar(props), {
    initialProps: {},
    wrapper,
  });
  expect(result.current.finalUIState.viewDate.locale()).toBe('zh-cn');
  act(() => {
    result.current.selectWeek(formatWeek('2020-07-01')!);
    result.current.handleItemHover(dayjs('2020-06-11'), 'normal');
  });

  localeData = en_US;
  rerender();
  expect(result.current.finalUIState.viewDate.locale()).toBe('en');
});
