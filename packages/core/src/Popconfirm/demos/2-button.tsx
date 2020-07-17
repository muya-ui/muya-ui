import React from 'react';

import { Button, Popconfirm } from '@muya-ui/core';

export default function ButtonConfig() {
  return (
    <>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        confirmText="好吧"
        confirmButtonType="danger"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="primary">Click Me</Button>
      </Popconfirm>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你记录第一次遇见的你记录第一次遇见的你"
        confirmText="我知道了"
        useInlineButton
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="primary">Click Me</Button>
      </Popconfirm>
    </>
  );
}

export const meta = {
  title: '配置按钮',
  desc:
    '1. 不传入`cancelText`，取消按钮则不展示，`confirmText`同理\n\n2. 设置`useInlineButton`为`true` 可以使用线性按钮\n\n3. 设置`confirmButtonType`可以修改**确认按钮**的类型，默认为 `primary`，按钮类型同`Button`组件',
};
