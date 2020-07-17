import React, { useState } from 'react';
import styled from 'styled-components';

import { ImgPreview, Button } from '@muya-ui/core';

const imgUrls = [
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575522314109/A40D2156C2BEF0A95420F26ED5C4A20B.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632414453/6F636EC9BF76051907A79320247A47DC.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632477623/EB373D8131655B7BECB88AB250E97248.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943923231/2D9364A9D040352782D9B9C1B2281D38.png',
];

export default function AsyncImgDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState<string[]>([]);
  const onImgClick = async () => {
    setLoading(true);
    setTimeout(() => {
      setImgs(imgUrls);
      setLoading(false);
    }, 3000);
    setOpen(true);
  };
  const onImgPreviewClose = () => setOpen(false);
  return (
    <>
      <Button onClick={onImgClick}>异步加载图片</Button>
      <ImgPreview
        src={imgs}
        mode="multiple"
        open={open}
        loading={loading}
        overflowResize={false}
        onClose={onImgPreviewClose}
      />
    </>
  );
}

export const meta = {
  title: '异步图片',
  desc: '如果图片是异步，可以外部通过 `loading` 来控制。',
};
