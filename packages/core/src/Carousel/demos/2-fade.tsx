import React from 'react';
import styled from 'styled-components';

import { Carousel } from '@muya-ui/core';

const StyledCarousel = styled(Carousel)`
  height: 400px;
`;

export default function FadeDemo() {
  const imgs: string[] = [
    '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  ];
  return (
    <StyledCarousel
      animation="fade"
      arrow="hover"
      autoplay={5}
      duration={1000}
      arrowSize="xl"
      indicator="left"
      imgs={imgs}
    />
  );
}

export const meta = {
  title: '淡入淡出轮播',
  desc: '淡入淡出轮播，点击切换',
};
