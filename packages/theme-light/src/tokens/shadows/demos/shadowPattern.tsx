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

export default function ShadowPatternDemo() {
  const { shadows } = useTheme();
  return (
    <>
      <CopyToClipboard
        key="popper.normal"
        text="theme.shadows.pattern.popper.normal"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Row style={{ boxShadow: shadows.pattern.popper.normal }}>
          <Col>
            <Typography.Text fontSize="s3" color="title" strong>
              弹出层阴影
            </Typography.Text>
          </Col>
        </Row>
      </CopyToClipboard>
      <CopyToClipboard
        key="popper.hover"
        text="theme.shadows.pattern.popper.hover"
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Row style={{ boxShadow: shadows.pattern.popper.hover }}>
          <Typography.Text fontSize="s3" color="title" strong>
            弹出层阴影 Hover
          </Typography.Text>
        </Row>
      </CopyToClipboard>
    </>
  );
}
