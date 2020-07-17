import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Row, Col, toast, useTheme, Typography } from '@muya-ui/core';
import { IComponentSizeSpec } from '@muya-ui/theme-light';

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(56, 59, 66, 0.08);
  background-clip: content-box;
`;

const sizeKeys: IComponentSizeSpec[] = ['s', 'm', 'l', 'xl'];

export default function WhSpec() {
  const { size } = useTheme();
  const items = [];
  for (const key of sizeKeys) {
    items.push(
      <CopyToClipboard
        key={key}
        text={`theme.size.spec.width.${key}`}
        onCopy={() =>
          toast.success('宽度 tokenKey 已复制，对应的高度 token 将 width 改为 height 即可')
        }
      >
        <StyledCol style={{ width: size.spec.width[key], height: size.spec.height[key] }}>
          <Typography.Text fontSize="s2">
            {key}: {size.spec.width[key]} x {size.spec.height[key]}
          </Typography.Text>
        </StyledCol>
      </CopyToClipboard>,
    );
  }
  return <Row gutter={20}>{items}</Row>;
}
