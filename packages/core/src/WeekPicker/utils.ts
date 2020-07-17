import dayjs, { Dayjs } from 'dayjs';

import { getRangeInOrder, isSame } from '../Calendar/utils';
import { IWeekPickerValue } from './types';

export function formatWeek(inputWeek?: IWeekPickerValue): [Dayjs, Dayjs] | undefined {
  if (!inputWeek) {
    return;
  }
  if (Array.isArray(inputWeek)) {
    const range = getRangeInOrder(inputWeek);
    if (!range) {
      return;
    }
    return [range[0].startOf('w'), range[0].endOf('w')];
  }
  const innerDate = dayjs(inputWeek);
  if (!innerDate.isValid()) {
    return;
  }
  return [innerDate.startOf('w'), innerDate.endOf('w')];
}

export function getViewDateByWeek([weekStart, weekEnd]: [Dayjs, Dayjs]) {
  if (isSame(weekStart, weekEnd, 'month')) {
    return weekStart;
  }
  // 都按 8点算吧
  const weekStartEndOfMonth = weekStart.endOf('month').hour(8);
  const weekEndStartOfMonth = weekEnd.startOf('month').hour(8);

  const startRemain = weekStartEndOfMonth.unix() - weekStart.unix();
  const endRemain = weekEnd.unix() - weekEndStartOfMonth.unix();

  return startRemain > endRemain ? weekStart : weekEnd;
}

export function isSameWeek(weekA?: [Dayjs, Dayjs], weekB?: [Dayjs, Dayjs]) {
  if (!weekA || !weekB) {
    return false;
  }
  return weekA[0].isSame(weekB[0], 'd');
}
