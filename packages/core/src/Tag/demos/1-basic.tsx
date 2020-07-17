import React from 'react';

import { Link, Tag } from '@muya-ui/core';

function log(e: React.MouseEvent<HTMLElement>) {
  console.log(e);
}

export default function BasicDemo() {
  return (
    <>
      <Tag>胶囊标签</Tag>
      <Tag shape="rect">圆角标签</Tag>
      <Tag>
        <Link target="_blank" href="https://www.kujiale.com">
          链接
        </Link>
      </Tag>
      <Tag closable onClose={log}>
        可关闭标签
      </Tag>
      <Tag disabled>禁用标签</Tag>
    </>
  );
}

export const meta = {
  title: '基础使用',
  desc: '基本标签的用法，可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `onClose` 事件。',
};
