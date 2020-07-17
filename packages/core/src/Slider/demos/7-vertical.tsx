import React from 'react';
import styled from 'styled-components';

import { RangeSlider, Slider } from '@muya-ui/core';

const Container = styled.div`
  display: flex;
`;

export default function BasicDemo() {
  return (
    <Container>
      <Slider defaultValue={20} tooltipVisible vertical style={{ height: 200, width: 100 }} />
      <RangeSlider
        tooltipVisible
        marks={{
          10: 10,
          30: 30,
        }}
        vertical
        style={{ height: 200, width: 100 }}
        defaultValue={[10, 30]}
      />
    </Container>
  );
}

export const meta = {
  title: '垂直方向',
  desc: '垂直方向的 Slider',
};
