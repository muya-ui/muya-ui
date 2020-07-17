import React from 'react';

import { ITreeCheckInfo, ITreeSelectInfo, ITreeSelectValueType, TreeSelect } from '@muya-ui/core';

const treeData = [
  {
    name: '成组条目#0',
    id: '0-0',
    elements: [
      {
        name: '成组条目#0#0',
        id: '0-0-0',
        disabled: true,
        elements: [
          { name: '普通条目#0#0#0', id: '0-0-0-0' },
          { name: '普通条目#0#0#1', id: '0-0-0-1' },
          { name: '普通条目#0#0#2', id: '0-0-0-2' },
        ],
      },
      {
        name: '成组条目#0#1',
        id: '0-0-1',
        elements: [
          { name: '普通条目#0#1#0', id: '0-0-1-0' },
          { name: '普通条目#0#1#1', id: '0-0-1-1' },
          { name: '普通条目#0#1#2', id: '0-0-1-2' },
        ],
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
    elements: [
      { name: '普通条目#1#0#0', id: '0-1-0-0' },
      { name: '普通条目#1#0#1', id: '0-1-0-1' },
      { name: '普通条目#1#0#2', id: '0-1-0-2' },
    ],
  },
  {
    name: '成组条目#2',
    id: '0-2',
  },
];

const onChange = (selectedKeys: ITreeSelectValueType, info?: ITreeSelectInfo | ITreeCheckInfo) => {
  console.log(selectedKeys, info);
};

export default function CustomKeyDemo() {
  return (
    <TreeSelect
      allowClear
      onChange={onChange}
      treeData={treeData}
      treeDefaultExpandedKeys={['0-0-0']}
      customKeyName="id"
      customTitleName="name"
      customChildrenName="elements"
    ></TreeSelect>
  );
}

export const meta = {
  title: '自定义 TreeData 的键',
  desc:
    '可以通过 `customKeyName`、`customTitleName`、`customChildrenName` 中的 `key`、`title`、`children` 三个字段的键，来适配后端的数据。',
};
