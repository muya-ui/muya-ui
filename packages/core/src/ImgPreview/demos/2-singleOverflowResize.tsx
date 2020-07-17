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

export default function SingleOverflowResizeDemo() {
  const [open, setOpen] = useState(false);
  const onImgClick = () => setOpen(true);
  const onImgPreviewClose = () => setOpen(false);
  return (
    <>
      <BasicImg src={imgUrl} onClick={onImgClick} />
      <ImgPreview src={imgUrl} open={open} overflowResize onClose={onImgPreviewClose} />
    </>
  );
}

export const meta = {
  title: '单图预览（overflowResize：true）',
  desc: '单图预览，超出使用缩放而不是滚动条',
};
