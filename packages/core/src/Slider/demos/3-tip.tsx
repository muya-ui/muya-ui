import React from 'react';
import styled from 'styled-components';

import { Slider, Typography } from '@muya-ui/core';

const Row = styled.div`
  margin-bottom: 30px;
`;

const Title = styled(Typography.Title)`
  margin-bottom: 10px;
`;

export default function TipDemo() {
  return (
    <div>
      <Title level={5}>有tip</Title>
      <Row>
        <Slider defaultValue={10} tooltipVisible tipFormatter={num => `${num}%`} />
      </Row>
      <Title level={5}>无tip</Title>
      <Row>
        <Slider defaultValue={10} />
      </Row>
    </div>
  );
}

export const meta = {
  title: '自定义提示',
  desc: '使用 tipFormatter 可以格式化 Tooltip 的内容',
};
