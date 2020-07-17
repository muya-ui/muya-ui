import React from 'react';

import { FileIcon, StarsIcon } from '@muya-ui/theme-light';
import { Tree } from '@muya-ui/core';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '成组条目#2',
    key: '0-2',
    icon: <StarsIcon color="#bad7fd" />,
  },
];

export default function IconDemo() {
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      icon={<FileIcon color="#bad7fd" />}
      data={treeData}
    ></Tree>
  );
}

export const meta = {
  title: '自定义 Icon 的树',
  desc: '可以通过 `icon` 属性，设置整个树的 Icon，也可以在 `treeData` 为单个条目设置 Icon。',
};
