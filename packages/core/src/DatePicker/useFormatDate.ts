import { Dayjs } from 'dayjs';
import { useCallback, useMemo } from 'react';

import { ICalendarSelectType } from '../Calendar/types';

const defaultFormatMap = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  year: 'YYYY',
};
function getDefaultFormat(selectType: ICalendarSelectType) {
  return defaultFormatMap[selectType];
}

export default function useFormatDate(
  selectType: ICalendarSelectType,
  format?: string | ((date: Dayjs) => string),
) {
  const formatDate = useMemo(() => {
    if (typeof format === 'function') {
      return format;
    }
    const formatStr = format || getDefaultFormat(selectType);
    return (date: Dayjs) => date.format(formatStr);
  }, [format, selectType]);
  return useCallback(
    (date?: Dayjs) => {
      if (date && date.isValid()) {
        return formatDate(date);
      }
      return '';
    },
    [formatDate],
  );
}
