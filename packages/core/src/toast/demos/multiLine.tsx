import React from 'react';

import { Button, toast } from '@muya-ui/core';

export default function DurationDemo() {
  const onClick = () => {
    const msg = Array(100)
      .fill(0)
      .map((i, item) => `${item}. 多行的消息案例案例`)
      .join('');
    toast.success(msg);
  };

  return (
    <div>
      <Button type="primary" onClick={onClick}>
        success
      </Button>
    </div>
  );
}

export const meta = {
  title: '多行',
  desc: '多行',
  order: 2,
};
