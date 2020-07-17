import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Col, Dialog, Img, ImgContainer, Row, Typography } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

const ItemImg = styled(Img)`
  width: 100px;
  height: 100px;
  margin: 0 10px 10px 0;
`;
const StyledImgContainer = styled(ImgContainer)`
  height: 300px;
  overflow-y: auto;
`;
const Desc = styled(Typography.Paragraph)`
  margin-bottom: 10px;
`;

export default function ElementDemo() {
  const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Row>
      <Col span={12}>
        <Desc>
          如果不是fixed的容器，会同时检测 window 的滚动和容器的滚动，同时检测的是整个窗口区域
        </Desc>
        <StyledImgContainer>
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
          <ItemImg src={exampleImgSrc} />
        </StyledImgContainer>
      </Col>
      <Col span={12}>
        <Dialog.Base open={show} size="m">
          <Dialog.Content>
            <StyledImgContainer>
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
              <ItemImg src={exampleImgSrc} />
            </StyledImgContainer>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="primary" onClick={handleClose}>
              主按钮
            </Button>
          </Dialog.Actions>
        </Dialog.Base>

        <Desc>你也可以设置你的容器是 fixed 的，那么检测区域会根据容器计算</Desc>
        <Button onClick={handleOpen} type="primary">
          打开弹窗
        </Button>
      </Col>
    </Row>
  );
}

export const meta = {
  title: '图片容器',
  desc:
    '在固定布局、弹窗中，你可能也会放入大量的图片，这个时候提供图片容器来解决某个节点内的懒加载检测',
};
