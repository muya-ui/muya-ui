import React from 'react';
import styled from 'styled-components';

import { UnwellIcon, WellIcon } from '@muya-ui/theme-light';
import { Slider, Typography } from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  max-width: 600px;
  align-items: center;

  & .slider {
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Col = styled.div`
  font-size: 0;
`;

export default function MarksDemo() {
  return (
    <Container>
      <Col>
        <Typography.Text fontSize="s4">
          <UnwellIcon />
        </Typography.Text>
      </Col>
      <Slider className="slider" defaultValue={30} />
      <Col>
        <Typography.Text fontSize="s4">
          <WellIcon />
        </Typography.Text>
      </Col>
    </Container>
  );
}

export const meta = {
  title: '带 icon 的滑块',
  desc: '滑块左右可以设置图标来表达业务含义',
};
