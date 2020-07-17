import React from 'react';
import { Spin } from '@muya-ui/core';

export default function Direction() {
  return (
    <>
      <Spin desc="加载中..." cancelText="取消" />
      <span style={{ padding: '20px' }}></span>
      <Spin direction="row" desc="加载中..." cancelText="取消" />
    </>
  );
}

export const meta = {
  title: '两种布局',
  desc: '将`direction`设置为`column`或者`row`来控制布局方式，默认为`column`',
};
