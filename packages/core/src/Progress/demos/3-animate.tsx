import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, Progress, Typography } from '@muya-ui/core';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
`;

const { Text } = Typography;

export default function Animate() {
  const [progress, setProgress] = useState(10);

  const increase = () => {
    if (progress < 100) {
      setProgress(progress + 10);
    }
  };

  const decrease = () => {
    if (progress > 10) {
      setProgress(progress - 10);
    }
  };
  return (
    <>
      <Wrapper>
        <Progress progress={progress} style={{ marginRight: '8px' }} />
        <Text color="assistant" type={progress >= 100 ? 'success' : undefined}>
          {progress}%
        </Text>
      </Wrapper>
      <Wrapper>
        <Progress progress={progress} type="circle" />
      </Wrapper>
      <ButtonGroup>
        <Button onClick={decrease}>-</Button>
        <Button onClick={increase}>+</Button>
      </ButtonGroup>
    </>
  );
}

export const meta = {
  title: '进度动画',
  desc: '会动的进度条才是好进度条',
};
