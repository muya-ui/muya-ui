import { Dayjs, OpUnitType } from 'dayjs';

import { ICalendarItemPureProps, ICalendarPanelPureProps } from './innerTypes';
import { ICalendarItemNormalStatus } from './types';
import { getDateType, inRange } from './utils';

export function dateInMinRange(
  currentDate: Dayjs,
  compareDate: Dayjs,
  dateType: OpUnitType,
  min: number,
) {
  if (currentDate.isSame(compareDate, dateType)) {
    return true;
  }

  if (
    currentDate.isAfter(compareDate, dateType) &&
    currentDate.subtract(min, dateType).isBefore(compareDate, dateType)
  ) {
    return true;
  }
  if (
    currentDate.isBefore(compareDate, dateType) &&
    currentDate.add(min, dateType).isAfter(compareDate, dateType)
  ) {
    return true;
  }
  return false;
}

export function dateOutMaxRange(
  currentDate: Dayjs,
  compareDate: Dayjs,
  dateType: OpUnitType,
  max: number,
) {
  if (
    currentDate.isAfter(compareDate, dateType) &&
    currentDate.subtract(max, dateType).isAfter(compareDate, dateType)
  ) {
    return true;
  }
  if (
    currentDate.isBefore(compareDate, dateType) &&
    currentDate.add(max, dateType).isBefore(compareDate, dateType)
  ) {
    return true;
  }
  return false;
}

type ICheckDisabledArgs = Pick<
  ICalendarPanelPureProps,
  | 'disableDate'
  | 'disableRange'
  | 'isRange'
  | 'isWeek'
  | 'disableWeek'
  | 'max'
  | 'min'
  | 'start'
  | 'end'
  | 'fixedEnd'
  | 'fixedStart'
  | 'viewType'
>;
/**
 * 检查当前日期是否是禁用的
 * @param args
 */
export function createCheckDisabled(args: ICheckDisabledArgs) {
  const {
    disableRange,
    disableDate,
    viewType,
    min,
    max,
    start,
    end,

    fixedStart,
    fixedEnd,
    isRange,
    // week
    isWeek,
    disableWeek,
  } = args;
  let innerDisableRange: Dayjs[];
  if (disableRange && disableRange.length > 1) {
    innerDisableRange = disableRange;
  }

  const dateType = getDateType(viewType);
  const normalCheckDisabled = (currentDate: Dayjs) => {
    if (innerDisableRange && inRange(currentDate, innerDisableRange)) {
      return true;
    }
    if (disableDate && disableDate(currentDate)) {
      return true;
    }
    return false;
  };
  const rangeCheckDisabled = (currentDate: Dayjs) => {
    if (normalCheckDisabled(currentDate)) {
      return true;
    }
    if (fixedStart && currentDate.isBefore(fixedStart, dateType)) {
      return true;
    }
    if (fixedEnd && currentDate.isAfter(fixedEnd, dateType)) {
      return true;
    }

    const compareDate = start || end;
    const notBothStartEnd = !(start && end);

    if (
      notBothStartEnd &&
      compareDate &&
      min &&
      min >= 1 &&
      dateInMinRange(currentDate, compareDate, dateType, min)
    ) {
      return true;
    }

    if (
      notBothStartEnd &&
      compareDate &&
      max &&
      dateOutMaxRange(currentDate, compareDate, dateType, max)
    ) {
      return true;
    }

    return false;
  };
  const weekCheckDisabled = (currentDate: Dayjs) => {
    if (disableWeek && disableWeek([currentDate.startOf('w'), currentDate.endOf('w')])) {
      return true;
    }
    return false;
  };

  if (isRange) {
    return rangeCheckDisabled;
  }

  if (isWeek) {
    return weekCheckDisabled;
  }

  return normalCheckDisabled;
}

type IGetStatusArgs = Pick<
  ICalendarPanelPureProps,
  | 'viewDate'
  | 'max'
  | 'min'
  | 'start'
  | 'end'
  | 'range'
  | 'isRange'
  | 'viewType'
  | 'selected'
  | 'isWeek'
  | 'hoveredWeek'
  | 'selectedWeek'
>;

export function createGetStatus(
  args: IGetStatusArgs,
): (currentDate: Dayjs, dateIndex?: number) => ICalendarItemNormalStatus {
  const {
    start,
    end,
    range = [],
    selected,
    viewType,
    isRange,
    viewDate,
    isWeek,
    hoveredWeek = [],
    selectedWeek = [],
  } = args;
  const dateType = getDateType(viewType);
  const firstDay = viewDate.startOf('month');
  const lastDay = viewDate.endOf('month');
  const normalGetStatus = (currentDate: Dayjs, dateIndex: number = 0) => {
    const isOutsideWhenInMonthPanel =
      viewType === 'month' && (currentDate.isBefore(firstDay) || currentDate.isAfter(lastDay));

    const isOutsideWhenInDecadePanel =
      viewType === 'decade' && (dateIndex === 0 || dateIndex === 11);

    if (isOutsideWhenInMonthPanel || isOutsideWhenInDecadePanel) {
      return 'outside';
    }
    // 处理选中的逻辑
    if (selected && currentDate.isSame(selected, dateType)) {
      return 'selected';
    }
    return 'normal';
  };
  const rangeGetStatus = (currentDate: Dayjs, dateIndex: number = 0) => {
    if (normalGetStatus(currentDate, dateIndex) === 'outside') {
      return 'outside';
    }
    const innerStart = start || range[0];
    const innerEnd = end || range[1];

    if (innerStart && currentDate.isSame(innerStart, dateType)) {
      return 'range-start';
    }

    if (innerEnd && currentDate.isSame(innerEnd, dateType)) {
      return 'range-end';
    }
    if (range.length === 2 && inRange(currentDate, range)) {
      return 'range';
    }
    return 'normal';
  };
  const weekGetStatus = (currentDate: Dayjs, dateIndex: number = 0) => {
    const isHovered = hoveredWeek.length === 2 && inRange(currentDate, hoveredWeek);
    if (selectedWeek.length === 2 && inRange(currentDate, selectedWeek)) {
      return isHovered ? 'range-hovered' : 'range';
    }
    if (isHovered) {
      return 'hovered';
    }
    if (normalGetStatus(currentDate, dateIndex) === 'outside') {
      return 'outside';
    }
    return 'normal';
  };

  if (isRange) {
    return rangeGetStatus;
  }

  if (isWeek) {
    return weekGetStatus;
  }

  return normalGetStatus;
}

// 当区间只有 start 的时候，需要特殊处理样式
export function setOnlyStart(dates: Pick<ICalendarItemPureProps, 'status'>[]) {
  let startIndex = -1;
  let onlyOneStart = true;
  dates.forEach((item, itemIndex) => {
    if (item.status === 'range-start') {
      startIndex = itemIndex;
    } else if (item.status === 'range' || item.status === 'range-end') {
      onlyOneStart = false;
    }
  });
  if (onlyOneStart && startIndex !== -1) {
    dates[startIndex].status = 'selected';
  }

  return startIndex;
}
