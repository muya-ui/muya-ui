import React, { useState } from 'react';

import { Button, Popconfirm } from '@muya-ui/core';

export default function Content() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Popconfirm
        title="对不起"
        content="通过这里可以完整查看整个表单数据哦！"
        confirmText="我知道了"
        open={open}
        onConfirm={() => setOpen(false)}
        placement="right"
      >
        <Button onClick={() => setOpen(true)} type="primary" style={{ marginRight: '20px' }}>
          只有确认按钮才能关闭卡片
        </Button>
      </Popconfirm>
    </>
  );
}

export const meta = {
  title: '定制卡片展示/隐藏时机',
  desc:
    '1. 设置`outsideCloseable`和`escapeKeyCloseable`为`false`，禁用点击空白区域和Esc键关闭的行为\n\n2. 使用受控组件，自定义卡片展示/隐藏的状态',
};
