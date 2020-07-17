import React from 'react';
import styled from 'styled-components';

import { InputNumber } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function LimitDemo() {
  const [value, setValue] = React.useState(22);
  return (
    <>
      <StyledDiv>
        <InputNumber value={value} max={20} min={0} onChange={v => setValue(v)} />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '设置数字上下限',
  desc: '通过 max 及 min 属性设置上下限',
};
