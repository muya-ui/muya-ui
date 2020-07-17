import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTheme, toast } from '@muya-ui/core';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Col = styled.div<{ $opacity: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  height: 120px;
  background: ${props => `rgba(56, 59, 66, ${props.$opacity})`};
  cursor: pointer;
`;

const Spec = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  padding: 0 16px;
`;

export default function ZIndexSpecDemo() {
  const { zIndex } = useTheme();
  return (
    <Row>
      <CopyToClipboard
        key="pattern.fixed"
        text="theme.zIndex.pattern.fixed"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={0.08}>
          <Spec>{zIndex.pattern.fixed}</Spec>
          <Spec>导航、悬浮框等</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        key="pattern.dialog"
        text="theme.zIndex.pattern.dialog"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={0.04}>
          <Spec>{zIndex.pattern.dialog}</Spec>
          <Spec>dialog 对话框、Mask 遮罩等</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        key="pattern.toast"
        text="theme.zIndex.pattern.toast"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={0.08}>
          <Spec>{zIndex.pattern.toast}</Spec>
          <Spec>Toast、Notification 等全局临时层</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        key="pattern.popper"
        text="theme.zIndex.pattern.popper"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={0.04}>
          <Spec>{zIndex.pattern.popper}</Spec>
          <Spec>dropdown、select、cascader 等局部临时弹出层</Spec>
        </Col>
      </CopyToClipboard>
    </Row>
  );
}
