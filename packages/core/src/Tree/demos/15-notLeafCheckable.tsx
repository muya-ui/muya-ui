import React from 'react';

import { ITreeCheckedKeys, Tree } from '@muya-ui/core';

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
          { title: '普通条目#0#0#1', key: '0-0-0-1' },
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

function onCheck(checkedKeys: ITreeCheckedKeys) {
  console.log('checked: ', checkedKeys);
}

export default function NotLeafCheckableDemo() {
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={treeData}
      defaultExpandAll
      multiple
      checkable
      notLeafCheckable={false}
      checkOnClick
      onCheck={onCheck}
      selectable={false}
    ></Tree>
  );
}

export const meta = {
  title: '非叶子节点不可选中',
  desc:
    '虽然可以通过设置 `TreeNodeData` 的 `checkable` 来实现非叶子节点的不可选中，但是为了更便捷的使用，我们提供了 `notLeafCheckable` 快速实现。',
};
