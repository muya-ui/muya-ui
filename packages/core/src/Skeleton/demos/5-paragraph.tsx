import React, { useState } from 'react';

import { Button, Skeleton } from '@muya-ui/core';

export default function Paragraph() {
  const [active, setActive] = useState(true);
  return (
    <>
      <Skeleton active={active} type="paragraph" style={{ width: '100%' }}>
        内容
      </Skeleton>
      <Button style={{ marginTop: '20px' }} onClick={() => setActive(active => !active)}>
        切换active状态
      </Button>
    </>
  );
}

export const meta = {
  title: 'paragraph 段落式骨架屏',
  desc: '通过`rows`属性可以控制骨架屏内容的数量',
};
