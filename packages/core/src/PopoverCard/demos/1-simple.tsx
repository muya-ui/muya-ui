import React from 'react';

import { Button, Input, PopoverCard } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <PopoverCard
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        triggerActions={['hover']}
        placement="bottom"
      >
        <Button type="primary">Hover Me</Button>
      </PopoverCard>
      <PopoverCard
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        triggerActions={['click']}
        placement="bottom"
      >
        <Button style={{ marginRight: '8px' }} type="primary">
          Click Me
        </Button>
      </PopoverCard>
      <br />
      <PopoverCard
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        triggerActions={['focus']}
        placement="bottom"
      >
        <Input placeholder="focus me" style={{ marginTop: '16px' }}></Input>
      </PopoverCard>
    </>
  );
}

export const meta = {
  title: '简单使用',
  desc:
    '1. `title`、`content`、`actions`分别对应标题、内容和行动区，均可传入 `ReactNode` 类型，可定制程度高\n\n2. 三种触发方式，同 `Trigger` ',
};
