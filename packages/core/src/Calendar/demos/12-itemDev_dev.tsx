import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import CalendarItem from '../CalendarItem';

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #f2f2f2;
  padding: 0 10px 10px;

  .item {
    width: 40px;
  }
`;

export default function BasicDemo() {
  return (
    <>
      <Container>常态</Container>
      <Container>
        <CalendarItem
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="normal"
        />
        <CalendarItem
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="hovered"
        />
        <CalendarItem
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="selected"
        />
        <CalendarItem
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="range-start"
        />
        <CalendarItem className="item" viewType="month" date={dayjs('2020-06-07')} status="range" />
        <CalendarItem className="item" viewType="month" date={dayjs('2020-06-07')} status="range" />
        <CalendarItem
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="range-end"
        />
      </Container>
      <Container>禁用态</Container>
      <Container>
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="normal"
        />
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="hovered"
        />
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="selected"
        />
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="range-start"
        />
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="range"
        />
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="range"
        />
        <CalendarItem
          disabled
          className="item"
          viewType="month"
          date={dayjs('2020-06-07')}
          status="range-end"
        />
      </Container>

      <Container>今天</Container>
      <Container>
        <CalendarItem
          className="item"
          viewType="month"
          isCurrent
          date={dayjs('2020-06-07')}
          status="normal"
        />
        <CalendarItem
          className="item"
          viewType="month"
          isCurrent
          date={dayjs('2020-06-07')}
          status="hovered"
        />
        <CalendarItem
          className="item"
          viewType="month"
          isCurrent
          date={dayjs('2020-06-07')}
          status="selected"
        />
        <CalendarItem
          className="item"
          viewType="month"
          isCurrent
          date={dayjs('2020-06-07')}
          status="range-start"
        />
        <CalendarItem
          className="item"
          viewType="month"
          isCurrent
          date={dayjs('2020-06-07')}
          status="range"
        />
        <CalendarItem className="item" viewType="month" date={dayjs('2020-06-07')} status="range" />
        <CalendarItem
          className="item"
          viewType="month"
          isCurrent
          date={dayjs('2020-06-07')}
          status="range-end"
        />
      </Container>
    </>
  );
}

export const meta = {
  title: 'item dev',
  desc: 'item dev',
};
