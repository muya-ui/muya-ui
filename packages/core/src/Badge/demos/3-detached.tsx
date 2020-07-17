import React from 'react';
import styled from 'styled-components';

import { Badge, Row } from '@muya-ui/core';

const Square = styled.span`
  display: inline-block;
  width: 64px;
  height: 28px;
  background: #ddd;
  border-radius: 4px;
`;

export default function DetachedDemo() {
  return (
    <div>
      <Row>
        <Badge value={10} detached>
          <Square />
        </Badge>
      </Row>
      <Row>
        <Badge value={10} />
      </Row>
    </div>
  );
}

export const meta = {
  title: '徽标分离式用法',
  desc: '徽标可以通过 `detached` 分离或者独立使用',
};
