import React from 'react';
import { Space, Button, Typography, InlineButton, Input } from '@muya-ui/core';

export default function Simple() {
  return (
    <Space>
      <Typography.Title>我是标题</Typography.Title>
      普通文本
      <Input placeholder="输入文字" />
      <Button type="primary">普通按钮</Button>
      <InlineButton type="primary">文字按钮</InlineButton>
    </Space>
  );
}

export const meta = {
  title: '基础用法',
  desc: '相邻组件水平间距',
};
