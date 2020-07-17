import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, LoopSwipe, useLoopSwipe } from '@muya-ui/core';

const View = styled.div`
  height: 90px;
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
    return views.map((i, index) => {
      const width = Math.floor(Math.random() * 20) * 10 + 50;
      return <View key={index} style={{ width }}>{`View ${index + 1}`}</View>;
    });
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
  title: '【循环】子元素不规则',
  desc: '子元素不规则时，轮播组件的使用',
};
