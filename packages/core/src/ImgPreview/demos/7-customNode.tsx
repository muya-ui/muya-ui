import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Img, ImgPreview, Tag } from '@muya-ui/core';

const imgUrl =
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575522314109/A40D2156C2BEF0A95420F26ED5C4A20B.png';

const imgUrls = [
  imgUrl,
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632414453/6F636EC9BF76051907A79320247A47DC.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632477623/EB373D8131655B7BECB88AB250E97248.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943923231/2D9364A9D040352782D9B9C1B2281D38.png',
];

const BasicImg = styled(Img)`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  cursor: pointer;
`;

const RenderInImgNode = styled.div`
  position: absolute;
  left: 20px;
  top: 0;
`;

const RenderInImgContainer = styled.div`
  position: absolute;
  right: -100px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-bottom: 12px;
  & + & {
    margin-left: 0;
  }
`;

export default function CustomNodeDemo() {
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
        renderInImgNode={() => (
          <RenderInImgNode>
            <Tag shape="rect" color="#FFAB00">
              图片角标
            </Tag>
          </RenderInImgNode>
        )}
        renderInImgContainer={() => (
          <RenderInImgContainer>
            <StyledButton type="strong">添加图片</StyledButton>
            <StyledButton type="strong">编辑图片</StyledButton>
            <StyledButton type="strong">删除图片</StyledButton>
          </RenderInImgContainer>
        )}
      />
    </>
  );
}

export const meta = {
  title: '自定义节点',
  desc:
    '支持在图片和图片容器上自定义节点，图片节点会放大会缩小，内部的自定义节点也会因此变换位置；容器节点不会放大缩小，内部的自定义节点位置固定。',
};
