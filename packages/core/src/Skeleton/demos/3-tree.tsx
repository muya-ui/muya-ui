import React, { useState } from 'react';

import { Button, Skeleton } from '@muya-ui/core';

export default function Tree() {
  const [active, setActive] = useState(true);
  return (
    <>
      <Skeleton active={active} type="tree" rows={3} style={{ width: '200px' }}>
        内容
      </Skeleton>
      <Skeleton active={active} type="tree" rows={3} style={{ width: '200px' }}>
        内容
      </Skeleton>
      <Button style={{ marginTop: '20px' }} onClick={() => setActive(active => !active)}>
        切换active状态
      </Button>
    </>
  );
}

export const meta = {
  title: 'tree 树形骨架屏',
  desc: '通过`rows`属性可以控制骨架屏内容的数量',
};
