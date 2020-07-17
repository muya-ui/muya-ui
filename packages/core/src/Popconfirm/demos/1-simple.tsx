import React from 'react';

import { Button, Popconfirm, toast } from '@muya-ui/core';

export default function Simple() {
  const handleConfirm = () => {
    toast.info('click confirm');
  };

  const handleCancel = () => {
    toast.error('click cancel');
  };
  return (
    <>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        cancelText="取消"
        confirmText="确定"
        triggerActions={['hover']}
        placement="bottom-end"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <Button type="primary">Hover Me</Button>
      </Popconfirm>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        cancelText="取消"
        confirmText="确定"
        triggerActions={['click']}
        placement="bottom-end"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <Button type="primary">Click Me</Button>
      </Popconfirm>
    </>
  );
}

export const meta = {
  title: '基本',
  desc: '最简单的用法，监听`onConfirm`和`onCancel`事件，点击确认/取消按钮时会触发',
};
