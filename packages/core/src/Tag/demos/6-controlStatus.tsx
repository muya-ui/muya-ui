import React, { useState } from 'react';

import { useEventCallback } from '@muya-ui/utils';
import { Button, Tag } from '@muya-ui/core';

export default function ControlStatusDemo() {
  const [visible, setVisible] = useState(true);
  const onToggle = useEventCallback(() => {
    setVisible(!visible);
  }, [visible]);
  return (
    <>
      <Button size="s" onClick={onToggle}>
        Toggle
      </Button>
      <br />
      <br />
      <Tag visible={visible}>我是标签</Tag>
    </>
  );
}

export const meta = {
  title: '控制关闭状态',
  desc: '通过 visible 属性控制关闭状态。',
};
