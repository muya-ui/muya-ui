import React, { useState } from 'react';
import styled from 'styled-components';

import { Img, ImgContainer, Swipe } from '@muya-ui/core';

const imgs = [
  '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
];

const Container = styled(ImgContainer)`
  position: relative;

  .index-swipe {
    margin: 0;
    width: 50%;
    height: 80px;
  }

  .main-swipe {
    height: 400px;
  }

  .main-img {
    height: 100%;
  }

  .index-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
  }

  .index-img {
    height: 80px;
    position: relative;
  }

  .index-img-mask {
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    &.active {
      cursor: default;
      background: rgba(255, 255, 255, 0);
    }
  }
`;

export default function ImgDemo() {
  const [index, setIndex] = useState(0);

  return (
    <Container>
      <Swipe className="main-swipe" equalNum={1} stepIndex={index} duration={600}>
        {imgs.map((item, i) => (
          <Img className="main-img" key={i} src={item} />
        ))}
      </Swipe>
      <div className="index-container">
        <Swipe className="index-swipe" equalNum={imgs.length} gutter={10}>
          {imgs.map((imgSrc, i) => {
            const selected = index === i;
            let node;
            if (!selected) {
              node = <div className="index-img-mask"></div>;
            } else {
              node = <div className="index-img-mask active"></div>;
            }
            const onClick = () => {
              setIndex(i);
            };

            return (
              <Img className="index-img" key={i} onClick={onClick} src={imgSrc}>
                {node}
              </Img>
            );
          })}
        </Swipe>
      </div>
    </Container>
  );
}

export const meta = {
  title: '组装复杂轮播',
  desc: `
你也可以通过 \`Img\` 、\`Swipe\` 、\`PagerButton\` 、\`IndexIndicator\` 组装成你想要的复杂轮播，案例中就有上下两个轮播组成
`,
};
