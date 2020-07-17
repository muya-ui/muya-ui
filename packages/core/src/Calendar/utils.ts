import dayjs, { ConfigType, Dayjs, OpUnitType } from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import { ICalendarFooterOption } from './innerTypes';
import {
  ICalendarItemNormalStatus,
  ICalendarItemStatus,
  ICalendarOption,
  ICalendarSelectType,
  ICalendarType,
} from './types';

dayjs.extend(minMax);

/**
 * 将选择类型转换为展示类型
 * @param selectType 选择类型
 */
export function transformType(selectType: ICalendarSelectType): ICalendarType {
  if (selectType === 'month') {
    return 'year';
  }
  if (selectType === 'year') {
    return 'decade';
  }
  return 'month';
}

export function getDateType(viewType: ICalendarType): OpUnitType {
  if (viewType === 'month') {
    return 'day';
  }
  if (viewType === 'year') {
    return 'month';
  }
  return 'year';
}

export function getSelectDateType(selectType: ICalendarSelectType): OpUnitType {
  if (selectType === 'date') {
    return 'day';
  }
  return selectType;
}

export function getDaysOfMonth(date: Dayjs) {
  const firstDay = date.startOf('month').startOf('week');

  let i = 0;
  const days: Dayjs[] = [];
  days.push(firstDay);
  while (i < 41) {
    i++;
    days.push(firstDay.add(i, 'day'));
  }

  return days;
}

export function getMonthsOfYear(date: Dayjs) {
  const num = date.get('y');

  let i = 0;
  const months: Dayjs[] = [];
  while (i < 12) {
    months.push(dayjs(`${num}-${i + 1}-1`));
    i++;
  }

  return months;
}

/**
 * 获取对应时间的十年，加上首位的两年
 * @param date 日期
 */
export function getDecadeYears(date: Dayjs) {
  const num = date.get('y');
  const firstYear = num - (num % 10) - 1;
  const years: Dayjs[] = [];
  let i = 0;
  while (i < 12) {
    years.push(dayjs(`${firstYear + i}-01-01`));
    i++;
  }
  return years;
}

/**
 * 获取对应时间的十年，加上首位的两年
 * @param date 日期
 */
export function getDecade(date: Dayjs) {
  const num = date.get('y');
  const firstYear = num - (num % 10);
  return [dayjs(`${firstYear}-01-01`), dayjs(`${firstYear + 10}-01-01`)];
}

export function moveOne(date: Dayjs, type: ICalendarType, num: 1 | -1 = 1) {
  if (type !== 'decade') {
    return date.add(num, type);
  } else {
    return date.add(10 * num, 'year');
  }
}

export function isSame(dateA: Dayjs, dateB: Dayjs, type: ICalendarType) {
  if (type !== 'decade') {
    return dateA.isSame(dateB, type);
  } else {
    const [decadeA] = getDecade(dateA);
    const [decadeB] = getDecade(dateB);
    return decadeA.isSame(decadeB, 'year');
  }
}

/**
 * 把用户输入转换成一个有序日期区间
 * @param range 日期区间
 */
export function getRangeInOrder(range?: ConfigType[]): [Dayjs, Dayjs] | undefined {
  if (!range || range.length < 2) {
    return;
  }
  let [start, end] = range;
  start = dayjs(start);
  end = dayjs(end);
  if (start.isValid() && end.isValid()) {
    const left = dayjs.min(start, end);
    const right = dayjs.max(start, end);
    return [left, right];
  }
}

export function inRange(date: Dayjs, range: Dayjs[]) {
  const [left, right] = range;
  return !date.isBefore(left) && !date.isAfter(right);
}

export function getRangeViewType(
  selectType: ICalendarSelectType,
  viewType?: ICalendarType[],
): [ICalendarType, ICalendarType] {
  if (viewType && viewType.length > 1) {
    return [viewType[0], viewType[1]];
  }
  const vType = transformType(selectType);
  return [vType, vType];
}

export function getRangeViewDate(
  viewType: [ICalendarType, ICalendarType],
  viewDate?: ConfigType[],
  num: 1 | -1 = 1,
): [Dayjs, Dayjs] {
  if (viewDate && viewDate.length > 1) {
    const [left, right] = getRangeInOrder(viewDate)!;
    let newLeft = dayjs(left);
    let newRight = dayjs(right);
    const leftRightIsSame = isSame(newLeft, newRight, viewType[0]);
    if (leftRightIsSame && num === 1) {
      newRight = moveOne(newLeft, viewType[0]);
    } else if (leftRightIsSame && num === -1) {
      newLeft = moveOne(newLeft, viewType[0], -1);
    }
    return [newLeft, newRight];
  }
  const viewLeftDate = dayjs();
  return [viewLeftDate, moveOne(viewLeftDate, viewType[0])];
}

const disabledStatusMap: Record<ICalendarItemNormalStatus, ICalendarItemStatus> = {
  selected: 'selected-disabled',
  normal: 'disabled',
  range: 'range-disabled',
  'range-hovered': 'range-hovered',
  'range-end': 'range-end-disabled',
  'range-start': 'range-start-disabled',
  outside: 'outside-disabled',
  hovered: 'hovered',
};
export function transformItemStatus(
  status: ICalendarItemNormalStatus,
  disabled: boolean,
): ICalendarItemStatus {
  if (disabled) {
    return disabledStatusMap[status];
  }

  return status;
}

export function formatStartEnd(
  date: Dayjs,
  isEnd: boolean = false,
  selectType?: ICalendarSelectType,
) {
  let dateType: OpUnitType = 'd';

  if (selectType === 'month') {
    dateType = 'M';
  }
  if (selectType === 'year') {
    dateType = 'y';
  }
  return isEnd ? date.endOf(dateType) : date.startOf(dateType);
}

export function formatCalendarOptions(
  options?: ICalendarOption[],
  handleItemClick?: (date: Dayjs) => void,
  onError?: (option: ICalendarOption) => void,
): ICalendarFooterOption[] | undefined {
  if (!options || options.length < 1) {
    return;
  }
  const innerOpts: ICalendarFooterOption[] = [];
  options.forEach(opt => {
    let dateFn: () => Dayjs;
    if (typeof opt.date === 'function') {
      const innerDate = opt.date();
      if (!innerDate.isValid()) {
        onError && onError(opt);
        return;
      }
      dateFn = opt.date;
    } else if (opt.date) {
      const innerDate = dayjs(opt.date);
      if (!innerDate.isValid()) {
        onError && onError(opt);
        return;
      }
      dateFn = () => innerDate;
    } else {
      dateFn = () => dayjs();
    }
    innerOpts.push({
      label: opt.label,
      disabled: opt.disabled,
      onClick: () => {
        handleItemClick && handleItemClick(dateFn());
      },
    });
  });
  return innerOpts;
}
