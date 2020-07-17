import React, { useState } from 'react';

import { Button, Skeleton } from '@muya-ui/core';

export default function Navigation() {
  const [active, setActive] = useState(true);
  return (
    <>
      <Skeleton active={active} type="navigation" style={{ width: '200px' }}>
        内容
      </Skeleton>
      <Button style={{ marginTop: '20px' }} onClick={() => setActive(active => !active)}>
        切换active状态
      </Button>
    </>
  );
}

export const meta = {
  title: 'navigation 导航式骨架屏',
  desc: '通过`rows`属性可以控制骨架屏内容的数量',
};
