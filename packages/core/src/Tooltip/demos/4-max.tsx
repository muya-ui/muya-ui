import React from 'react';
import { Tooltip, Button } from '@muya-ui/core';

export default function Max() {
  return (
    <>
      <Tooltip
        title="长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长篇大论"
        triggerActions={['hover']}
      >
        <Button type="primary">Hover Me</Button>
      </Tooltip>
    </>
  );
}

export const meta = {
  title: '内容溢出适配',
  desc: '默认最大宽度为260px，高度没有做限制，建议高度120px',
};
