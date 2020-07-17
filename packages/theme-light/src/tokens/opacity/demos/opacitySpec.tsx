import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTheme, toast } from '@muya-ui/core';
import { range } from '../../colors/demos/styled';
import { IOpacitySpec } from '@muya-ui/theme-light';

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
  height: 200px;
  background: ${props => `rgba(56, 59, 66, ${props.$opacity})`};
  color: ${props => (props.$dark ? '#949DA8' : '#fff')};
  cursor: pointer;
`;

const Spec = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 16px;
`;

export default function OpacitySpecDemo() {
  const { opacity } = useTheme();
  const items = [];
  for (const i of range(1, 9)) {
    const key = `s${i}`;
    items.push(
      <CopyToClipboard
        key={key}
        text={`theme.opacity.spec.${key}`}
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={opacity.spec[key as IOpacitySpec]} $dark={i >= 5}>
          <Spec>{key}</Spec>
          <Spec>{opacity.spec[key as IOpacitySpec] * 100}%</Spec>
        </Col>
      </CopyToClipboard>,
    );
  }
  return <Row>{items}</Row>;
}
