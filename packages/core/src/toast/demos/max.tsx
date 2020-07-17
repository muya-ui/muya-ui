import React from 'react';

import { Button, ButtonGroup, IToastType, toast } from '@muya-ui/core';

export default function BasicDemo() {
  const onClick = (type: IToastType) => {
    const msg =
      'Hello, worldHello, worldHello, worldHello, worldHello, worldHello, worldHello, worldHello, worldHello, worldHello, worldHello, world';

    const len = Math.round(Math.random() * (msg.length - 10));
    return () => {
      toast[type](`${Date.now()}:${msg.slice(0, len)}`);
    };
  };

  const setMax = (num: number) => {
    return () => {
      toast.config({
        setting: {
          max: num,
        },
      });
    };
  };
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <ButtonGroup>
          <Button onClick={setMax(3)}>恢复默认</Button>
          <Button onClick={setMax(5)}>最多5条</Button>
          <Button onClick={setMax(10)}>最多10条</Button>
          <Button onClick={setMax(20)}>最多20条</Button>
        </ButtonGroup>
      </div>
      <div>
        <Button type="primary" onClick={onClick('success')}>
          success
        </Button>
      </div>
    </div>
  );
}

export const meta = {
  title: '设置最大条数',
  desc: '设置最大条数',
  order: 3,
};
