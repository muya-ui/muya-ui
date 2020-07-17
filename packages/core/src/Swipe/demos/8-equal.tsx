import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Swipe } from '@muya-ui/core';

const View = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: green;
  box-sizing: border-box;
  border: 1px solid #fff;
  color: #fff;
  background-color: #00a0e9;
`;
const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export default function SwipeDemo() {
  const [num, setNum] = useState(1);
  const views = Array(num).fill(0);
  return (
    <div>
      <Container>
        <Swipe equalNum={views.length} gutter={10}>
          {views.map((i, index) => (
            <View key={index}>{`View ${index + 1}`}</View>
          ))}
        </Swipe>
      </Container>
      <div>
        <Button onClick={() => setNum(num + 1)}>增加列</Button>
      </div>
    </div>
  );
}

export const meta = {
  title: '等分列',
  desc: '作为等分列来使用',
};
