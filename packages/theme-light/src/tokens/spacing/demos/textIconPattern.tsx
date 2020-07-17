import React from 'react';
import styled from 'styled-components';
import { useTheme, toast } from '@muya-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { range } from '../../colors/demos/styled';
import { IFontSizeSpec } from '@muya-ui/theme-light';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Col = styled.div<{ $opacity: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 200px;
  background: ${props => `rgba(56, 59, 66, ${props.$opacity})`};
  cursor: pointer;
`;

const Spec = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 22px;
  color: #949da8;
`;

export default function TextIconPatternDemo() {
  const { spacing, typography } = useTheme();
  const items = [];
  for (const i of range(1, 8)) {
    const key = `s${i}`;
    items.push(
      <CopyToClipboard
        key={key}
        text={`theme.spacing.pattern.icon.${key}`}
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <Col $opacity={i % 2 === 0 ? 0.04 : 0.08}>
          <Spec>{key}</Spec>
          <Spec>
            字号：{typography.spec.fontSize[key as IFontSizeSpec]}
            <br />
            间距：{spacing.pattern.textIcon[key as IFontSizeSpec]}
          </Spec>
        </Col>
      </CopyToClipboard>,
    );
  }
  return <Row>{items}</Row>;
}
