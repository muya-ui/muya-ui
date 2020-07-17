import React from 'react';
import styled from 'styled-components';
import { IBorderRadiusSpec } from '@muya-ui/theme-light';
import { range } from '../../colors/demos/styled';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Row, Col, toast, useTheme, Typography } from '@muya-ui/core';

const StyledCol = styled(Col)<{ $opacity: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  flex: 1;
  cursor: pointer;
  background: ${props => `rgba(56, 59, 66, ${props.$opacity})`};
  background-clip: content-box;
`;

export default function RadiusSpec() {
  const { size } = useTheme();
  const items = [];
  for (const index of range(1, 5)) {
    const key = `s${index}` as IBorderRadiusSpec;
    items.push(
      <CopyToClipboard
        key={key}
        text={`theme.size.spec.borderRadius.${key}`}
        onCopy={() => toast.success('tokenKey 已复制')}
      >
        <StyledCol
          style={{ borderRadius: size.spec.borderRadius[key] }}
          $opacity={index % 2 === 0 ? 0.04 : 0.08}
        >
          <Typography.Text fontSize="s3">
            {key}: {size.spec.borderRadius[key]}
          </Typography.Text>
        </StyledCol>
      </CopyToClipboard>,
    );
  }
  return <Row gutter={20}>{items}</Row>;
}
