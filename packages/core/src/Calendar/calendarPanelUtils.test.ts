// import 'dayjs/locale/fr';

import dayjs from 'dayjs';

import {
  createCheckDisabled, createGetStatus, dateInMinRange, dateOutMaxRange, setOnlyStart
} from './calendarPanelUtils';
import { ICalendarItemNormalStatus } from './types';

test('dayjs D 和 Date 是一样的', () => {
  expect(dayjs('2019-11-11').isSame(dayjs('2019-11-11'), 'date')).toBe(true);
  expect(dayjs('2019-11-11').isSame(dayjs('2019-11-11'), 'day')).toBe(true);
});

test('dateInMinRange', () => {
  expect(dateInMinRange(dayjs('2019-12-13 11:11:11'), dayjs('2019-12-13 15:11:11'), 'day', 1)).toBe(
    true,
  );
  expect(dateInMinRange(dayjs('2019-12-12 11:11:11'), dayjs('2019-12-13 15:11:11'), 'day', 2)).toBe(
    true,
  );
  expect(dateInMinRange(dayjs('2019-12-14 11:11:11'), dayjs('2019-12-13 15:11:11'), 'day', 2)).toBe(
    true,
  );
  expect(dateInMinRange(dayjs('2019-12-15 11:11:11'), dayjs('2019-12-13 15:11:11'), 'day', 2)).toBe(
    false,
  );
});

test('dateOutMaxRange', () => {
  expect(dateOutMaxRange(dayjs('2019-12-13'), dayjs('2019-12-13'), 'day', 1)).toBe(false);
  expect(dateOutMaxRange(dayjs('2019-12-14'), dayjs('2019-12-13'), 'day', 1)).toBe(false);
  expect(dateOutMaxRange(dayjs('2019-12-12'), dayjs('2019-12-13'), 'day', 1)).toBe(false);
  expect(dateOutMaxRange(dayjs('2019-12-16'), dayjs('2019-12-13'), 'day', 1)).toBe(true);

  expect(dateOutMaxRange(dayjs('2019-12-14'), dayjs('2019-12-13'), 'day', 2)).toBe(false);
  expect(dateOutMaxRange(dayjs('2019-12-15'), dayjs('2019-12-13'), 'day', 2)).toBe(false);
  expect(dateOutMaxRange(dayjs('2019-12-16'), dayjs('2019-12-13'), 'day', 2)).toBe(true);
});

describe('测试处理单个 item 是否是 disabled 的逻辑', () => {
  test('calendar disableRange', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      disableRange: [dayjs('2020-02-02'), dayjs('2020-02-20')],
    });
    expect(fn1(dayjs('2020-02-02'))).toBe(true);
    expect(fn1(dayjs('2020-02-11'))).toBe(true);
    expect(fn1(dayjs('2020-02-20'))).toBe(true);
    expect(fn1(dayjs('2020-02-21'))).toBe(false);
  });

  test('calendar disableDate', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      disableDate: date => {
        return date.get('date') === 10;
      },
    });
    expect(fn1(dayjs('2020-02-10'))).toBe(true);
    expect(fn1(dayjs('2020-03-10'))).toBe(true);
    expect(fn1(dayjs('2020-03-11'))).toBe(false);
  });

  test('calendar fixedStart', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      fixedStart: dayjs('2020-02-02'),
      isRange: true,
    });
    expect(fn1(dayjs('2020-02-1'))).toBe(true);
    expect(fn1(dayjs('2020-02-2'))).toBe(false);
    expect(fn1(dayjs('2020-03-11'))).toBe(false);
  });

  test('calendar fixedEnd', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      fixedEnd: dayjs('2020-02-02'),
      isRange: true,
    });
    expect(fn1(dayjs('2020-02-1'))).toBe(false);
    expect(fn1(dayjs('2020-03-11'))).toBe(true);
  });

  test('calendar min', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      start: dayjs('2020-02-02'),
      min: 1,
      isRange: true,
    });
    expect(fn1(dayjs('2020-02-02'))).toBe(true);
    expect(fn1(dayjs('2020-02-03'))).toBe(false);
    expect(fn1(dayjs('2020-02-04'))).toBe(false);

    const fn2 = createCheckDisabled({
      viewType: 'month',
      start: dayjs('2020-02-02'),
      min: 2,
      isRange: true,
    });
    expect(fn2(dayjs('2020-02-02'))).toBe(true);
    expect(fn2(dayjs('2020-02-03'))).toBe(true);
    expect(fn2(dayjs('2020-02-01'))).toBe(true);
    expect(fn2(dayjs('2020-02-04'))).toBe(false);
  });

  test('calendar max', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      start: dayjs('2020-02-02'),
      max: 1,
      isRange: true,
    });
    expect(fn1(dayjs('2020-02-05'))).toBe(true);
    expect(fn1(dayjs('2020-02-03'))).toBe(false);
    expect(fn1(dayjs('2020-02-02'))).toBe(false);

    const fn2 = createCheckDisabled({
      viewType: 'month',
      start: dayjs('2020-02-02'),
      max: 2,
      isRange: true,
    });
    expect(fn2(dayjs('2020-02-03'))).toBe(false);
    expect(fn2(dayjs('2020-02-04'))).toBe(false);
    expect(fn2(dayjs('2020-02-05'))).toBe(true);
  });
  test('week disabled', () => {
    const fn1 = createCheckDisabled({
      viewType: 'month',
      isWeek: true,
      disableWeek(week) {
        return week[0].month() === 5;
      },
    });
    expect(fn1(dayjs('2020-06-21'))).toBe(true);
    expect(fn1(dayjs('2020-03-11'))).toBe(false);
  });
});

