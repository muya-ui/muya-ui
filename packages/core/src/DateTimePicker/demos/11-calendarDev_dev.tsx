import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { ICalendarOption } from '@muya-ui/core';

import DateTimeCalendar from '../DateTimeCalendar';

const Container = styled.div`
  display: flex;
  align-items: center;
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
    label: '下午3点',
    date: () => {
      const d = dayjs()
        .hour(15)
        .minute(0);
      console.log(d.format('HH:mm:s'));
      return d;
    },
  },
];

export default function BasicDemo() {
  return (
    <Container>
      <DateTimeCalendar className="calendar" defaultViewDate="2020-06-15" options={options} />
    </Container>
  );
}

export const meta = {
  title: 'DateTimeCalendar',
  desc: 'DateTimeCalendar',
};
