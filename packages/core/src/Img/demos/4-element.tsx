import React from 'react';
import styled from 'styled-components';

import { Col, Img, ImgImg, ImgSpan, Row } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

const style = {
  width: 100,
  height: 80,
};

const Box = styled.div`
  height: 100px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ElementDemo() {
  return (
    <Row justify="space-between" gutter={20}>
      <Col span={8}>
        <div>默认基础节点是 div</div>
        <Box>
          <Img style={style} src={exampleImgSrc} />
        </Box>
      </Col>
      <Col span={8}>
        <div>使用 span</div>
        <Box>
          <ImgSpan style={style} src={exampleImgSrc} />
        </Box>
      </Col>
      <Col span={8}>
        <div>使用 img</div>
        <Box>
          <ImgImg style={style} src={exampleImgSrc} />
        </Box>
      </Col>
    </Row>
  );
}

export const meta = {
  title: '设置图片节点类型',
  desc:
    '默认节点是 `div` ，也可以设置 `span` 、 `img`。\n\n需要注意：`div` 、 `span` 有一些默认的样式',
};
