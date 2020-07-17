import React, { useState } from 'react';

import { ITreeSelectValueType, Row, TreeSelect } from '@muya-ui/core';

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

export default function ControlledDemo() {
  const [singleValue, setSingleValue] = useState<ITreeSelectValueType>('0-0-0');
  const [multipleValue, setMultipleValue] = useState<ITreeSelectValueType>(['0-0-0']);
  const onSingleChange = (value: ITreeSelectValueType) => {
    console.log('selected: ', value);
    setSingleValue(value);
  };
  const onMultipleChange = (value: ITreeSelectValueType) => {
    console.log('selected: ', value);
    setMultipleValue(value);
  };
  return (
    <>
      <Row>
        <TreeSelect
          allowClear
          showSearch
          value={singleValue}
          onChange={onSingleChange}
          treeData={treeData}
          treeRenderAfterExpand
          treeDefaultExpandedKeys={['0-0-0']}
        ></TreeSelect>
      </Row>
      <Row>
        <TreeSelect
          allowClear
          treeCheckable
          value={multipleValue}
          onChange={onMultipleChange}
          treeData={treeData}
          treeRenderAfterExpand
          treeDefaultExpandedKeys={['0-0-0']}
        ></TreeSelect>
      </Row>
    </>
  );
}

export const meta = {
  title: '受控',
  desc: '通过 `value` 和 `onChange` 实现受控，可与 `Form` 组件集成。',
};
