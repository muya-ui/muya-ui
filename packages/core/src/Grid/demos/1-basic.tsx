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

export default function BasicDemo() {
  return (
    <Row>
      <StyledCol span={12}>col-12</StyledCol>
      <StyledCol span={12}>col-12</StyledCol>
      <StyledCol span={8}>col-8</StyledCol>
      <StyledCol span={8}>col-8</StyledCol>
      <StyledCol span={8}>col-8</StyledCol>
      <StyledCol span={6}>col-6</StyledCol>
      <StyledCol span={6}>col-6</StyledCol>
      <StyledCol span={6}>col-6</StyledCol>
      <StyledCol span={6}>col-6</StyledCol>
    </Row>
  );
}

export const meta = {
  title: '基础栅格',
  desc:
    '从堆叠到水平排列。\n\n使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（`Col`）必须放在 `Row` 内。',
};
