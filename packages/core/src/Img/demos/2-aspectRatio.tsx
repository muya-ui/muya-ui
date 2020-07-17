import React from 'react';
import styled from 'styled-components';

import { ImgDiv } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

const ColImg = styled(ImgDiv)`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Col = styled.div`
  flex: 1;
  position: relative;
  padding: 0 20px;
`;

const TextDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
`;

export default function AspectRatioDemo() {
  return (
    <Container>
      <Col>
        <ColImg aspectRatio="1:1" src={exampleImgSrc}>
          <TextDiv>1:1</TextDiv>
        </ColImg>
      </Col>
      <Col>
        <ColImg aspectRatio="4:3" src={exampleImgSrc}>
          <TextDiv>4:3</TextDiv>
        </ColImg>
      </Col>

      <Col>
        <ColImg aspectRatio="3:2" src={exampleImgSrc}>
          <TextDiv>3:2</TextDiv>
        </ColImg>
      </Col>
      <Col>
        <ColImg aspectRatio="16:9" src={exampleImgSrc}>
          <TextDiv>16:9</TextDiv>
        </ColImg>
      </Col>
      <Col>
        <ColImg aspectRatio="3:4" src={exampleImgSrc}>
          <TextDiv>3:4</TextDiv>
        </ColImg>
      </Col>
    </Container>
  );
}

export const meta = {
  title: '快捷设置图片宽高比',
  desc: `
需要注意的是，
* 当使用 \`ImgImg\` 时，\`aspectRatio\`将会失效
* 当前使用的等比缩放实现是通过 \`padding-bottom\` 来实现的，限制较多，需注意
* 当传入的 \`width\` 属性为 number 时，将自动不使用 \`padding-bottom\` ，同时根据比例设置对应的高度
* 当传入的 \`width\` 属性为 string 时，将设置高度为 0
`,
};
