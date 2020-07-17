import React from 'react';
import { Tooltip, Button, Input, Popconfirm } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <Tooltip
        title="记录第一次遇见的你 Jay Chou"
        triggerActions={['hover']}
        placement="top"
        popperNodeRef={r => console.log('popperNodeRef', r)}
        ref={r => console.log('ref', r)}
      >
        <Popconfirm
          title="对不起"
          content="记录第一次遇见的你 Jay Chou"
          cancelText="取消"
          confirmText="确定"
          triggerActions={['click']}
          placement="bottom-end"
          popperNodeRef={r => console.log('popperNodeRef', r)}
          ref={r => console.log('ref', r)}
        >
          <Button style={{ marginRight: '20px' }} type="primary">
            Hover Me
          </Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
}

export const meta = {
  title: 'Trigger可组合使用',
  desc: '`Tooltip`、`Popconfirm`均基于Trigger实现，因此可以组合使用',
};
