import React from 'react';
import styled from 'styled-components';

import { Col, IImgEvent, Img, ImgImg, ImgSpan, Row } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ840x2160.jpg@!212';

const style = {
  width: 160,
  height: 300,
};

const Box = styled.div`
  height: 360px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ElementDemo() {
  const handleError = (e: IImgEvent) => {};
  return (
    <Row justify="space-between" gutter={20}>
      <Col span={8}>
        <div>默认基础节点是 div</div>
        <Box>
          <Img style={style} src={exampleImgSrc} onError={handleError} />
        </Box>
      </Col>
      <Col span={8}>
        <div>使用 span</div>
        <Box>
          <ImgSpan style={style} src={exampleImgSrc} onError={handleError} />
        </Box>
      </Col>
      <Col span={8}>
        <div>使用 img</div>
        <Box>
          <ImgImg style={style} src={exampleImgSrc} onError={handleError} />
        </Box>
      </Col>
    </Row>
  );
}

export const meta = {
  title: '图片出错情况',
  desc: `
\`div\`、\`span\` 节点将使用 \`background-repeat\`
`,
};
