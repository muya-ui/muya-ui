import React, { useState } from 'react';
import styled from 'styled-components';

import { IImgPreviewPaginationProps, Img, ImgPreview } from '@muya-ui/core';

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
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944864088/4FF7032310A540B356602CF6E75ED24D.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944874937/22313FC2DE2E6C38A909C6E364078B43.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944885781/5BF74E7CEEF53BBE422D4AC195F9594C.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944894431/7401F28E4A5465E902C0E748CFE62AF1.png',
];

const BasicImg = styled(Img)`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  cursor: pointer;
`;

const CustomNode = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  font-size: 16px;
  color: #fff;
  line-height: 16px;
`;

export default function CustomPaginationDemo() {
  const [open, setOpen] = useState(false);
  const onImgClick = () => setOpen(true);
  const onImgPreviewClose = () => setOpen(false);
  const renderCustomPagination = (props: IImgPreviewPaginationProps) => {
    return <CustomNode>十元{props.imgIndex}.jpg</CustomNode>;
  };
  return (
    <>
      <BasicImg src={imgUrl} onClick={onImgClick} />
      <ImgPreview
        src={imgUrls}
        mode="multiple"
        open={open}
        onClose={onImgPreviewClose}
        overflowResize
        renderCustomPagination={renderCustomPagination}
      />
    </>
  );
}

export const meta = {
  title: '自定义底部分页器',
  desc: '如果需要修改整个底部分页器，可以传入覆盖的节点渲染函数。',
};
