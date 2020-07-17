import React, { useState } from 'react';

import { Button, Skeleton } from '@muya-ui/core';

export default function Block() {
  const [active, setActive] = useState(true);
  return (
    <>
      <Skeleton active={active} style={{ width: '100%', height: '200px' }}>
        内容
      </Skeleton>
      <Button style={{ marginTop: '20px' }} onClick={() => setActive(active => !active)}>
        切换active状态
      </Button>
    </>
  );
}

export const meta = {
  title: 'block 块级骨架屏',
  desc: '控制骨架屏的`active`属性，可以决定是否展示加载动画',
};
