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
`;

const GutterBox = styled.div`
  padding: 8px 0;
  background: #00a0e9;
`;

export default function GutterDemo() {
  return (
    <Row gutter={16}>
      <StyledCol span={6}>
        <GutterBox>col-6</GutterBox>
      </StyledCol>
      <StyledCol span={6}>
        <GutterBox>col-6</GutterBox>
      </StyledCol>
      <StyledCol span={6}>
        <GutterBox>col-6</GutterBox>
      </StyledCol>
      <StyledCol span={6}>
        <GutterBox>col-6</GutterBox>
      </StyledCol>
    </Row>
  );
}

export const meta = {
  title: '区块间隔',
  desc:
    '栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 (16+8n)px 作为栅格间隔。\n\n(n 是自然数) 如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。',
};
