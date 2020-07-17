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

export default function ResponsiveDemo() {
  return (
    <>
      <Row>
        <StyledCol xs={2} sm={4} md={6} lg={8} xl={10}>
          Col
        </StyledCol>
        <StyledCol xs={20} sm={16} md={12} lg={8} xl={4}>
          Col
        </StyledCol>
        <StyledCol xs={2} sm={4} md={6} lg={8} xl={10}>
          Col
        </StyledCol>
      </Row>
    </>
  );
}

export const meta = {
  title: '响应式布局',
  desc: '预设五个响应尺寸：`xs` `sm` `md` `lg` `xl`。',
};
