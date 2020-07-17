import React, { useState } from 'react';
import styled from 'styled-components';

import { Input } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function TextareaDemo() {
  return (
    <>
      <StyledDiv>
        <Input placeholder="简单的多行输入框" multiline />
      </StyledDiv>
      <StyledDiv>
        <Input
          height={300}
          width="100%"
          placeholder="自定义大小的多行输入框"
          minRows={20}
          maxRows={20}
          multiline
          limit={50}
        />
      </StyledDiv>
      <StyledDiv>
        <Input placeholder="不可拖拽调整高度" multiline limit={10} resize="none" />
      </StyledDiv>
      <StyledDiv>
        <Input placeholder="自适应高度" multiline autosize />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '多行输入框',
  desc:
    '1. 设置 `multiline` 为 `true` 即可使用多行输入框。支持 `limit` 字数限制功能\n\n2. 支持设置 `resize` 属性来设置多行输入看是否可以拖拽调整高度\n\n3. 多行输入框支持传入`autosize`自适应高度 \n\n 3. 通过`height`和`width`自定义大小',
};
