/* eslint-disable @typescript-eslint/no-var-requires */
import { ITableColumn, Table, InlineButton, toast, Button } from '@muya-ui/core';

import React, { useState } from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';

import uiPackage from '../packages/core/package.json';
import darkPackage from '../packages/theme-dark/package.json';
import lightPackage from '../packages/theme-light/package.json';
import corePackage from '../packages/utils/package.json';

interface RepoData {
  name: string;
  desc: string;
}

const dataSource: RepoData[] = [
  {
    name: `@muya-ui/core@${uiPackage.version}`,
    desc: '组件库包',
  },
  {
    name: `@muya-ui/utils@${corePackage.version}`,
    desc: '一些通用的 hooks 和 utils',
  },
  {
    name: `@muya-ui/theme-light@${lightPackage.version}`,
    desc: '默认主题',
  },
  {
    name: `@muya-ui/theme-dark@${darkPackage.version}`,
    desc: '暗主题',
  },
];

export default function() {
  const [keys, setKeys] = useState<React.Key[]>([]);
  const handleClick = () => {
    if (keys.length === 0) {
      toast.info('请选择你需要升级的包名');
    } else {
      toast.success('命令生成成功，请粘贴至命令行工具');
    }
  };
  const columns: ITableColumn<RepoData>[] = [
    {
      title: '包名（点击按钮即可复制）',
      key: 'name',
      render: data => {
        return (
          <CopyToClipboard text={data.name} onCopy={() => toast.success('已复制')}>
            <InlineButton>{data.name}</InlineButton>
          </CopyToClipboard>
        );
      },
    },
    {
      title: '描述',
      key: 'desc',
      dataIndex: 'desc',
    },
  ];
  return (
    <>
      <CopyToClipboard text={keys.length ? `yarn add ` + keys.join(' ') : ''} onCopy={handleClick}>
        <Button type="primary" style={{ marginBottom: 10 }}>
          生成升级版本命令
        </Button>
      </CopyToClipboard>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          selectedRowKeys: keys,

          onChange: selectedRowKeys => {
            setKeys(selectedRowKeys);
          },
        }}
        rowKey="name"
      />
    </>
  );
}
