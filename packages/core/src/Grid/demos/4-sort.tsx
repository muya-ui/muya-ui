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

export default function SortDemo() {
  return (
    <Row>
      <StyledCol span={18} push={6}>
        col-18 col-push-6
      </StyledCol>
      <StyledCol span={6} pull={18}>
        col-6 col-pull-18
      </StyledCol>
    </Row>
  );
}

export const meta = {
  title: '栅格排序',
  desc: '通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。',
};
