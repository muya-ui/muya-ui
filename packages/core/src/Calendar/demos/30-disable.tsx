import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { Calendar, RangeCalendar, Typography } from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
    margin-right: 10px;
  }
`;

export default function DisableDemo() {
  const disableRange = React.useMemo(() => [dayjs(), dayjs().add(7, 'day')] as [Dayjs, Dayjs], []);
  const disableDate = React.useMemo(
    () => (date: Dayjs) => {
      const nextMonth = dayjs()
        .add(1, 'month')
        .startOf('month');
      const nextMonthFirstWeekMonday = nextMonth.startOf('week');
      const nextMonthFirstWeekSunday = nextMonth.endOf('week');
      return !date.isBefore(nextMonthFirstWeekMonday) && !date.isAfter(nextMonthFirstWeekSunday);
    },
    [],
  );
  return (
    <>
      <Container>
        <Calendar disableRange={disableRange} disableDate={disableDate} className="calendar" />
        <RangeCalendar disableRange={disableRange} disableDate={disableDate} className="calendar" />
      </Container>
      <Typography.Paragraph>禁用今后7天和下个月的第一周</Typography.Paragraph>
    </>
  );
}

export const meta = {
  title: '禁用日期',
  desc: '禁用某些日期，使用 `disableRange` 或者 `disableDate`',
};
