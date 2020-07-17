import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, Swipe, useSwipe } from '@muya-ui/core';

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

export default function VerticalSwipeDemo() {
  const {
    stepIndex,
    itemIndex,
    hasNext,
    hasPrev,
    hasNextItem,
    hasPrevItem,
    onNext,
    onItemNext,
    onPrev,
    onItemPrev,
    onStepsChange,
    transitionStatus,
  } = useSwipe();
  const [moveType, setMoveType] = React.useState<'page' | 'item'>('page');
  const handlePrev = moveType === 'page' ? onPrev : onItemPrev;
  const handleNext = moveType === 'page' ? onNext : onItemNext;
  const disabledPrev = moveType === 'page' ? !hasPrev : !hasPrevItem;
  const disabledNext = moveType === 'page' ? !hasNext : !hasNextItem;
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
          <Button onClick={handlePrev} disabled={disabledPrev}>
            Prev
          </Button>
        </ButtonContainer>
        <Swipe
          stepIndex={innerStepIndex}
          itemIndex={innerItemIndex}
          onStepsChange={onStepsChange}
          transitionStatus={transitionStatus}
        >
          {subViews}
        </Swipe>
        <ButtonContainer>
          <Button onClick={handleNext} disabled={disabledNext}>
            Next
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  );
}

export const meta = {
  title: '【不循环】子元素不规则',
  desc: '子元素不规则时，轮播组件的使用',
};
