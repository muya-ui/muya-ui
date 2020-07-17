import dayjs from 'dayjs';

import { renderHook } from '@testing-library/react-hooks';

import { ICalendarBaseProps } from './types';
import useCalendarBase from './useCalendarBase';

test('useCalendarBase 默认情况', async () => {
  const { result, rerender } = renderHook((props: ICalendarBaseProps) => useCalendarBase(props), {
    initialProps: {
      disableRange: ['2019-09-11', '2019-09-20'],
      todayDate: '2019-11-11',
    },
  });
  expect(result.current.finalTodayDate.format('YYYY-MM-DD')).toBe('2019-11-11');
  expect(result.current.isDateDisabled(dayjs('2019-09-12'))).toBe(true);

  rerender({
    disableDate(date) {
      return date.format('YYYY') === '2019';
    },
  });

  expect(result.current.isDateDisabled(dayjs('2019-01-12'))).toBe(true);
});
