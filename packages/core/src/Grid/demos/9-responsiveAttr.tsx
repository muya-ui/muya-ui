import React from 'react';
import styled from 'styled-components';

import { Col, Row } from '@muya-ui/core';

const StyledCol = styled(Col)`
  min-height: 30px;
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

export default function ResponsiveAttrDemo() {
  return (
    <>
      <Row gutter={{ xs: 10, lg: 20 }}>
        <StyledCol className="col" xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <GutterBox>Col</GutterBox>
        </StyledCol>
        <StyledCol className="col" xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <GutterBox>Col</GutterBox>
        </StyledCol>
        <StyledCol className="col" xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <GutterBox>Col</GutterBox>
        </StyledCol>
      </Row>
    </>
  );
}

export const meta = {
  title: '其他属性的响应式',
  desc:
    '`span` `pull` `push` `offset` `order` 属性可以通过内嵌到 `xs` `sm` `md` `lg` `xl` 属性中来使用。\n\n其中 `xs={6}` 相当于 `xs={{ span: 6 }}`。',
};
