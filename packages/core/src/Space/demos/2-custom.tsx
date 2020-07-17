import React from 'react';
import { Space, Button, Typography } from '@muya-ui/core';

export default function Custom() {
  return (
    <Space direction="vertical" block>
      <Space spacing="s6">
        <Typography.Title>我是标题</Typography.Title>
        普通文本
      </Space>
      <Space spacing={10}>
        <Button type="primary">主要按钮</Button>
        <Button>普通按钮</Button>
      </Space>
      <Typography.Title>另起一行的标题</Typography.Title>
    </Space>
  );
}

export const meta = {
  title: '定制尺寸和方向',
  desc:
    '1. `size`可以传入标准的间距规格`s1-s21`，也可以传入数字自定义间距\n\n 2. 设置`direction`可以调整`Space`的方向',
};
