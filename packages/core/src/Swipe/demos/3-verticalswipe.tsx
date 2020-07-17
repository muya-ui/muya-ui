import { throttle } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { useThrottle } from '@muya-ui/utils';
import { Button, ButtonGroup, Swipe, useSwipe } from '@muya-ui/core';

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

const StyledSwipe = styled(Swipe)`
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
export default function VerticalSwipeDemo() {
  const {
    stepIndex,
    itemIndex,
    offset,
    hasNext,
    hasPrev,
    hasNextItem,
    hasPrevItem,
    onNext,
    onItemNext,
    onPrev,
    onItemPrev,
    onStepsChange,
    onWheel,
    onWheelActive,
    onWheelDisable,
  } = useSwipe();

  const [moveType, setMoveType] = React.useState<'page' | 'item'>('page');
  const handlePrev = moveType === 'page' ? onPrev : onItemPrev;
  const handleNext = moveType === 'page' ? onNext : onItemNext;
  const disabledPrev = moveType === 'page' ? !hasPrev : !hasPrevItem;
  const disabledNext = moveType === 'page' ? !hasNext : !hasNextItem;
  const innerStepIndex = moveType === 'page' ? stepIndex : -1;
  const innerItemIndex = moveType === 'page' ? -1 : itemIndex;
  const handleWheel = useThrottle(onWheel, 50);

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
          <Button onClick={handlePrev} disabled={disabledPrev}>
            Prev
          </Button>
        </ButtonContainer>
        <StyledSwipe
          direction="vertical"
          equalNum={3}
          gutter={5}
          stepIndex={innerStepIndex}
          itemIndex={innerItemIndex}
          offset={offset}
          onWheel={handleWheel}
          onMouseEnter={onWheelActive}
          onMouseLeave={onWheelDisable}
          onStepsChange={onStepsChange}
        >
          {subViews}
        </StyledSwipe>
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
  title: '【不循环】垂直方向',
  desc: '支持滚动操作',
};
