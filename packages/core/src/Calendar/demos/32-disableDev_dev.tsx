import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { Typography } from '@muya-ui/core';

import CalendarPanel from '../CalendarPanel';

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Root = styled.div`
  & .head {
    margin-bottom: 10px;
  }
  & .panel {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
    margin-right: 10px;
    width: 240px;
  }
`;
export default function DisableDemo() {
  return (
    <Root>
      <Container>
        <CalendarPanel
          className="panel"
          viewType="month"
          selected={dayjs('2020-01-13')}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
        />

        <CalendarPanel
          className="panel"
          viewType="month"
          selected={dayjs('2020-01-13')}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          disableRange={[dayjs('2020-01-12'), dayjs('2020-01-14')]}
        />

        <CalendarPanel
          className="panel"
          viewType="month"
          start={dayjs('2020-01-13')}
          end={dayjs('2020-01-18')}
          range={[dayjs('2020-01-13'), dayjs('2020-01-18')]}
          isRange={true}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          disableRange={[dayjs('2020-01-12'), dayjs('2020-01-14')]}
        />
      </Container>
      <Typography.Paragraph className="head">fixedStart & fixedEnd</Typography.Paragraph>
      <Container>
        <CalendarPanel
          className="panel"
          viewType="month"
          start={dayjs('2020-01-13')}
          end={dayjs('2020-01-18')}
          range={[dayjs('2020-01-13'), dayjs('2020-01-18')]}
          isRange={true}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          fixedStart={dayjs('2020-01-13')}
        />

        <CalendarPanel
          className="panel"
          viewType="month"
          start={dayjs('2020-01-13')}
          end={dayjs('2020-01-18')}
          range={[dayjs('2020-01-13'), dayjs('2020-01-18')]}
          isRange={true}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          fixedEnd={dayjs('2020-01-18')}
        />
      </Container>
      <Typography.Paragraph className="head">min & max</Typography.Paragraph>
      <Container>
        <CalendarPanel
          className="panel"
          viewType="month"
          start={dayjs('2020-01-13')}
          range={[dayjs('2020-01-13'), dayjs('2020-01-13')]}
          isRange={true}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          min={1}
        />
        <CalendarPanel
          className="panel"
          viewType="month"
          start={dayjs('2020-01-13')}
          range={[dayjs('2020-01-13'), dayjs('2020-01-13')]}
          isRange={true}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          min={2}
        />

        <CalendarPanel
          className="panel"
          viewType="month"
          start={dayjs('2020-01-13')}
          range={[dayjs('2020-01-13'), dayjs('2020-01-13')]}
          isRange={true}
          viewDate={dayjs('2020-01-01')}
          todayDate={dayjs('2020-01-10')}
          max={1}
        />
      </Container>
      <Typography.Paragraph className="head">week</Typography.Paragraph>
      <Container>
        <CalendarPanel
          className="panel"
          viewType="month"
          hoveredWeek={[dayjs('2020-06-15'), dayjs('2020-06-21')]}
          isWeek={true}
          viewDate={dayjs('2020-06-11')}
          todayDate={dayjs('2020-06-10')}
        />
        <CalendarPanel
          className="panel"
          viewType="month"
          selectedWeek={[dayjs('2020-06-15'), dayjs('2020-06-21')]}
          isWeek={true}
          viewDate={dayjs('2020-06-11')}
          todayDate={dayjs('2020-06-10')}
        />
      </Container>
    </Root>
  );
}

export const meta = {
  title: 'disable 测试',
  desc: '禁用某些日期，使用 `disableRange` 或者 `disableDate`',
};
