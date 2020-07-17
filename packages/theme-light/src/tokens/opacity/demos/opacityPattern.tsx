import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTheme, toast } from '@muya-ui/core';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Col = styled.div<{ $opacity: number; $dark?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 120px;
  background: ${props => `rgba(56, 59, 66, ${props.$opacity})`};
  color: ${props => (props.$dark ? '#949DA8' : '#fff')};
  cursor: pointer;
`;

const Spec = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 16px;
`;

export default function OpacityPatternDemo() {
  const { opacity } = useTheme();
  return (
    <Row>
      <CopyToClipboard
        key="mask"
        text="theme.opacity.pattern.mask"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={opacity.pattern.mask}>
          <Spec>蒙层：{opacity.pattern.mask * 100}%</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        key="mask"
        text="theme.opacity.pattern.maskButton"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={opacity.pattern.maskButton}>
          <Spec>蒙层按钮：{opacity.pattern.maskButton * 100}%</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        key="mask"
        text="theme.opacity.pattern.mask"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={opacity.pattern.disabled}>
          <Spec>禁用：{opacity.pattern.disabled * 100}%</Spec>
        </Col>
      </CopyToClipboard>
    </Row>
  );
}
