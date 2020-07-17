import React from 'react';
import { Spin } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <span style={{ fontSize: '16px' }}>
        <Spin color="orange" />
      </span>
      <span style={{ fontSize: '32px' }}>
        <Spin />
      </span>
    </>
  );
}

export const meta = {
  title: '基本用法',
  desc: '最基础的加载`Spin`，单独使用时同Icon图标的使用，可以自定义颜色大小',
};
