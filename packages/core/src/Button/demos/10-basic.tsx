import React from 'react';

import { Button } from '@muya-ui/core';

export default function BasicDemo() {
  return (
    <div>
      <div className="doc-button-container">
        <Button type="primary">primary</Button>
        <Button plain={false}>normal</Button>
        <Button type="danger">danger</Button>
        <Button type="success">success</Button>
        <Button type="warning">warning</Button>
      </div>
      <div className="doc-button-container">
        <Button plain type="primary">
          primary
        </Button>
        <Button>normal</Button>
        <Button plain type="danger">
          danger
        </Button>
        <Button plain type="success">
          success
        </Button>
        <Button plain type="warning">
          warning
        </Button>
      </div>
    </div>
  );
}

export const meta = {
  title: '按钮基础用法',
  desc:
    '按钮常用的5种类型，另有 `strong` 、 `secondary` 、 `weak` 是 `normal` 在视觉表达上的程度不同的状态',
};
