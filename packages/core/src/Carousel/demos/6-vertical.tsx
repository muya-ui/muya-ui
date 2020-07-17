import { throttle } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Img, ImgContainer, PagerButton, Swipe, useSwipe } from '@muya-ui/core';

const imgs = [
  '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
];

const Container = styled(ImgContainer)`
  display: flex;
  height: 400px;
`;
const StyledMainSwipe = styled(Swipe)`
  height: 400px;
`;
const StyledMainImg = styled(Img)`
  height: 100%;
`;
const Mask = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const ActiveMask = styled.div`
  box-sizing: border-box;
  border: 4px solid #1a7af8;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
const IndexImg = styled(Img)`
  height: 90px;
  position: relative;
`;

const PagerButtonCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10;
  opacity: 0;
`;
const StyledIndexContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    ${PagerButtonCol} {
      opacity: 1;
    }
  }
`;
const StyledSwipe = styled(Swipe)`
  margin: 0;
  width: 160px;
`;

export default function VerticalDemo() {
  const {
    stepIndex,
    offset,
    onNext,
    hasNext,
    hasPrev,
    onStepsChange,
    onPrev,
    onWheel,
    onWheelActive,
    onWheelDisable,
  } = useSwipe();
  // 注意：https://reactjs.org/docs/events.html#event-pooling
  const wheelHandler = throttle(onWheel, 50, { leading: true, trailing: false });

  const [index, setIndex] = useState(0);

  return (
    <Container>
      <StyledIndexContainer>
        <PagerButtonCol style={{ top: 0 }}>
          <PagerButton size="xl" arrow="top" disabled={!hasPrev} onClick={onPrev} />
        </PagerButtonCol>
        <StyledSwipe
          equalNum={4}
          gutter={8}
          offset={offset}
          direction="vertical"
          onStepsChange={onStepsChange}
          stepIndex={stepIndex}
          onWheel={wheelHandler}
          onMouseEnter={onWheelActive}
          onMouseLeave={onWheelDisable}
        >
          {imgs.map((imgSrc, i) => {
            const selected = index === i;
            let node;
            if (!selected) {
              node = <Mask />;
            } else {
              node = <ActiveMask />;
            }
            const onClick = () => {
              setIndex(i);
            };

            return (
              <IndexImg key={i} onClick={onClick} src={imgSrc}>
                {node}
              </IndexImg>
            );
          })}
        </StyledSwipe>
        <PagerButtonCol style={{ bottom: 0 }}>
          <PagerButton size="xl" arrow="bottom" disabled={!hasNext} onClick={onNext} />
        </PagerButtonCol>
      </StyledIndexContainer>
      <StyledMainSwipe equalNum={1} stepIndex={index} duration={600}>
        {imgs.map((item, i) => (
          <StyledMainImg key={i} src={item} />
        ))}
      </StyledMainSwipe>
    </Container>
  );
}

export const meta = {
  title: '组装复杂轮播 - 垂直情况',
  desc: '组装复杂轮播 - 垂直情况，右侧轮播支持滚动',
};
