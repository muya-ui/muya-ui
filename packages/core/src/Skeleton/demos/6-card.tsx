import React, { useState } from 'react';

import { Button, Skeleton } from '@muya-ui/core';

export default function Card() {
  const [active, setActive] = useState(true);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton active={active} type="card" style={{ width: '30%', height: '180px' }}>
          内容
        </Skeleton>
        <Skeleton active={active} type="card" style={{ width: '30%', height: '180px' }}>
          内容
        </Skeleton>
        <Skeleton active={active} type="card" style={{ width: '30%', height: '180px' }}>
          内容
        </Skeleton>
      </div>
      <Button style={{ marginTop: '20px' }} onClick={() => setActive(active => !active)}>
        切换active状态
      </Button>
    </>
  );
}

export const meta = {
  title: 'card 卡片式骨架屏',
  desc: '控制骨架屏的`active`属性，可以决定是否展示加载动画',
};
