import React, { useState } from 'react';
import { Spin, Button } from '@muya-ui/core';

export default function Desc() {
  const [spinning, setSpinning] = useState(true);
  return (
    <>
      <Button onClick={() => setSpinning(true)}>展示加载</Button>
      <br />
      <Spin
        spinning={spinning}
        desc="加载中..."
        cancelText="取消"
        onCancel={() => setSpinning(false)}
      />
    </>
  );
}

export const meta = {
  title: '描述文案和操作按钮',
  desc:
    '1. 设置`desc`和`cancelText`可以展示描述文案和操作按钮\n\n 2. 通过`spinning`控制加载状态\n\n 3. 通过`onCancel`回调响应操作按钮的行为',
};
