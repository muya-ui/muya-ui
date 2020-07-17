import { Dayjs } from 'dayjs';
import React from 'react';

import WeekCalendar from '../WeekCalendar';

const disableWeek = (week: [Dayjs, Dayjs]) => {
  return week[0].date() === 15;
};
export default function BasicDemo() {
  return <WeekCalendar defaultViewDate="2020-06-15" disableWeek={disableWeek} />;
}

export const meta = {
  title: 'WeekCalendar',
  desc: 'WeekCalendar',
};
