import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, LoopSwipe, useLoopSwipe } from '@muya-ui/core';

const View = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #00a0e9;
  box-sizing: border-box;
  text-align: center;
`;
const Container = styled.div`
  display: block;
`;

const StyledLoopSwipe = styled(LoopSwipe)`
  height: 300px;
  width: 150px;
`;

const ButtonContainer = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export default function VerticalLoopSwipeDemo() {
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
        <StyledLoopSwipe
          direction="vertical"
          equalNum={3}
          gutter={5}
          stepIndex={innerStepIndex}
          itemIndex={innerItemIndex}
          onStepsChange={onStepsChange}
        >
          {subViews}
        </StyledLoopSwipe>
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
  title: '【循环】垂直方向',
  desc: '你也可以设置垂直方向滚动',
};
