import React from 'react';

import { AddIcon } from '@muya-ui/theme-light';
import { Button, ButtonGroup } from '@muya-ui/core';

export default function IconDemo() {
  return (
    <div className="doc-button-container">
      <Button type="primary" prefixNode={<AddIcon />}>
        primary
      </Button>
      <Button type="secondary" suffixNode={<AddIcon />} style={{ marginRight: 10 }}>
        secondary
      </Button>
      <ButtonGroup type="primary">
        <Button>按钮文案</Button>
        <Button shape="square">
          <AddIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export const meta = {
  title: '带图标的按钮',
  desc:
    '需要注意的是，默认情况下当你设置了 `loading={true}` 时，组件会自动使用 `<Spin />` 来代替你的 suffixNode',
};
