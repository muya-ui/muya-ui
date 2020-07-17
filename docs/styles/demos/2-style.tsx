import React from 'react';
import styled from 'styled-components';

import { Carousel } from '@muya-ui/core';

const Container = styled.div`
  .carousel {
    height: 200px;
  }
`;

const indicatorStyles = {
  index: {
    marginRight: 20,
  },
};
const styles = {
  indicator: {
    justifyContent: 'flex-end',
  },
};
const imgs = [
  '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
];
export default function BasicDemo() {
  // 在图片的量比较少的情况，可以直接把 lazy 设置为 off，关掉懒加载
  return (
    <Container>
      <Carousel
        className="carousel"
        lazy="off"
        autoplay={5}
        duration={1000}
        arrowSize="xl"
        imgs={imgs}
        animation="swipe"
        arrow="hover"
        indicatorTrigger="hover"
        defaultIndex={2}
        styles={styles}
        indicatorStyles={indicatorStyles}
      />
    </Container>
  );
}

export const meta = {
  title: '自定义的 style',
  desc: '给对应的子节点传自定义的 style',
};
