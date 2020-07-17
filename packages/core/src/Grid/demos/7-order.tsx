import React from 'react';
import styled from 'styled-components';

import { Col, Row } from '@muya-ui/core';

const StyledCol = styled(Col)`
  min-height: 30px;
  margin: 8px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
  text-align: center;
  border-radius: 0;
  background-color: #00a0e9;
  &:nth-child(2n + 1) {
    background-color: rgba(0, 160, 233, 0.7);
  }
`;

export default function OrderDemo() {
  return (
    <Row>
      <StyledCol className="col" span={6} order={4}>
        1 col-order-4
      </StyledCol>
      <StyledCol className="col" span={6} order={3}>
        2 col-order-3
      </StyledCol>
      <StyledCol className="col" span={6} order={2}>
        3 col-order-2
      </StyledCol>
      <StyledCol className="col" span={6} order={1}>
        4 col-order-1
      </StyledCol>
    </Row>
  );
}

export const meta = {
  title: 'Flex 排序',
  desc: '通过 Flex 布局的 Order 来改变元素的排序。',
};
