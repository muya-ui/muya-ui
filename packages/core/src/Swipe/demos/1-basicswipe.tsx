import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, Swipe, useSwipe } from '@muya-ui/core';

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

export default function SwipeDemo() {
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
        <Swipe
          equalNum={3}
          gutter={5}
          stepIndex={innerStepIndex}
          itemIndex={innerItemIndex}
          defaultIndex={3}
          transitionStatus={transitionStatus}
          onStepsChange={onStepsChange}
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
  title: '【不循环】基础使用',
  desc: `
支持滚轮，点击切换响应更快

有几个情况需要注意：

* 单个元素宽度或者高度不能超过容器
* 滚动过程中不能动态的去更改子元素的宽高
* 如果要设置起始的动画状态，可以从 \`useSwipe\` 中返回的 \`transitionStatus\` 传回组件

`,
};
