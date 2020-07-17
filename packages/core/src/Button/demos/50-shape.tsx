import React from 'react';

import { RightIcon, TimeIcon } from '@muya-ui/theme-light';
import { Button } from '@muya-ui/core';

export default function ShapeDemo() {
  return (
    <>
      <Button shape="normal">normal</Button>
      <Button shape="circle">
        <RightIcon />
      </Button>
      <Button shape="round">round</Button>
      <Button shape="square">
        <TimeIcon />
      </Button>
    </>
  );
}

export const meta = {
  title: '按钮形状',
  desc: '按钮尺寸，可以是 normal 、circle 、round、 square 。',
};
