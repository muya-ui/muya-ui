import React from 'react';
import styled from 'styled-components';

import { Progress, Typography } from '@muya-ui/core';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
`;

const { Text } = Typography;
export default function Simple() {
  return (
    <>
      <Wrapper>
        <Progress progress={30} style={{ marginRight: '8px' }} />
        <Text color="assistant">30%</Text>
      </Wrapper>
      <Wrapper>
        <Progress progress={70} status="error" style={{ marginRight: '8px' }} />
        <Text color="assistant">70%</Text>
      </Wrapper>
      <Wrapper>
        <Progress progress={100} style={{ marginRight: '8px' }} />
        <Text type="success">100%</Text>
      </Wrapper>
    </>
  );
}

export const meta = {
  title: '简单的进度条',
  desc: '进度条有`normal`、`success`、`error`三种状态，控制progress的值展示不同的进度',
};
