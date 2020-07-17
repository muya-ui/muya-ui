import React from 'react';
import styled from 'styled-components';

import { Badge, Col, Row } from '@muya-ui/core';

const Square = styled.span`
  display: inline-block;
  width: 64px;
  height: 28px;
  background: #ddd;
  border-radius: 4px;
`;

export default function BasicDemo() {
  return (
    <Row gutter={30}>
      <Col>
        <Badge value={10}>
          <Square />
        </Badge>
      </Col>
      <Col>
        <Badge value={0} showZero>
          <Square />
        </Badge>
      </Col>
      <Col>
        <Badge value={10} color="#409eff">
          <Square />
        </Badge>
      </Col>
      <Col>
        <Badge value="New">
          <Square />
        </Badge>
      </Col>
      <Col>
        <Badge value="Hot" isStroke>
          <Square />
        </Badge>
      </Col>
    </Row>
  );
}

export const meta = {
  title: '徽标基础用法',
  desc: '简单的徽章展示，当 `value` 为 0 时，默认不显示，但是可以使用 `showZero` 修改为显示',
};
