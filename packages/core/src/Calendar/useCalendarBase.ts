import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo } from 'react';

import { ICalendarBaseProps } from './types';
import { getRangeInOrder, inRange } from './utils';

export default function useCalendarBase(props: ICalendarBaseProps) {
  const { disableRange, disableDate, todayDate } = props;
  const finalDisableRange = useMemo(() => getRangeInOrder(disableRange), [disableRange]);
  const finalTodayDate = useMemo(() => dayjs(todayDate), [todayDate]);
  const isDateDisabled = useCallback(
    (date: Dayjs) =>
      (finalDisableRange && inRange(date, finalDisableRange)) || (disableDate && disableDate(date)),
    [disableDate, finalDisableRange],
  );

  return {
    finalDisableRange,
    finalTodayDate,
    isDateDisabled,
  };
}
