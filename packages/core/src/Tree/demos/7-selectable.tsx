import React from 'react';

import { ITreeSelectInfo, Tree } from '@muya-ui/core';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        children: [
          { title: '普通条目#0#0#0', key: '0-0-0-0', disableCheckbox: true },
          { title: '普通条目#0#0#2', key: '0-0-0-2' },
        ],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [{ title: '普通条目#0#1#0', key: '0-0-1-0' }],
      },
      {
        title: '成组条目#0#2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '成组条目#1',
    key: '0-1',
    children: [{ title: '普通条目#1#0#0', key: '0-1-0-0' }],
  },
  {
    title: '成组条目#2',
    key: '0-2',
  },
];

const onSelect = (selectedKeys: React.ReactText[], info: ITreeSelectInfo) => {
  console.log(selectedKeys, info);
};

export default function SelectableDemo() {
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      onSelect={onSelect}
      data={treeData}
      defaultExpandAll
      multiple
    ></Tree>
  );
}

export const meta = {
  title: '条目选择',
  desc: '树默认支持条目选择，且为单选，可以通过 `multiple` 开启多选。',
};
