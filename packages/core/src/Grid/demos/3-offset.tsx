import React from 'react';
import styled from 'styled-components';

import { Col, Row } from '@muya-ui/core';

const StyledCol = styled(Col)`
  min-height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
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

export default function OffsetDemo() {
  return (
    <>
      <Row>
        <StyledCol span={8}>col-8</StyledCol>
        <StyledCol span={8} offset={8}>
          col-8 col-offset-8
        </StyledCol>
      </Row>
      <Row>
        <StyledCol span={6} offset={6}>
          col-6 col-offset-6
        </StyledCol>
        <StyledCol span={6} offset={6}>
          col-6 col-offset-6
        </StyledCol>
      </Row>
      <Row>
        <StyledCol span={12} offset={6}>
          col-12 col-offset-6
        </StyledCol>
      </Row>
    </>
  );
}

export const meta = {
  title: '左右偏移',
  desc:
    '列偏移。\n\n使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。',
};
