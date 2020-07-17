import React, { useState } from 'react';

import { Button, Input, PopoverCard } from '@muya-ui/core';

export default function Actions() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <>
      <PopoverCard
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        actions={[
          <Button key="1" size="s" onClick={() => setOpen1(false)}>
            取消
          </Button>,
          <Button key="2" type="primary" size="s" onClick={() => setOpen1(false)}>
            确认
          </Button>,
        ]}
        triggerActions={['click']}
        placement="bottom"
        open={open1}
        onVisibleChange={o => setOpen1(o)}
      >
        <Button style={{ marginRight: '8px' }} type="primary">
          Click Me
        </Button>
      </PopoverCard>
      <PopoverCard
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        actions={
          <Button type="primary" size="s" onClick={() => setOpen2(false)}>
            确认
          </Button>
        }
        triggerActions={['focus']}
        placement="bottom"
        open={open2}
        onVisibleChange={o => setOpen2(o)}
      >
        <span style={{ display: 'inline-flex' }}>
          <Input placeholder="focus me"></Input>
        </span>
      </PopoverCard>
    </>
  );
}

export const meta = {
  title: '气泡内部关闭',
  desc:
    '1. 通过设置`content` or `actions`传入行动节点\n\n2. 用受控组件的方式，使用`open`属性控制卡片的展示/隐藏\n\n3. 点击行动节点时，隐藏卡片',
};
