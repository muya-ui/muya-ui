import React, { useState } from 'react';

import { FileIcon, IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, ITreeSelectInfo, Row, Tree, Typography } from '@muya-ui/core';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: '普通条目#0#0#0', key: '0-0-0-0' },
          { title: '普通条目#0#0#1', key: '0-0-0-1' },
        ],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [
          { title: '普通条目#0#1#0', key: '0-0-1-0' },
          { title: '普通条目#0#1#1', key: '0-0-1-1' },
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
    ],
  },
  {
    title: '成组条目#2',
    key: '0-2',
  },
];

const onSelect = (selectedKeys: React.ReactText[], info: ITreeSelectInfo) => {
  console.log(selectedKeys, info);
};

export default function SizeDemo() {
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  return (
    <>
      <Typography.Title style={{ marginBottom: '12px' }} level={5}>
        点击切换尺寸：
      </Typography.Title>
      <Row>
        <ButtonGroup>
          <Button plain={size !== 'xl'} onClick={() => setSize('xl')}>
            xl
          </Button>
          <Button plain={size !== 'l'} onClick={() => setSize('l')}>
            l
          </Button>
          <Button plain={size !== 'm'} onClick={() => setSize('m')}>
            m
          </Button>
          <Button plain={size !== 's'} onClick={() => setSize('s')}>
            s
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Tree
          style={{
            width: 240,
            boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
          }}
          size={size}
          data={treeData}
          renderAfterExpand
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          icon={<FileIcon color="#bad7fd" />}
          checkable
        ></Tree>
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '树有两种尺寸，`s` 和 `m` 为小的一档，`l` 和 `xl` 为大的一档，默认为 `m`。',
};
