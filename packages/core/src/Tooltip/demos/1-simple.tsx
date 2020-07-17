import React from 'react';

import { Button, Input, Tooltip } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <Tooltip
        title="记录第一次遇见的你 Jay Chou"
        triggerActions={['hover']}
        placement="bottom-end"
      >
        <Button style={{ marginRight: '20px' }} type="primary">
          Hover Me
        </Button>
      </Tooltip>
      <Tooltip
        title="记录第一次遇见的你 Jay Chou"
        triggerActions={['focus']}
        placement="bottom-end"
      >
        <Input placeholder="focus me"></Input>
      </Tooltip>
    </>
  );
}

export const meta = {
  title: '简单使用',
  desc:
    '`Tooltip`必须要有内容，因此title属性必传。\n\n交互上，建议将`Tooltip`的`triggerActions` 设置成 `hover` 或者 `focus`',
};
