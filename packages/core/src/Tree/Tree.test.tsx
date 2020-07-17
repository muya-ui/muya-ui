import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';

import { FileIcon } from '@muya-ui/theme-light';

import { Tree } from './index';
import { ITreeNodeProps, ITreeNodeState } from './types';

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

const CustomNode = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  &:hover {
    color: #1a7af8;
  }
`;

describe('Tree', () => {
  test('测试正常 render', () => {
    const wrapper = renderer
      .create(
        <>
          <Tree
            style={{
              width: 200,
              boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
            }}
            size="s"
            data={treeData}
            renderAfterExpand
            defaultExpandedKeys={['0-0-0']}
          ></Tree>
          <Tree
            style={{
              width: 200,
              boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
            }}
            size="l"
            data={treeData}
            showLine
            defaultExpandAll
          ></Tree>
          <Tree
            style={{
              width: 200,
              boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
            }}
            data={treeData}
            checkable
            draggable
            defaultExpandAll
          ></Tree>
          <Tree
            style={{
              width: 200,
              boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
            }}
            data={treeData}
            defaultExpandAll
            icon={<FileIcon />}
            renderNodeRightArea={(props: ITreeNodeProps & ITreeNodeState) => (
              <CustomNode>{props.title}</CustomNode>
            )}
          ></Tree>
          <Tree
            style={{
              width: 200,
              boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
            }}
            data={treeData}
            defaultExpandAll
            icon={<FileIcon />}
            renderNodeContent={(props: ITreeNodeProps & ITreeNodeState) => (
              <CustomNode>{props.title}</CustomNode>
            )}
          ></Tree>
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
