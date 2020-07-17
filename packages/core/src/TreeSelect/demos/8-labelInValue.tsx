import React from 'react';

import {
  ITreeCheckInfo,
  ITreeSelectInfo,
  ITreeSelectValueType,
  Row,
  TreeSelect,
} from '@muya-ui/core';

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

export default function LabelInValueDemo() {
  return (
    <>
      <Row>
        <TreeSelect
          placeholder="labelInValue"
          labelInValue
          onChange={onChange}
          treeData={treeData}
          treeRenderAfterExpand
          treeDefaultExpandedKeys={['0-0-0']}
        ></TreeSelect>
      </Row>
      <Row>
        <TreeSelect
          multiple
          placeholder="labelInValue"
          labelInValue
          width="50%"
          onChange={onChange}
          treeData={treeData}
          treeRenderAfterExpand
          treeDefaultExpandedKeys={['0-0-0']}
        ></TreeSelect>
      </Row>
    </>
  );
}

export const meta = {
  title: 'LabelInValue',
  desc:
    '传入的 `value` 和 `onChange` 传出的 value 结构都会修改为 `{ value: string | number, label: ReactNode }`',
};
