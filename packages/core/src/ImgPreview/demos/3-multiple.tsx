import React, { useState } from 'react';
import styled from 'styled-components';

import { Img, ImgPreview } from '@muya-ui/core';

const imgUrl =
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575522314109/A40D2156C2BEF0A95420F26ED5C4A20B.png';

const imgUrls = [
  imgUrl,
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632414453/6F636EC9BF76051907A79320247A47DC.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632477623/EB373D8131655B7BECB88AB250E97248.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943923231/2D9364A9D040352782D9B9C1B2281D38.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1590399986149/10187C0092B5488C0B697E9C31EB799F.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1590399984895/35F76138B1969D25EF4030ECBEC35A4E.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1590399985801/1085D6AA13F6876898534D41CDBD0FD9.png',
];

const BasicImg = styled(Img)`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  cursor: pointer;
`;

export default function MultipleDemo() {
  const [open, setOpen] = useState(false);
  const onImgClick = () => setOpen(true);
  const onImgPreviewClose = () => setOpen(false);
  return (
    <>
      <BasicImg src={imgUrl} onClick={onImgClick} />
      <ImgPreview
        src={imgUrls}
        mode="multiple"
        open={open}
        overflowResize={false}
        onClose={onImgPreviewClose}
      />
    </>
  );
}

export const meta = {
  title: '多图预览（overflowResize：false）',
  desc: '多图预览，超出使用滚动条而不是缩放。',
};
