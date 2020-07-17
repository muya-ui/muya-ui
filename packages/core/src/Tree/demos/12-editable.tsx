import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import { InformIcon } from '@muya-ui/theme-light';
import {
  Input,
  ITreeNodeData,
  ITreeNodeKey,
  ITreeNodeProps,
  ITreeNodeState,
  PopoverCard,
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

function traverseDataNodes(dataNodes: ITreeNodeData[], nodeKey: ITreeNodeKey, newTitle: string) {
  function dfs(node: ITreeNodeData | null) {
    const children = node ? node.children : dataNodes;
    if (node && node.key === nodeKey) {
      node.title = newTitle;
      return;
    }
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const subNode = children[i];
        dfs(subNode);
      }
    }
  }
  dfs(null);
}

const StyledIcon = styled(InformIcon)`
  margin-right: 8px;
  color: #ffab00;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
`;

interface EditableTitleProps {
  title: string;
  nodeKey: ITreeNodeKey;
  onChange?: (nodeKey: ITreeNodeKey, newTitle: string) => void;
}

function EditableTitle(props: EditableTitleProps) {
  const { title, nodeKey, onChange } = props;
  const ref = useRef<HTMLDivElement | null>();
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTitleClick = useCallback(() => setEditable(true), []);
  const handleInputChange = useCallback(e => {
    const { value } = e.target;
    setNewTitle(value);
  }, []);

  const handlePressEnter = useEventCallback(() => {
    if (!newTitle) {
      setErrorMsg('目录名必填');
      return;
    }
    setEditable(false);
    onChange && onChange(nodeKey, newTitle);
  });

  const handleClickAway = useCallback(
    e => {
      if (
        document.documentElement &&
        document.documentElement.contains(e.target) &&
        ref.current &&
        !(ref.current as any).contains(e.target) // 子节点不包含event.target
      ) {
        setEditable(false);
        setNewTitle(title);
      }
    },
    [title],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickAway);
    return () => {
      document.removeEventListener('click', handleClickAway);
    };
  });

  if (editable) {
    return (
      <PopoverCard
        open={!!errorMsg}
        placement="right"
        content={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <StyledIcon />
            <Typography.Text>{errorMsg}</Typography.Text>
          </div>
        }
        style={{
          padding: '8px 12px',
        }}
      >
        <Input
          ref={ref as any}
          autoFocus
          height={28}
          width="100%"
          value={newTitle}
          onChange={handleInputChange}
          onPressEnter={handlePressEnter}
        />
      </PopoverCard>
    );
  } else {
    return (
      <StyledTitle onDoubleClick={handleTitleClick}>
        <Typography.Text>{title}</Typography.Text>
      </StyledTitle>
    );
  }
}

export default function EditableDemo() {
  const [data, setData] = useState(treeData);
  const onChange = useEventCallback((nodeKey: ITreeNodeKey, newTitle: string) => {
    traverseDataNodes(data, nodeKey, newTitle);
    setData([...data]);
  });
  const renderNodeContent = useCallback(
    (props: ITreeNodeProps & ITreeNodeState) => {
      const { title, nodeKey } = props;
      return <EditableTitle title={title as string} nodeKey={nodeKey} onChange={onChange} />;
    },
    [onChange],
  );
  return (
    <Tree
      style={{
        width: 250,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={data}
      renderNodeContent={renderNodeContent}
      defaultExpandAll
    ></Tree>
  );
}

export const meta = {
  title: '可编辑的树',
  desc: '可以通过过自定义节点实现可编辑树',
};
