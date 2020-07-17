import React from 'react';
import styled from 'styled-components';
import { Badge } from '@muya-ui/core';

const Square = styled.span`
  display: inline-block;
  width: 64px;
  height: 28px;
  background: #ddd;
  border-radius: 4px;
`;

export default function BasicDemo() {
  return (
    <Badge value={10000} max={1000} size="m">
      Square
    </Badge>
  );
}

export const meta = {
  title: '峰顶数字',
  desc: '超过 max 的会显示为 max+，默认为 99',
};
