import React from 'react';

import { LocationIcon } from '@muya-ui/theme-light';
import { Button, Popconfirm } from '@muya-ui/core';

export default function Content() {
  return (
    <>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        confirmText="好吧"
        cancelText="不行"
        type="error"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="danger">error</Button>
      </Popconfirm>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        confirmText="好吧"
        cancelText="不行"
        type="info"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="primary">info</Button>
      </Popconfirm>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        confirmText="好吧"
        cancelText="不行"
        type="warning"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="warning">wraning</Button>
      </Popconfirm>
      <Popconfirm
        title="对不起"
        content="记录第一次遇见的你 Jay Chou"
        confirmText="好吧"
        cancelText="不行"
        type="info"
        triggerActions={['click']}
        placement="bottom-end"
        icon={<LocationIcon />}
      >
        <Button>自定义icon</Button>
      </Popconfirm>
    </>
  );
}

export const meta = {
  title: '提示类型',
  desc:
    '1. 气泡确认框自带三种提示类型：`error`、`info`、`warning`\n\n2. 传入`icon`可自定义提示图标',
};
