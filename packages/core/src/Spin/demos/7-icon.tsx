import React from 'react';
import { SpinIcon } from '@muya-ui/core';

export default function ButtonExample() {
  return <SpinIcon fontSize={32} color="orange" />;
}

export const meta = {
  title: 'SVG Icon',
  desc: '单独将 Icon 抽离成组件，推荐直接使用 `Spin`',
};
