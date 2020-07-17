import dayjs, { Dayjs } from 'dayjs';

import { formatWeek, getViewDateByWeek, isSameWeek } from './utils';

describe('formatWeek', () => {
  test('空值', () => {
    expect(formatWeek()).toBe(undefined);
    expect(formatWeek('sdfasdf')).toBe(undefined);
    expect(formatWeek(['sdfasdf', 'sdfasdf'])).toBe(undefined);
  });

  test('传数组', () => {
    const result = formatWeek(['2020-06-10', '2020-06-07']);
    expect(result![0].format('MM-DD')).toBe('06-07');
    expect(result![1].format('MM-DD')).toBe('06-13');
  });

  test('传日期', () => {
    const result = formatWeek('2020-06-10');
    expect(result![0].format('MM-DD')).toBe('06-07');
    expect(result![1].format('MM-DD')).toBe('06-13');
  });
});

describe('getViewDateByWeek', () => {
  test('选中的周在同一个月', () => {
    const viewDate = getViewDateByWeek(formatWeek('2020-06-07')!);
    expect(viewDate.format('MM-DD')).toBe('06-07');
  });

  test('选中的时间范围在6月的时间更长', () => {
    const viewDate = getViewDateByWeek([dayjs('2020-06-29'), dayjs('2020-07-01')]);
    expect(viewDate.format('MM-DD')).toBe('06-29');
  });

  test('选中的时间范围在6月和7月的时间一样长', () => {
    const viewDate = getViewDateByWeek([dayjs('2020-06-29'), dayjs('2020-07-02')]);
    expect(viewDate.format('MM-DD')).toBe('06-29');
  });

  test('选中的时间范围在7月的时间更长', () => {
    const viewDate = getViewDateByWeek([dayjs('2020-06-29'), dayjs('2020-07-03')]);
    expect(viewDate.format('MM-DD')).toBe('07-03');
  });
});

describe('isSameWeek', () => {
  test('weekA 或者 weekB 不存在', () => {
    expect(isSameWeek()).toBe(false);
    expect(isSameWeek([dayjs(), dayjs()])).toBe(false);
  });
  test('weekA weekB 相同', () => {
    expect(isSameWeek([dayjs(), dayjs()], [dayjs(), dayjs()])).toBe(true);
    expect(
      isSameWeek(
        [dayjs('2020-06-29'), dayjs('2020-06-29')],
        [dayjs('2020-07-29'), dayjs('2020-07-29')],
      ),
    ).toBe(false);
  });
});
