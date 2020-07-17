import React from 'react';
import styled from 'styled-components';

import { InputNumber } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function NodeDemo() {
  return (
    <>
      <StyledDiv>
        <InputNumber defaultValue={6} prefixNode="￥" />
      </StyledDiv>
      <StyledDiv>
        <InputNumber defaultValue={6} suffixNode="元" />
      </StyledDiv>
      <StyledDiv>
        <InputNumber hiddenArrow defaultValue={6} suffixNode="元" />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '自定义前缀/后缀',
  desc:
    '设置 `prefixNode`、`suffixNode`，可传入 `ReactNode` 类型\n\n文字节点会有固定的颜色，`ReactElement` 会有类似按钮的样式',
};
