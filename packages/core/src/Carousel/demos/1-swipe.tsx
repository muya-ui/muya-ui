import React, { useState } from 'react';
import styled from 'styled-components';

import { Carousel } from '@muya-ui/core';

// 可以直接设置外容器的样式
const StyledCarousel = styled(Carousel)`
  height: 400px;
`;

const StyledIndex = styled.div`
  color: #fff;
  font-size: 16px;
  position: absolute;
  z-index: 10;
  right: 20px;
  bottom: 20px;
`;

const StyledA = styled.a`
  width: 100%;
  height: 100%;
  display: block;
`;

const defaultStyles = {
  img: 'test-img',
};

export default function SwipeDemo() {
  const imgItems = React.useMemo(() => {
    return [
      '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
      '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
      '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
      '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
      '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
      '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
    ].map(imgSrc => ({
      imgSrc,
      children: <StyledA href={imgSrc} />,
    }));
  }, []);
  const [index, setIndex] = useState(1);

  // 在图片的量比较少的情况，可以直接把 lazy 设置为 off，关掉懒加载
  return (
    <StyledCarousel
      lazy="off"
      autoplay={5}
      duration={1000}
      arrowSize="xl"
      imgs={imgItems}
      animation="swipe"
      arrow="hover"
      indicatorTrigger="hover"
      defaultIndex={2}
      styles={defaultStyles}
      onChange={(src: string, index: number) => {
        setIndex(index + 1);
      }}
    >
      <StyledIndex>
        {index}/{imgItems.length}
      </StyledIndex>
    </StyledCarousel>
  );
}

export const meta = {
  title: 'Swipe轮播',
  desc: 'Swipe轮播，hover切换',
};
