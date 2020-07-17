import React, { useState } from 'react';

import { Button, Skeleton, Typography } from '@muya-ui/core';

export default function Simple() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <div>
      <Skeleton loading={loading} style={{ width: '500px', height: '100px', marginBottom: '20px' }}>
        <Typography.Paragraph>我是加载后的内容😁</Typography.Paragraph>
      </Skeleton>
      <Button onClick={handleClick}>点我加载</Button>
    </div>
  );
}

export const meta = {
  title: '最简单的用法',
  desc: '控制`Skeleton`的loading状态，加载结束后骨架屏会展示其包裹的内容',
};
