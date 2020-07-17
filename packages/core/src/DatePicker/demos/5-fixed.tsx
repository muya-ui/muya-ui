import React from 'react';
import styled from 'styled-components';

import { RangeDatePicker, Typography } from '@muya-ui/core';

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  margin-top: 10px;
`;

const rangePlaceholder = ['开始时间', '结束时间'];
export default function FixedDemo() {
  return (
    <>
      <Container>
        <Typography.Paragraph>固定开始时间：</Typography.Paragraph>
        <Row>
          <RangeDatePicker fixedStartDate="2019-03-09" placeholder={rangePlaceholder} />
        </Row>
      </Container>
      <Container>
        <Typography.Paragraph>固定截止时间：</Typography.Paragraph>
        <Row>
          <RangeDatePicker fixedEndDate="2019-03-20" placeholder={rangePlaceholder} />
        </Row>
      </Container>
    </>
  );
}

export const meta = {
  title: '固定区间的端点',
  desc: '固定区间的开始，或者结束时间',
};
