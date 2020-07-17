import React from 'react';

import { Button } from '@muya-ui/core';

export default function BasicPlainDemo() {
  return (
    <div>
      <div className="doc-button-container">
        <Button type="strong">strong</Button>
        <Button plain={false} type="normal">
          normal
        </Button>
        <Button type="secondary">sec</Button>
        <Button type="weak">weak</Button>
      </div>

      <div className="doc-button-container">
        <Button type="strong" plain>
          strong
        </Button>
        <Button plain type="normal">
          normal
        </Button>
        <Button type="secondary" plain>
          sec
        </Button>
        <Button type="weak" plain>
          weak
        </Button>
      </div>
    </div>
  );
}

export const meta = {
  title: '普通按钮组',
  desc:
    '按钮常用的5种类型，另有 `strong` 、 `secondary` 、 `weak` 是 `normal` 在视觉表达上的程度不同的状态',
};
