import React from 'react';
import styled from 'styled-components';

import { InputNumber } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function WidthDemo() {
  return (
    <>
      <StyledDiv>
        <InputNumber defaultValue={6} width="80%" height={50} iconSize={10} />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '自定义宽高及 IconSize',
  desc: '提供了 `width`、`height`、`IconSize` 属性，方便开发者自定义大小，可避免使用内联样式。',
};
