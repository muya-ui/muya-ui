import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast, Typography, useTheme } from '@muya-ui/core';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  margin: 32px 0;
  padding: 32px;
  cursor: pointer;
`;

const Col = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function ShadowSpecDemo() {
  const { shadows } = useTheme();
  return (
    <>
      <CopyToClipboard
        key="s1.normal"
        text="theme.shadows.spec.s1.normal"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Row style={{ boxShadow: shadows.spec.s1.normal }}>
          <Col>
            <Typography.Text fontSize="s3" color="title" strong>
              一级投影
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text fontSize="s3">Blurs24，#666 8%</Typography.Text>
            <Typography.Text fontSize="s3">通常用于大卡、大组件</Typography.Text>
          </Col>
        </Row>
      </CopyToClipboard>
      <CopyToClipboard
        key="s1.hover"
        text="theme.shadows.spec.s1.hover"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Row style={{ boxShadow: shadows.spec.s1.hover }}>
          <Typography.Text fontSize="s3" color="title" strong>
            一级投影 Hover
          </Typography.Text>
          <Col>
            <Typography.Text fontSize="s3">Blurs24，#666 16%</Typography.Text>
            <Typography.Text fontSize="s3">通常用于大卡、大组件</Typography.Text>
          </Col>
        </Row>
      </CopyToClipboard>
      <CopyToClipboard
        key="s2.normal"
        text="theme.shadows.spec.s2.normal"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Row style={{ boxShadow: shadows.spec.s2.normal }}>
          <Typography.Text fontSize="s3" color="title" strong>
            二级投影
          </Typography.Text>
          <Col>
            <Typography.Text fontSize="s3">Blurs24，#666 12%</Typography.Text>
            <Typography.Text fontSize="s3">通常用于小卡、小组件</Typography.Text>
          </Col>
        </Row>
      </CopyToClipboard>
      <CopyToClipboard
        key="s2.hover"
        text="theme.shadows.spec.s2.hover"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Row style={{ boxShadow: shadows.spec.s2.hover }}>
          <Typography.Text fontSize="s3" color="title" strong>
            二级投影 Hover
          </Typography.Text>
          <Col>
            <Typography.Text fontSize="s3">Blurs24，#666 20%</Typography.Text>
            <Typography.Text fontSize="s3">通常用于小卡、小组件</Typography.Text>
          </Col>
        </Row>
      </CopyToClipboard>
    </>
  );
}
