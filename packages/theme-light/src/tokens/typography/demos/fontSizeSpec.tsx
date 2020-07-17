import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast, useTheme } from '@muya-ui/core';
import { range } from '../../colors/demos/styled';
import { IFontSizeSpec } from '@muya-ui/theme-light';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Col = styled.div<{ opacity: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 200px;
  cursor: pointer;
  background: ${props => `rgba(56, 59, 66, ${props.opacity})`};
`;

const Spec = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 22px;
  color: #949da8;
`;

export default function FontSizeSpecDemo() {
  const { typography } = useTheme();
  const items = [];
  for (const index of range(1, 8)) {
    const key = `s${index}` as IFontSizeSpec;
    items.push(
      <CopyToClipboard
        key={key}
        text={`theme.typography.spec.fontSize.${key}`}
        onCopy={() =>
          toast.success('字号 tokenKey 已复制，对应的行高 token 将 fontSize 改为 lineHeight 即可')
        }
      >
        <Col opacity={index % 2 === 0 ? 0.04 : 0.08}>
          <Spec>{key}</Spec>
          <Spec>
            字号：{typography.spec.fontSize[key]}
            <br />
            行高：{typography.spec.lineHeight[key]}
          </Spec>
        </Col>
      </CopyToClipboard>,
    );
  }
  return <Row>{items}</Row>;
}
