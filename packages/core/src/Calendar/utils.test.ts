// import 'dayjs/locale/fr';

import dayjs from 'dayjs';

import {
  formatStartEnd, getDateType, getDaysOfMonth, getDecade, getDecadeYears, getMonthsOfYear,
  getRangeInOrder, getRangeViewDate, getRangeViewType, inRange, isSame, moveOne, transformType
} from './utils';

test('transformType  & toSelectType', () => {
  expect(transformType('month')).toBe('year');
  expect(transformType('date')).toBe('month');
  expect(transformType('year')).toBe('decade');

  expect(getDateType('month')).toBe('day');
  expect(getDateType('decade')).toBe('year');
  expect(getDateType('year')).toBe('month');
});

test('测试 getDaysOfMonth', () => {
  const result = getDaysOfMonth(dayjs('2019-09-01'));
  expect(result).toHaveLength(42);
  // console.log(result);
});
test('测试 getMonthsOfYear', () => {
  const result = getMonthsOfYear(dayjs('2019-01-01'));
  expect(result).toHaveLength(12);
  // result.forEach(day => {
  //   console.log(day.format('YYYY-MM-DD'));
  // })
});

test('测试 getDecadeYears', () => {
  const result = getDecadeYears(dayjs('2019-01-01'));
  expect(result).toHaveLength(12);
});

test('测试 getDecade', () => {
  const result = getDecade(dayjs('2019-01-01'));
  expect(result[0].get('y')).toBe(2010);
  expect(result[1].get('y')).toBe(2020);
});

test('测试 moveOne', () => {
  const result1 = moveOne(dayjs('2019-01-01'), 'month');
  expect(result1.get('M')).toBe(1);
  const result2 = moveOne(dayjs('2019-01-01'), 'month', -1);
  expect(result2.get('M')).toBe(11);

  const result3 = moveOne(dayjs('2019-01-01'), 'decade');
  expect(result3.get('y')).toBe(2029);
  const result4 = moveOne(dayjs('2019-01-01'), 'decade', -1);
  expect(result4.get('y')).toBe(2009);
});

test('测试 isSame', () => {
  expect(isSame(dayjs('2019-02-01'), dayjs('2019-02-11'), 'month')).toBe(true);
  expect(isSame(dayjs('2012-01-01'), dayjs('2019-01-01'), 'decade')).toBe(true);
});

test('测试 getRangeInOrder', () => {
  expect(getRangeInOrder()).toBeFalsy();
  expect(getRangeInOrder(['ss', '2019-09-11'])).toBeFalsy();

  const [start, end] = getRangeInOrder(['2019', '2018'])!;
  expect(start.format('YYYY')).toBe('2018');
  expect(end.format('YYYY')).toBe('2019');
});

test('测试 inRange ', () => {
  expect(inRange(dayjs('2019-09-09'), getRangeInOrder(['2019-09-01', '2019-09-22'])!)).toBe(true);
});

test('useRangeCalendar # getRangeViewType', () => {
  const result1 = getRangeViewType('date');
  expect(result1).toEqual(['month', 'month']);

  const result2 = getRangeViewType('date', ['month', 'year']);
  expect(result2).toEqual(['month', 'year']);
});
test('useRangeCalendar # getRangeViewDate', () => {
  const result1 = getRangeViewDate(['month', 'month']);
  expect(result1[0].isSame(dayjs(), 'day')).toBe(true);
  expect(result1[1].isSame(moveOne(dayjs(), 'month'), 'day')).toBe(true);

  const result2 = getRangeViewDate(['month', 'month'], ['2019-10-01', '2019-11-03']);
  expect(result2[0].isSame(dayjs('2019-10-01'), 'day')).toBe(true);
  expect(result2[1].isSame(dayjs('2019-11-03'), 'day')).toBe(true);
});

test('dayjs D 和 Date 是一样的', () => {
  expect(dayjs('2019-11-11').isSame(dayjs('2019-11-11'), 'date')).toBe(true);
  expect(dayjs('2019-11-11').isSame(dayjs('2019-11-11'), 'day')).toBe(true);
});

test('formatStartEnd', () => {
  expect(formatStartEnd(dayjs('2020-01-01')).format('DD HH:mm:ss SSS')).toBe('01 00:00:00 000');
  expect(formatStartEnd(dayjs('2020-01-02'), true).format('DD HH:mm:ss SSS')).toBe(
    '02 23:59:59 999',
  );

  expect(formatStartEnd(dayjs('2020-01-01'), false, 'month').format('MM-DD HH:mm:ss SSS')).toBe(
    '01-01 00:00:00 000',
  );
  expect(formatStartEnd(dayjs('2020-02-02'), true, 'month').format('MM-DD HH:mm:ss SSS')).toBe(
    '02-29 23:59:59 999',
  );

  expect(formatStartEnd(dayjs('2019-05-01'), false, 'year').format('YY-MM-DD HH:mm:ss SSS')).toBe(
    '19-01-01 00:00:00 000',
  );
  expect(formatStartEnd(dayjs('2020-01-02'), true, 'year').format('YY-MM-DD HH:mm:ss SSS')).toBe(
    '20-12-31 23:59:59 999',
  );
});

// test('dayjs i18n', () => {
//   const date = dayjs();
//   dayjs.locale('fr');
//   const date1 = date.locale('fr');

//   expect(date.locale()).toBe('en');
//   expect(date1.locale()).toBe('en');
// });
