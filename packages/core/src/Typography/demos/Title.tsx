import React from 'react';
import { Typography } from '@muya-ui/core';

export default function TitleDemo() {
  return (
    <div>
      <Typography.Title level={1} ellipsis>
        一级标题
      </Typography.Title>
      <Typography.Title level={2} ellipsis>
        二级标题
      </Typography.Title>
      <Typography.Title level={3} ellipsis>
        三级标题
      </Typography.Title>
      <Typography.Title level={4} ellipsis>
        四级标题
      </Typography.Title>
      <Typography.Title level={5} ellipsis>
        五级标题
      </Typography.Title>
      <Typography.Title level={6} ellipsis>
        六级标题
      </Typography.Title>
    </div>
  );
}

export const meta = {
  title: '标题',
  desc: '支持1-6级标题',
};
