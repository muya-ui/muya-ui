import React from 'react';
import styled from 'styled-components';

import { RangeCalendar, Typography } from '@muya-ui/core';

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
  }
`;
const Row = styled.div`
  display: flex;
  margin-top: 10px;
`;

export default function FixedDemo() {
  return (
    <>
      <Container>
        <Typography.Paragraph>固定开始时间：</Typography.Paragraph>
        <Row>
          <RangeCalendar className="calendar" fixedStartDate="2020-01-09 23:59:59 999" />
        </Row>
      </Container>
      <Container>
        <Typography.Paragraph>固定截止时间：</Typography.Paragraph>
        <Row>
          <RangeCalendar className="calendar" fixedEndDate="2020-01-20" />
        </Row>
      </Container>
    </>
  );
}

export const meta = {
  title: '固定区间的端点',
  desc: '固定区间的开始，或者结束时间',
};
