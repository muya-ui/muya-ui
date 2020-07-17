import React from 'react';

import { ITreeNodeData, ITreeSelectInfo, Tree } from '@muya-ui/core';

/** 支持泛型扩展树的数据结构 */
interface IData extends ITreeNodeData {
  extra: string;
}

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    extra: 'test',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        disabled: true,
        children: [{ title: '普通条目#0#0#0', key: '0-0-0-0', extra: 'test' }],
        extra: 'test',
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [{ title: '普通条目#0#1#0', key: '0-0-1-0', extra: 'test' }],
        extra: 'test',
      },
      {
        title: '成组条目#0#2',
        key: '0-0-2',
        extra: 'test',
      },
    ],
  },
  {
    title: '成组条目#1',
    key: '0-1',
    children: [{ title: '普通条目#1#0#0', key: '0-1-0-0', extra: 'test' }],
    extra: '1',
  },
  {
    title: '成组条目#2',
    key: '0-2',
    extra: 'test',
  },
];

const onSelect = (selectedKeys: React.ReactText[], info: ITreeSelectInfo<IData>) => {
  console.log(selectedKeys, info.data.data.extra);
};

export default function BasicDemo() {
  return (
    <Tree<IData>
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={treeData}
      renderAfterExpand
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
    ></Tree>
  );
}

export const meta = {
  title: '泛型数据',
  desc:
    '0.4.0 版本后，支持泛型结构的数据，泛型需要继承 `ITreeNodeData`，默认的泛型为 `ITreeNodeData`。',
};
