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
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D124S8ENDIBAK4CQUI5L7ELUF3P3XU888_4000x3000.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/02/L3D186S21ENDIBOFOCIUI5NYALUF3P3XI888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/25/L3D121S21ENDIB7FMFAUI5NYALUF3P3XS888_1600x1200.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAEWMYUI5L7ELUF3P3WE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/18/L3D186S20ENDIBDO5PQUI5NYALUF3P3WK888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S8ENDIB7W6HIUI5NFSLUF3P3WK888_1920x1080.jpg',
  '//qhrenderpicoss.kujiale.com/r/2019/06/12/L3D186S8ENDIAP2PAYUI5NFSLUF3P3XC888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D124S8ENDIB7VGSQUI5NFSLUF3P3WU888_4000x3000.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D124S8ENDIB7VFMAUI5NFSLUF3P3WS888_4000x3000.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/16/L3D206S20ENDIBE5UQYUI5NFSLUF3P3XW888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S20ENDIB7XCSIUI5NYALUF3P3XY888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/17/L3D220S20ENDIAMQFKAUI5NYALUF3P3W6888.0_4500x750.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D124S8ENDIBAE5AQUI5L7ELUF3P3XY888_4000x3000.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D121S21ENDIBAGULAUI5NFSLUF3P3WO888_1600x1200.jpg',
];

const Container = styled(ImgContainer)`
  position: relative;

  .index-swipe {
    margin: 0;
  }

  .main-swipe {
    height: 400px;
  }

  .main-img {
    height: 100%;
  }

  .pager-col {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
  }

  .index-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }

  .index-img {
    height: 80px;
    position: relative;
  }

  .index-img-mask {
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

    &.active {
      border: 4px solid #1a7af8;
      cursor: default;
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export default function ImgListDemo() {
  const { stepIndex, onNext, hasNext, hasPrev, onStepsChange, onPrev } = useSwipe();

  const [index, setIndex] = useState(0);

  return (
    <Container>
      <Swipe className="main-swipe" equalNum={1} stepIndex={index} duration={600}>
        {imgs.map((item, i) => (
          <Img className="main-img" key={i} src={item} />
        ))}
      </Swipe>
      <div className="index-container">
        <div className="pager-col">
          <PagerButton size="xl" arrow="left" side="right" disabled={!hasPrev} onClick={onPrev} />
        </div>
        <Swipe
          className="index-swipe"
          equalNum={10}
          gutter={10}
          onStepsChange={onStepsChange}
          stepIndex={stepIndex}
        >
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
        <div className="pager-col">
          <PagerButton size="xl" arrow="right" side="left" disabled={!hasNext} onClick={onNext} />
        </div>
      </div>
    </Container>
  );
}

export const meta = {
  title: '组装复杂轮播 - 图片浏览',
  desc: `
你也可以通过 \`Img\` 、\`Swipe\` 、\`PagerButton\` 、\`IndexIndicator\` 组装成你想要的复杂轮播，案例中就有上下两个轮播组成
`,
};
