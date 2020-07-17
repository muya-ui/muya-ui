import React from 'react';
import styled from 'styled-components';

import { Calendar } from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  & .calendar {
    margin-right: 10px;
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
  }
`;

export default function RenderDemo() {
  return (
    <Container>
      <Calendar
        selectType="date"
        className="calendar"
        renderMonthLabel={date => (
          <span style={{ transform: 'scale(0.8)' }}>{date.format('ddd')}</span>
        )}
        renderMonthItem={date => date.format('DD')}
      />
      <Calendar
        selectType="month"
        className="calendar"
        renderYearItem={date => `${date.format('MMM')}份`}
      />
      <Calendar
        selectType="year"
        className="calendar"
        renderDecadeItem={date => `${date.format('YYYY')}年`}
      />
    </Container>
  );
}

export const meta = {
  title: '自定义渲染',
  desc: '自定义渲染',
};
