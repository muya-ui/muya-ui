import React from 'react';
import styled from 'styled-components';

import { Img } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

const Box = styled.div`
  max-width: 920px;
`;

const BasicImg = styled(Img)`
  width: 80%;
  height: 200px;
`;

export default function ResizeDemo() {
  return (
    <Box>
      <BasicImg src={exampleImgSrc} resize="on" wait="on" />
    </Box>
  );
}

export const meta = {
  title: 'resize 自适应',
  desc: '监听窗口的 resize 事件，为图片设置合适的尺寸',
};
