import React from 'react';
import styled from 'styled-components';

import { Img } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

const BasicImg = styled(Img)`
  width: 100%;
  height: 200px;
  background-color: #ddd;
  background-size: auto;
`;

export default function SuffixSizeDemo() {
  return <BasicImg suffixWidth={1920} suffixHeight={200} q={90} src={exampleImgSrc} />;
}

export const meta = {
  title: '设置图片后缀后缀',
  desc:
    '图片后缀宽高设置一般在 Banner 、轮播的组件中可能会用到，设置原始图片尺寸、同时设置图片的质量',
};
