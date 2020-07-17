import { InputNumber } from '@muya-ui/core';

import React from 'react';

import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function SimpleDemo() {
  return (
    <>
      <StyledDiv>
        <InputNumber size="s" placeholder="请输入" />
      </StyledDiv>
      <StyledDiv>
        <InputNumber size="s" placeholder="请输入" hiddenArrow />
      </StyledDiv>
      <StyledDiv>
        <InputNumber placeholder="请输入" />
      </StyledDiv>
      <StyledDiv>
        <InputNumber size="l" placeholder="请输入" />
      </StyledDiv>
      <StyledDiv>
        <InputNumber size="xl" placeholder="请输入" />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '基本使用',
  desc:
    '输入框有四个尺寸，符合表单规范，输入框可以禁用。\n\n对于开发者，建议使用受控组件的方式来使用 InputNumber',
};
