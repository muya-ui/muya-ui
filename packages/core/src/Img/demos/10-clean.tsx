import React from 'react';
import styled from 'styled-components';

import { Img } from '@muya-ui/core';

const exampleImgSrc =
  'https://qhyxpicoss.kujiale.com/r/2019/09/14/L3D206S20ENDIBRWWVAUI5NFSLUF3P3X6888_2560x1440.jpg?x-oss-process=image/resize,w_800/watermark,image_bG9nb185Ni5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8z,color_FFFFFF,size_15,align_1,interval_3,type_ZmFuZ3poZW5naGVpdGk=,x_10,y_5,text_QOmZiOi-iQ==';

const Box = styled.div`
  max-width: 920px;
  & .img {
    width: 80%;
    height: 200px;
  }
`;

export default function ResizeDemo() {
  return (
    <Box>
      <Img className="img" src={exampleImgSrc} clean="/watermark[^/]*" />
    </Box>
  );
}

export const meta = {
  title: '保留水印',
  desc: '通过设置 clean 保留水印',
};
