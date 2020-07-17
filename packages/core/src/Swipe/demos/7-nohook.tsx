import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, LoopSwipe } from '@muya-ui/core';

const View = styled.div`
  height: 200px;
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

export default function NoHookSwipeDemo() {
  const [index, setIndex] = useState(0);
  const subViews = React.useMemo(() => {
    const views = Array(10).fill(0);
    return views.map((i, index) => <View key={index}>{`View ${index + 1}`}</View>);
  }, []);
  const handlePrev = React.useCallback(() => {
    setIndex(prevIndex => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        return 9;
      }
      return newIndex;
    });
  }, []);
  const handleNext = React.useCallback(() => {
    setIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      if (newIndex > 9) {
        return 0;
      }
      return newIndex;
    });
  }, []);

  return (
    <div>
      <Container>
        <LoopSwipe equalNum={1} stepIndex={index}>
          {subViews}
        </LoopSwipe>
      </Container>
      <div className="doc-button-container">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}

export const meta = {
  title: 'No hook',
  desc: '当个数可预测时，可以不使用 Hooks 来切换轮播',
};
