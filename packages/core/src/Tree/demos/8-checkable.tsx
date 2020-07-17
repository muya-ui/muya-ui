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

export default function CheckboxDemo() {
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      onCheck={onCheck}
      data={treeData}
      defaultExpandAll
      selectable={false}
      checkable
    ></Tree>
  );
}

export const meta = {
  title: 'Checkbox 多选',
  desc:
    '除了条目选择，还可以通过 `checkable` 支持 Checkbox 选择。`Checkbox` 的多选默认会关联父子节点的状态，如父子节点无逻辑关系，可以设置 `checkStrictly` 属性。',
};
