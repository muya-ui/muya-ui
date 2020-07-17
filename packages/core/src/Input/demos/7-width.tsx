import React from 'react';
import styled from 'styled-components';

import { Input } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function SizeDemo() {
  return (
    <>
      <StyledDiv>
        <Input placeholder="自定义宽高" width="100%" height={50} />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '自定义宽高',
  desc: '提供了 `width` 和 `height` 属性，方便开发者自定义宽高，可避免使用内联样式。',
};
