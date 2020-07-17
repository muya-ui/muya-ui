import React from 'react';

import { Typography } from '@muya-ui/core';

export default function TextDemo() {
  return (
    <div>
      <Typography.Text underline>下划线</Typography.Text>
      <br />
      <Typography.Text strong>加粗</Typography.Text>
      <br />
      <Typography.Text delete>删除线</Typography.Text>
      <br />
      <Typography.Text ellipsis style={{ maxWidth: '300px' }} color="assistant">
        长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本
      </Typography.Text>
    </div>
  );
}

export const meta = {
  title: '文本展示',
  desc: '可以对文本添加装饰，在文本过长时可设置省略',
};
