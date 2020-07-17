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
        <Progress progress={30} style={{ marginRight: '8px', height: '4px' }} />
        <Text color="assistant">4px</Text>
      </Wrapper>
      <Wrapper>
        <Progress progress={50} style={{ marginRight: '8px' }} />
        <Text color="assistant">6px</Text>
      </Wrapper>
      <Wrapper>
        <Progress progress={70} style={{ marginRight: '8px', height: '10px' }} />
        <Text color="assistant">10px</Text>
      </Wrapper>
      <Wrapper>
        <Progress progress={30} type="circle" fontSize={64} />
      </Wrapper>
      <Wrapper>
        <Progress progress={50} type="circle" fontSize={80} />
      </Wrapper>
      <Wrapper>
        <Progress progress={70} type="circle" fontSize={112} />
      </Wrapper>
      <Wrapper>
        <Progress
          progress={60}
          circleLineWidth={40}
          showPercentage={false}
          roundedStroke={false}
          fontSize={112}
          type="circle"
        />
      </Wrapper>
    </>
  );
}

export const meta = {
  title: '自定义尺寸',
  desc:
    '1. 自定义线型进度条的宽高来控制尺寸\n\n 2. 设置环形进度条的`fontSize`来控制整体大小\n\n 3. 设置`circleLineWidth`调整环状进度条的粗细，设置`roundStorke`调整环状进度条两端形状',
};
