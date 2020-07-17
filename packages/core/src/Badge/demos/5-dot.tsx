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

export default function DetachedDemo() {
  return (
    <Badge dot size="s">
      <Square />
    </Badge>
  );
}

export const meta = {
  title: '小红点',
  desc: '没有具体数字',
};
