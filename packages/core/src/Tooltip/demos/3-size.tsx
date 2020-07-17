import React from 'react';
import { Tooltip, Button } from '@muya-ui/core';

export default function Size() {
  return (
    <>
      <Tooltip title="记录第一次遇见的你 Jay Chou" triggerActions={['hover']}>
        <Button style={{ marginRight: '20px' }}>Small One</Button>
      </Tooltip>
      <Tooltip title="记录第二次遇见的你 Jay Chou" size="m" triggerActions={['hover']}>
        <Button type="primary">Large One</Button>
      </Tooltip>
    </>
  );
}

export const meta = {
  title: '支持标准size',
  desc: '目前视觉上m、x、xl的样式相同，因此Demo只展示两种尺寸',
};
