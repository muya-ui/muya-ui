import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast, useTheme } from '@muya-ui/core';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  width: 400px;
  height: 160px;
  background: #fafbfc;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 12px;
  }
`;

const Spec = styled.p`
  position: relative;
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  color: #383c42;
  &:last-child::before {
    position: absolute;
    top: -8px;
    content: ' ';
    height: 2px;
    width: 20px;
    background: #656c75;
  }
`;

export default function fontWeightSpecDemo() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { typography } = useTheme();
  return (
    <Row>
      <CopyToClipboard
        text="theme.typography.spec.fontWeight.regular"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col>
          <Spec style={{ fontWeight: typography.spec.fontWeight.regular }}>正常 Regular</Spec>
          <Spec style={{ color: '#656C75' }}>Weight: 400</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        text="theme.typography.spec.fontWeight.medium"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col>
          <Spec style={{ fontWeight: typography.spec.fontWeight.medium }}>中等 Medium</Spec>
          <Spec style={{ color: '#656C75' }}>Weight: 500</Spec>
        </Col>
      </CopyToClipboard>
      <CopyToClipboard
        text="theme.typography.spec.fontWeight.semibold"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col>
          <Spec style={{ fontWeight: typography.spec.fontWeight.semibold }}>加粗 Semibold</Spec>
          <Spec style={{ color: '#656C75' }}>Weight: 600</Spec>
        </Col>
      </CopyToClipboard>
    </Row>
  );
}
