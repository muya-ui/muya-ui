/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { ITableColumn, Table, InlineButton, toast, Button } from '@muya-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import uiPackage from '../packages/core/package.json';
import corePackage from '../packages/utils/package.json';
import coohomPackage from '../packages/muya-theme-coohom/package.json';
import darkPackage from '../packages/theme-dark/package.json';
import lightPackage from '../packages/theme-light/package.json';
import panguPackage from '../packages/muya-theme-pangu/package.json';
import upPackage from '../packages/muya-theme-up/package.json';
import importPackage from '../packages/import/package.json';

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
    name: `@qunhe/muya-import@${importPackage.version}`,
    desc: '按需加载包',
  },
  {
    name: `@muya-ui/theme-light@${lightPackage.version}`,
    desc: '默认主题',
  },
  {
    name: `@muya-ui/theme-dark@${darkPackage.version}`,
    desc: '暗主题',
  },
  {
    name: `@qunhe/muya-theme-up@${upPackage.version}`,
    desc: '用户平台主题',
  },
  {
    name: `@qunhe/muya-theme-coohom@${coohomPackage.version}`,
    desc: '国际化主题',
  },
  {
    name: `@qunhe/muya-theme-pangu@${panguPackage.version}`,
    desc: '盘古主题',
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
