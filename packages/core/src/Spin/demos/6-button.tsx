import React from 'react';
import { Spin, Button } from '@muya-ui/core';

export default function ButtonExample() {
  return <Button prefixNode={<Spin />}>加载中...</Button>;
}

export const meta = {
  title: '按钮加载',
  desc: '将`Spin`作为Button组件的prefixNode传入，即可实现按钮加载',
};
