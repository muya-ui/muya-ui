import React from 'react';
import styled from 'styled-components';

import { FileIcon, MoreIcon } from '@muya-ui/theme-light';
import {
  Dropdown,
  InlineButton,
  ITreeNodeProps,
  ITreeNodeState,
  Menu,
  MenuItem,
  Tree,
  Typography,
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

const menu = (
  <Menu selectable={false}>
    <MenuItem>新增子节点</MenuItem>
    <MenuItem>删除节点</MenuItem>
  </Menu>
);

const CustomNode = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

const StyledIconWrapper = styled.div`
  margin-right: 12px;
`;

export default function CustomNodeDemo() {
  const renderNodeContent = (props: ITreeNodeProps & ITreeNodeState) => {
    const { title, isLeaf } = props;
    return (
      <CustomNode>
        <Typography.Text ellipsis>{title}</Typography.Text>
        {isLeaf && (
          <StyledIconWrapper>
            <Dropdown overlay={menu}>
              <InlineButton type="secondary">
                <MoreIcon />
              </InlineButton>
            </Dropdown>
          </StyledIconWrapper>
        )}
      </CustomNode>
    );
  };
  return (
    <Tree
      style={{
        width: 250,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={treeData}
      icon={<FileIcon color="#bad7fd" />}
      renderNodeContent={renderNodeContent}
      defaultExpandAll
    ></Tree>
  );
}

export const meta = {
  title: '自定义节点内容',
  desc: '自定义节点内容。',
};
