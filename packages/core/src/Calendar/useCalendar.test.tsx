import dayjs from 'dayjs';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { en_US, LocaleProvider, zh_CN } from '../Locale';
import { Omit } from '../types';
import { ICalendarProps } from './types';
import useCalendar from './useCalendar';

type IProps = Omit<ICalendarProps, 'theme'>;

test('useCalendar 默认情况', async () => {
  const { result } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      defaultDate: '2019-09-11',
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

test('useCalendar 处理options', async () => {
  const { result, rerender } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      options: [],
    },
  });
  expect(result.current.finalOptions).toBe(undefined);

  // 会报一个 warning
  rerender({ options: [{ label: 'sss', date: 'ss' }] });
  expect(result.current.finalOptions).toHaveLength(0);

  // 会报一个 warning
  rerender({ options: [{ label: 'sss', date: () => dayjs('ss') }] });
  expect(result.current.finalOptions).toHaveLength(0);

  rerender({ options: [{ label: 'sss', date: '2020-02-02' }] });
  expect(result.current.finalOptions).toHaveLength(1);

  rerender({
    options: [
      { label: 'sss', date: () => dayjs('2020-06-08') },
      { label: 'sss', date: '2020-06-07' },
      { label: 'sss' },
    ],
  });

  act(() => {
    result.current.finalOptions![0].onClick!();
  });
  expect(result.current.finalSelectedDate!.format('MM-DD')).toBe('06-08');
  act(() => {
    result.current.finalOptions![1].onClick!();
  });
  expect(result.current.finalSelectedDate!.format('MM-DD')).toBe('06-07');
  act(() => {
    result.current.finalOptions![2].onClick!();
  });
  expect(result.current.finalSelectedDate!.format('MM-DD')).toBe(dayjs().format('MM-DD'));
});

test('useCalendar handleItemClick', async () => {
  const onChange = sinon.spy();
  const onSelect = sinon.spy();
  const { result } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      defaultDate: '2019-09-11',
      onChange,
      onSelect,
    },
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2019-09-11');
  expect(result.current.finalUIState.viewType).toBe('month');

  act(() => {
    result.current.handleSwitch('decade');
  });
  act(() => {
    result.current.handleItemClick(dayjs('2018-10-12'));
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2018-09-11');
  expect(result.current.finalUIState.viewType).toBe('month');
  act(() => {
    result.current.handleItemClick(dayjs('2018-10-13'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2018-10-13');

  expect(() => {
    sinon.assert.calledOnce(onSelect);
  }).not.toThrow();
});

test('useCalendar handleItemClick allowClear', async () => {
  const { result, rerender } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      defaultDate: '2019-09-11',
    },
  });
  act(() => {
    result.current.handleItemClick(dayjs('2019-09-11'));
  });
  expect(result.current.finalSelectedDate).toBe(undefined);
  act(() => {
    result.current.handleItemClick(dayjs('2019-09-11'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2019-09-11');
  rerender({
    allowClear: false,
    defaultDate: '2019-09-11',
  });
  act(() => {
    result.current.handleItemClick(dayjs('2019-09-11'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2019-09-11');
});

test('useCalendar handleItemClick type year', async () => {
  const onChange = sinon.spy();
  const onUIChange = sinon.spy();
  const { result } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      defaultDate: '2019-09-11',
      selectType: 'month',
      onChange,
      onUIChange,
    },
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2019-09-11');
  expect(result.current.finalUIState.viewType).toBe('year');

  act(() => {
    result.current.handleSwitch('decade');
  });
  act(() => {
    result.current.handleItemClick(dayjs('2018-10-12'));
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2018-09-11');
  act(() => {
    result.current.handleItemClick(dayjs('2018-10-12'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2018-10-12');
  act(() => {
    result.current.handleItemClick(dayjs('2018-10-12'));
  });
  expect(result.current.finalSelectedDate).toBe(undefined);

  act(() => {
    result.current.updateSelectedDate(dayjs('2020-01-20'), true);
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2020-01-20');
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2020-01-20');
});

test('useCalendar handleItemClick type decade', async () => {
  const onChange = sinon.spy();
  const { result } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      defaultDate: '2019-09-11',
      selectType: 'year',
      onChange,
    },
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2019-09-11');
  expect(result.current.finalUIState.viewType).toBe('decade');

  act(() => {
    result.current.handleItemClick(dayjs('2018-10-12'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2018-10-12');
});

test('useCalendar 受控', async () => {
  const onChange = sinon.spy();
  const { result, rerender } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {
      viewDate: '2019-09-11',
      viewType: 'year',
      selectType: 'date',
      selectedDate: '2019-12-12',
      onChange,
    },
  });
  expect(result.current.finalUIState.viewDate.format('YYYY-MM-DD')).toBe('2019-09-11');

  act(() => {
    result.current.handleItemClick(dayjs('2018-10-12'));
  });
  expect(result.current.finalSelectedDate!.format('YYYY-MM-DD')).toBe('2019-12-12');
  rerender({
    selectType: 'month',
  });
  expect(result.current.finalUIState.viewType).toBe('year');
});

test('useCalendar i18n 动态变化', async () => {
  let localeData = zh_CN;
  const wrapper = ({ children }: { children?: React.ReactNode }) => {
    return <LocaleProvider locale={localeData}>{children}</LocaleProvider>;
  };

  const { result, rerender } = renderHook((props: IProps) => useCalendar(props), {
    initialProps: {},
    wrapper,
  });
  expect(result.current.finalUIState.viewDate.locale()).toBe('zh-cn');
  act(() => {
    result.current.updateSelectedDate(dayjs('2020-02-20'));
  });

  localeData = en_US;
  rerender();
  expect(result.current.finalUIState.viewDate.locale()).toBe('en');
});
