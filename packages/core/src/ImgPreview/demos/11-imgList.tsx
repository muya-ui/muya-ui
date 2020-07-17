import React, { useState } from 'react';
import styled from 'styled-components';

import { Col, Img, ImgPreview, Row } from '@muya-ui/core';

const imgUrl =
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575522314109/A40D2156C2BEF0A95420F26ED5C4A20B.png';

const imgUrls = [
  imgUrl,
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632414453/6F636EC9BF76051907A79320247A47DC.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632477623/EB373D8131655B7BECB88AB250E97248.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943923231/2D9364A9D040352782D9B9C1B2281D38.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943906529/6310624039D1BAF4F77B7BA4EF566716.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943905780/57AE2846F8C96B6DA71A1A288610FEC4.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943904885/7EBA50482362DE288A7ED3A645F03CC6.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943889804/495DC44602B36994819228996204484F.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943866176/9CED372B33480F8C36277499D9FC8F14.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943855884/9F0C3FBB7788D3BE146040186F028477.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943849260/A1DB107D477A197A5D7170465AAF2BB3.png',
];

const BasicImg = styled(Img)`
  width: 120px;
  height: 120px;
  margin-right: 10px;
  cursor: pointer;
`;

export default function ImgListDemo() {
  const [currentImgSrc, setCurrentImgSrc] = useState('');
  const [open, setOpen] = useState(false);
  const onExited = () => {
    setCurrentImgSrc('');
  };
  const onImgPreviewClose = () => {
    setOpen(false);
  };
  const showPreview = (src: string) => {
    setCurrentImgSrc(src);
    setOpen(true);
  };
  return (
    <>
      <Row>
        {imgUrls.map(src => (
          <Col style={{ marginBottom: 10 }} key={src}>
            <BasicImg src={src} onClick={() => showPreview(src)} />
          </Col>
        ))}
      </Row>
      <ImgPreview src={currentImgSrc} open={open} onClose={onImgPreviewClose} onExited={onExited} />
    </>
  );
}

export const meta = {
  title: '图片列表预览',
  desc: '图片列表，每个列表图片单独预览。',
};
