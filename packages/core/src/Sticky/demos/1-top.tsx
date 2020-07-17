import React from 'react';
import { Button, Sticky } from '@muya-ui/core';

export default function Top() {
  return (
    <Sticky offsetTop={180}>
      <Button type="primary">固定距离顶部 180 px 的位置</Button>
    </Sticky>
  );
}

export const meta = {
  title: '基本',
  desc: '最简单的用法',
};