describe('测试处理 item 的状态 createGetStatus', () => {
  test('calendar 非区间一般情况', () => {
    const fn1 = createGetStatus({
      viewType: 'month',
      viewDate: dayjs('2020-01-01'),
      selected: dayjs('2020-01-06'),
    });
    expect(fn1(dayjs('2020-02-01'))).toBe('outside');
    expect(fn1(dayjs('2020-01-06'))).toBe('selected');
    expect(fn1(dayjs('2020-01-08'))).toBe('normal');
  });

  test('range calendar 一般情况', () => {
    const fn2 = createGetStatus({
      viewType: 'month',
      viewDate: dayjs('2020-01-01'),
      isRange: true,
      start: dayjs('2020-01-06'),
      range: [dayjs('2020-01-06'), dayjs('2020-01-11')],
      end: dayjs('2020-01-11'),
    });

    expect(fn2(dayjs('2020-01-06'))).toBe('range-start');
    expect(fn2(dayjs('2020-01-07'))).toBe('range');
    expect(fn2(dayjs('2020-01-11'))).toBe('range-end');
    expect(fn2(dayjs('2020-03-11'))).toBe('outside');
    expect(fn2(dayjs('2020-01-21'))).toBe('normal');
  });

  test('week calendar 一般情况', () => {
    const fn1 = createGetStatus({
      viewType: 'month',
      viewDate: dayjs('2020-01-01'),
      isWeek: true,
    });

    expect(fn1(dayjs('2020-01-06'))).toBe('normal');
    expect(fn1(dayjs('2020-02-06'))).toBe('outside');
  });

  test('week calendar hover', () => {
    const fn1 = createGetStatus({
      viewType: 'month',
      viewDate: dayjs('2020-06-11'),
      hoveredWeek: [
        dayjs('2020-06-07'), // 星期一
        dayjs('2020-06-13'),
      ],
      isWeek: true,
    });

    expect(fn1(dayjs('2020-06-09'))).toBe('hovered');
  });
  test('week calendar selected', () => {
    const fn1 = createGetStatus({
      viewType: 'month',
      viewDate: dayjs('2020-06-11'),
      selectedWeek: [
        dayjs('2020-06-07'), // 星期一
        dayjs('2020-06-13'),
      ],
      isWeek: true,
    });

    expect(fn1(dayjs('2020-06-09'))).toBe('range');
  });
});

test('setOnlyStart', () => {
  const items: Array<{ status: ICalendarItemNormalStatus }> = [
    { status: 'range-start' },
    { status: 'normal' },
    { status: 'normal' },
  ];
  setOnlyStart(items);
  expect(items[0].status).toBe('selected');

  const items1: Array<{ status: ICalendarItemNormalStatus }> = [
    { status: 'range-start' },
    { status: 'range' },
    { status: 'normal' },
  ];
  setOnlyStart(items1);
  expect(items1[0].status).toBe('range-start');
});
