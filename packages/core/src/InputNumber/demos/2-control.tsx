import React from 'react';
import styled from 'styled-components';

import { InputNumber } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function ControlDemo() {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <StyledDiv>
        <InputNumber
          value={value}
          placeholder="请输入"
          onChange={v => {
            setValue(v);
          }}
        />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '受控组件',
  desc: '使用受控组件的方式来使用 InputNumber',
};
