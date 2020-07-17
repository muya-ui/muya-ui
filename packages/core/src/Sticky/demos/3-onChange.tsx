import React from 'react';
import { Button, Sticky } from '@muya-ui/core';

export default function Event() {
  return (
    <Sticky
      offsetTop={80}
      onStatusChange={(fixed: boolean) => console.log(`固定状态变为 ${fixed}`)}
    >
      <Button type="primary">固定距离顶部 80 px 的位置</Button>
    </Sticky>
  );
}

export const meta = {
  title: '监听事件',
  desc: '监听固定事件是否发生变化',
};
