import React from 'react';
import styled from 'styled-components';

import { InputNumber } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function FloatDemo() {
  return (
    <>
      <StyledDiv>
        <InputNumber defaultValue={6.66} precision={2} step={0.1} />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '小数使用',
  desc: '通过设置 precision 控制小数精度',
};
