import React from 'react';
import styled from 'styled-components';

import { Col, IJustifyType, Row } from '@muya-ui/core';

const StyledRow = styled(Row)`
  margin: 10px 0;
`;

const StyledCol = styled(Col)`
  min-height: 30px;
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

export default function JustifyDemo() {
  return (
    <>
      {['start', 'center', 'end', 'space-between', 'space-around'].map(justify => (
        <StyledRow key={justify} justify={justify as IJustifyType}>
          <StyledCol span={4}>col-4</StyledCol>
          <StyledCol span={4}>col-4</StyledCol>
          <StyledCol span={4}>col-4</StyledCol>
          <StyledCol span={4}>col-4</StyledCol>
        </StyledRow>
      ))}
    </>
  );
}

export const meta = {
  title: 'Flex 水平对齐',
  desc:
    '子元素根据不同的值 `start`, `center`, `end`, `space-between`, `space-around`，分别定义其在父节点里面水平排布方式。',
};
