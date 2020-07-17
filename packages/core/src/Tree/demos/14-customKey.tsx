import React from 'react';

import { Tree } from '@muya-ui/core';

const treeData = [
  {
    name: '成组条目#0',
    id: '0-0',
    elements: [
      {
        name: '成组条目#0#0',
        id: '0-0-0',
        disabled: true,
        elements: [{ name: '普通条目#0#0#0', id: '0-0-0-0' }],
      },
      {
        name: '成组条目#0#1',
        id: '0-0-1',
        elements: [{ name: '普通条目#0#1#0', id: '0-0-1-0' }],
      },
      {
        name: '成组条目#0#2',
        id: '0-0-2',
      },
    ],
  },
  {
    name: '成组条目#1',
    id: '0-1',
    elements: [{ name: '普通条目#1#0#0', id: '0-1-0-0' }],
  },
  {
    name: '成组条目#2',
    id: '0-2',
  },
];

export default function CustomKeyDemo() {
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={treeData}
      renderAfterExpand
      defaultExpandedKeys={['0-0-0']}
      customKeyName="id"
      customTitleName="name"
      customChildrenName="elements"
    ></Tree>
  );
}

export const meta = {
  title: '自定义 TreeData 的键',
  desc:
    '可以通过 `customKeyName`、`customTitleName`、`customChildrenName` 中的 `key`、`title`、`children` 三个字段的键，来适配后端的数据。',
};
