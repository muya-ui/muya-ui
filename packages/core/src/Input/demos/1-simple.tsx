import React, { useState } from 'react';
import styled from 'styled-components';

import { CheckboxGroup, IInputProps, Input } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function SimpleDemo() {
  const options = ['multiline', 'autosize', 'disabled'];
  const [value, setValue] = useState<string[]>([]);
  const props: IInputProps = {
    resize: 'none',
  };
  value.forEach((k: string) => {
    props[k] = true;
  });
  return (
    <>
      <StyledDiv>
        <Input size="s" {...props} placeholder="size: s" />
      </StyledDiv>
      <StyledDiv>
        <Input size="m" {...props} placeholder="size: m" />
      </StyledDiv>
      <StyledDiv>
        <Input size="l" {...props} placeholder="size: l" />
      </StyledDiv>
      <StyledDiv>
        <Input width="100%" size="xl" {...props} placeholder="size: xl" />
      </StyledDiv>
      <CheckboxGroup value={value} options={options} onChange={v => setValue(v as string[])} />
    </>
  );
}

export const meta = {
  title: '基本使用',
  desc:
    '输入框有四个尺寸，符合表单规范，输入框可以禁用。\n\n对于开发者，建议使用受控组件的方式来使用 Input',
};
