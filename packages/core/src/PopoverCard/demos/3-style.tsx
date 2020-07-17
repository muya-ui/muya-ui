import React from 'react';
import { PopoverCard, Button } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <PopoverCard
        content={
          <p style={{ color: 'red' }}>
            自定义内容
            <br />
            <img
              style={{ width: '160px', height: '80px' }}
              src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
            />
          </p>
        }
        style={{ maxWidth: '200px' }}
        triggerActions={['hover']}
        placement="bottom"
      >
        <Button style={{ marginRight: '20px' }} type="primary">
          Hover Me
        </Button>
      </PopoverCard>
    </>
  );
}

export const meta = {
  title: '自定义内容 & 卡片样式',
  desc: '1. 传入`style` 或 `className`来自定义卡片样式\n\n2. 传入自定义节点定制内容',
};
