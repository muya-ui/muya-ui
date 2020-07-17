import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { Calendar, ICalendarOption, IRangeCalendarOption, RangeCalendar } from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
    margin-right: 10px;
  }
`;

const options: ICalendarOption[] = [
  {
    label: '现在',
  },
  {
    label: '2020-06-15',
    date: '2020-06-15',
  },
  {
    label: '明天',
    date: () => dayjs().add(1, 'd'),
  },
  {
    label: '国庆',
    date: dayjs()
      .month(9)
      .date(1),
  },
];
const rangeOptions: IRangeCalendarOption[] = [
  {
    label: '本周',
    range: () => [dayjs().startOf('w'), dayjs().endOf('w')],
  },
  {
    label: '6月前十天',
    range: ['2020-06-01', '2020-06-10'],
  },
];

export default function DisableDemo() {
  return (
    <Container>
      <Calendar options={options} className="calendar" />
      <RangeCalendar options={rangeOptions} className="calendar" />
    </Container>
  );
}

export const meta = {
  title: '快捷选项',
  desc: '快捷选项',
};
