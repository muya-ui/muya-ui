import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { Calendar, RangeCalendar, Typography } from '@muya-ui/core';

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
    margin-right: 10px;
  }
`;
const Row = styled.div`
  display: flex;
  margin-top: 10px;
`;

export default function DefaultDemo() {
  const defaultDate = React.useMemo(() => dayjs().add(4, 'day'), []);
  const defaultRange: [Dayjs, Dayjs] = React.useMemo(() => [dayjs(), dayjs().add(7, 'day')], []);
  const defaultViewDate = React.useMemo(() => dayjs().add(40, 'day'), []);
  const defaultViewRange: [Dayjs, Dayjs] = React.useMemo(
    () => [dayjs(), dayjs().add(90, 'day')],
    [],
  );
  return (
    <>
      <Container>
        <Typography.Paragraph>设置默认选中的日期</Typography.Paragraph>
        <Row>
          <Calendar defaultDate={defaultDate} className="calendar" />
          <RangeCalendar className="calendar" defaultRange={defaultRange} />
        </Row>
      </Container>
      <Container>
        <Typography.Paragraph>设置面板默认展开的日期</Typography.Paragraph>
        <Row>
          <Calendar defaultViewDate={defaultViewDate} className="calendar" />
          <RangeCalendar className="calendar" defaultViewDate={defaultViewRange} />
        </Row>
      </Container>
    </>
  );
}

export const meta = {
  title: '设置默认值',
  desc: '设置默认值',
};
