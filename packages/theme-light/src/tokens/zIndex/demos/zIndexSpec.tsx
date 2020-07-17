import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTheme, toast } from '@muya-ui/core';
import { range } from '../../colors/demos/styled';
import { IZIndexSpec } from '@muya-ui/theme-light';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Col = styled.div<{ $opacity: number; $dark?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 120px;
  background: ${props => `rgba(56, 59, 66, ${props.$opacity})`};
  color: '#949DA8';
  cursor: pointer;
`;

const Spec = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 16px;
`;

export default function ZIndexSpecDemo() {
  const { zIndex } = useTheme();
  const items = [];
  for (const i of range(1, 5)) {
    const key = `s${i}`;
    items.push(
      <CopyToClipboard
        key={key}
        text={`theme.zIndex.spec.${key}`}
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={i % 2 === 0 ? 0.04 : 0.08}>
          <Spec>{zIndex.spec[key as IZIndexSpec]}</Spec>
        </Col>
      </CopyToClipboard>,
    );
  }
  return <Row>{items}</Row>;
}
