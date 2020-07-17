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

export default function EqualNumDemo() {
  const views = Array(20).fill(0);
  return (
    <Row equalNum={{ md: 4, lg: 5 }} gutter={{ xs: 10, lg: 20 }}>
      {views.map((i, index) => (
        <StyledCol key={index} className="col">
          <GutterBox>Col</GutterBox>
        </StyledCol>
      ))}
    </Row>
  );
}

export const meta = {
  title: '等分',
  desc:
    '传入 `equalNum`，即可实现任意等分， 但是会导致 Row 底下的 Col 的 `span`、`offset`、`push`、`pull` 参数失效',
};
