import React, { useCallback } from 'react';
import styled from 'styled-components';

import { DustbinIcon, FileIcon, MoreIcon } from '@muya-ui/theme-light';
import {
  Dropdown,
  InlineButton,
  ITreeNodeProps,
  ITreeNodeState,
  Menu,
  MenuItem,
  Popconfirm,
  Tree,
} from '@muya-ui/core';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        children: [{ title: '普通条目#0#0#0', key: '0-0-0-0' }],
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

const StyledIconWrapper = styled.div`
  margin-right: 12px;
`;

const menu = (
  <Menu selectable={false}>
    <MenuItem key="add">新增同级节点</MenuItem>
    <MenuItem key="addChild">新增子节点</MenuItem>
  </Menu>
);

const iconNode = <FileIcon color="#bad7fd" />;

export default function CustomRightAreaDemo() {
  const renderNodeRightArea = useCallback((props: ITreeNodeProps & ITreeNodeState) => {
    const { isLeaf, hovering } = props;
    return (
      isLeaf &&
      hovering && (
        <StyledIconWrapper>
          <Popconfirm
            title="确定删除吗？"
            cancelText="取消"
            confirmText="确定"
            cancelButtonType="secondary"
            confirmButtonType="danger"
            triggerActions={['hover']}
          >
            <InlineButton type="secondary">
              <DustbinIcon />
            </InlineButton>
          </Popconfirm>
          <Dropdown overlay={menu}>
            <InlineButton type="secondary">
              <MoreIcon />
            </InlineButton>
          </Dropdown>
        </StyledIconWrapper>
      )
    );
  }, []);
  return (
    <Tree
      style={{
        width: 250,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={treeData}
      icon={iconNode}
      renderNodeRightArea={renderNodeRightArea}
      defaultExpandAll
    ></Tree>
  );
}

export const meta = {
  title: '自定义节点右侧内容',
  desc: '自定义节点右侧内容，一般为一些操作区。例子以及交互建议为 Hover 展示。',
};
