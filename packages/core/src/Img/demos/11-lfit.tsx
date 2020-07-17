import React from 'react';
import styled from 'styled-components';

import { Img } from '@muya-ui/core';

const exampleImgSrc =
  'https://qhyxpicoss.kujiale.com/r/2019/09/14/L3D206S20ENDIBRWWVAUI5NFSLUF3P3X6888_2560x1440.jpg';

const Box = styled.div`
  & .img {
    width: 320px;
    height: 320px;
    background-size: contain;
    background-color: #ccc;
  }
`;

export default function ResizeDemo() {
  return (
    <Box>
      <Img className="img" src={exampleImgSrc} resizeMode="lfit" />
    </Box>
  );
}

export const meta = {
  title: '等比缩放不剪裁',
  desc: '等比缩放不剪裁',
};
