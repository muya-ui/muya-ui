import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, LoopSwipe, useLoopSwipe } from '@muya-ui/core';

const View = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: green;
  box-sizing: border-box;
  color: #fff;
  background-color: #00a0e9;
`;
const Container = styled.div`
  display: flex;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export default function LoopSwipeDemo() {
  const {
    stepIndex,
    itemIndex,
    stepSize,
    onNext,
    onItemNext,
    onPrev,
    onItemPrev,
    onStepsChange,
    transitionStatus,
  } = useLoopSwipe();
  const [moveType, setMoveType] = React.useState<'page' | 'item'>('page');
  const handlePrev = moveType === 'page' ? onPrev : onItemPrev;
  const handleNext = moveType === 'page' ? onNext : onItemNext;
  const innerStepIndex = moveType === 'page' ? stepIndex : -1;
  const innerItemIndex = moveType === 'page' ? -1 : itemIndex;

  const subViews = React.useMemo(() => {
    const views = Array(20).fill(0);
    return views.map((i, index) => <View key={index}>{`View ${index + 1}`}</View>);
  }, []);
  return (
    <div>
      <ButtonGroup style={{ marginBottom: 10 }}>
        <Button plain={moveType !== 'page'} onClick={() => setMoveType('page')}>
          按容器翻页
        </Button>
        <Button plain={moveType !== 'item'} onClick={() => setMoveType('item')}>
          按子元素翻页
        </Button>
      </ButtonGroup>
      <Container>
        <ButtonContainer>
          <Button onClick={handlePrev} disabled={stepSize < 2}>
            Prev
          </Button>
        </ButtonContainer>
        <LoopSwipe
          equalNum={3}
          gutter={5}
          stepIndex={innerStepIndex}
          itemIndex={innerItemIndex}
          transitionStatus={transitionStatus}
          onStepsChange={onStepsChange}
        >
          {subViews}
        </LoopSwipe>
        <ButtonContainer>
          <Button onClick={handleNext} disabled={stepSize < 2}>
            Next
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  );
}

export const meta = {
  title: '【循环】默认水平',
  desc: '循环轮播',
};
