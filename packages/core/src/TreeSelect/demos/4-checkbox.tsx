import React from 'react';

import { ITreeCheckInfo, ITreeSelectInfo, ITreeSelectValueType, TreeSelect } from '@muya-ui/core';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        children: [
          { title: '普通条目#0#0#0', key: '0-0-0-0' },
          { title: '普通条目#0#0#1', key: '0-0-0-1' },
          { title: '普通条目#0#0#2', key: '0-0-0-2' },
        ],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [
          { title: '普通条目#0#1#0', key: '0-0-1-0' },
          { title: '普通条目#0#1#1', key: '0-0-1-1' },
          { title: '普通条目#0#1#2', key: '0-0-1-2' },
        ],
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
    children: [
      { title: '普通条目#1#0#0', key: '0-1-0-0' },
      { title: '普通条目#1#0#1', key: '0-1-0-1' },
      { title: '普通条目#1#0#2', key: '0-1-0-2' },
    ],
  },
  {
    title: '成组条目#2',
    key: '0-2',
  },
];

const onChange = (selectedKeys: ITreeSelectValueType, info?: ITreeSelectInfo | ITreeCheckInfo) => {
  console.log(selectedKeys, info);
};

export default function CheckboxDemo() {
  return (
    <TreeSelect
      allowClear
      width="50%"
      onChange={onChange}
      treeData={treeData}
      treeCheckable
      treeRenderAfterExpand
      treeDefaultExpandedKeys={['0-0-0']}
    ></TreeSelect>
  );
}

export const meta = {
  title: 'Checkbox 多选',
  desc: '除了可以通过 `multiple` 属性开启多选外，当 `treeCheckable` 为 `true` 时，会自动启用多选。',
};
