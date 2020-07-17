import React, { useState } from 'react';
import styled from 'styled-components';

import { Img, ImgPreview } from '@muya-ui/core';

const imgUrl =
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575522314109/A40D2156C2BEF0A95420F26ED5C4A20B.png';

const BasicImg = styled(Img)`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  cursor: pointer;
`;

export default function ErrorDemo() {
  const [open, setOpen] = useState(false);
  const onImgClick = () => setOpen(true);
  const onImgPreviewClose = () => setOpen(false);
  return (
    <>
      <BasicImg src={imgUrl} onClick={onImgClick} />
      <ImgPreview
        src={imgUrl + '模拟加载失败'}
        open={open}
        overflowResize={false}
        onClose={onImgPreviewClose}
      />
    </>
  );
}

export const meta = {
  title: '错误态',
  desc: '图片加载失败呈现错误态。',
};
