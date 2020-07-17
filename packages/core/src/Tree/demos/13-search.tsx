import deepmerge from 'deepmerge';
import React, { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import { FileIcon, SearchIcon } from '@muya-ui/theme-light';
import {
  Input,
  ITreeNodeData,
  ITreeNodeKey,
  ITreeNodeProps,
  ITreeNodeState,
  Result,
  Tree,
  Trigger,
} from '@muya-ui/core';

interface ITreeNodeDataEntity {
  index: number;
  key: ITreeNodeKey;
  pos: string;
  node: ITreeNodeData;
  parent?: ITreeNodeDataEntity;
  children?: ITreeNodeDataEntity[];
  level: number;
}

const originTreeData: ITreeNodeData[] = [
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

// 遍历树
function traverseDataNodes(
  dataNodes: ITreeNodeData[],
  callback: (data: {
    node: ITreeNodeData;
    index: number;
    pos: string;
    key: ITreeNodeKey;
    parentPos: string | number;
    level: number;
  }) => void,
) {
  function dfs(
    node: ITreeNodeData | null,
    index?: number,
    parent?: { node: ITreeNodeData | null; pos: string; level: number },
  ) {
    const children = node ? (node.children as ITreeNodeData[]) : dataNodes;
    const pos = node ? `${parent!.pos}-${index}` : '0';
    if (node) {
      const data = {
        node,
        index: index!,
        pos,
        key: node.key !== null ? node.key! : pos,
        parentPos: parent!.pos,
        level: parent!.level + 1,
      };
      callback(data);
    }
    if (children) {
      children.forEach((subNode, subIndex) => {
        dfs(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1,
        });
      });
    }
  }
  dfs(null);
}

// 将树结构转成 key、value 结构
function convertDataToEntities(dataNodes: ITreeNodeData[]) {
  const keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity> = {};
  traverseDataNodes(dataNodes, item => {
    const { node, index, pos, key, level } = item;
    const entity: ITreeNodeDataEntity = { node, index, key, pos, level };
    keyEntities[key] = entity;
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
  });

  return keyEntities;
}

const keyEntities = convertDataToEntities(originTreeData);

// 判断该节点链路上是否有标记
function hasFlag(item: ITreeNodeData) {
  let flag = item.flag;
  if (item.children && item.children.length) {
    for (const child of item.children) {
      if (hasFlag(child)) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}

// 过滤掉链路上没有标记的节点
function treeFilter(data: ITreeNodeData[]) {
  return data.filter(item => {
    if (item && item.children && item.children.length) {
      item.children = treeFilter(item.children);
    }
    return hasFlag(item);
  });
}

function getFilteredTreeData(searchText: string) {
  const newOriginTreeData = deepmerge([], originTreeData);
  // 标记节点
  traverseDataNodes(newOriginTreeData, item => {
    const { node } = item;
    if (`${node.title}`.indexOf(searchText) > -1) {
      node.flag = true;
    } else {
      node.flag = false;
    }
  });
  // 过滤数据
  return treeFilter(newOriginTreeData);
}

// 弹出容器
const PopupWrapper = styled.div`
  width: 240px;
  background: #fff;
  box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.08);
  padding-right: 4px;
  overflow: hidden;
`;

// 弹出滚动容器
const PopupScrollBox = styled.div`
  max-height: 204px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 2px;
    background-color: #eee;
  }
`;

export default function SearchDemo() {
  const isOnCompositionRef = useRef(false);
  // 树数据
  const [treeData, setTreeData] = useState(originTreeData);
  // 是否弹出
  const [popupVisible, setPopupVisible] = useState(false);
  // 输入框内容
  const [inputValue, setInputValue] = useState('');
  // 展开节点 key
  const [expandedKeys, setExpandedKeys] = useState<ITreeNodeKey[]>([]);
  // 选中节点的 key
  const [selectedKeys, setSelectedKeys] = useState<ITreeNodeKey[]>([]);
  // input 外框样式，弹出时边框高亮
  const inputWrapperStyle = useMemo(() => {
    const style: CSSProperties = {
      marginBottom: 4,
    };
    if (popupVisible) {
      style.borderColor = '#1a70f8';
    }
    return style;
  }, [popupVisible]);
  // 遍历树，得到匹配搜索关键词的 key
  const getExpandedKeys = useCallback((treeData: ITreeNodeData[]) => {
    const expandedKeys: ITreeNodeKey[] = [];
    traverseDataNodes(treeData, data => {
      const { node } = data;
      if (node && node.flag) {
        expandedKeys.push(node.key!);
      }
    });
    return expandedKeys;
  }, []);
  // 弹出层关闭时，如果有选中内容那么回填到输入框，否则清空输入框
  const handlePopupExited = useCallback(() => {
    if (selectedKeys.length === 0) {
      setInputValue('');
    } else {
      setInputValue(`${keyEntities[selectedKeys[0]].node.title}`);
    }
    setExpandedKeys(selectedKeys);
    setTreeData(originTreeData);
  }, [selectedKeys]);
  const handlePopupVisibleChange = useEventCallback(
    (visible: boolean, clearInput: boolean = true) => {
      // 打开弹出层时清空输入框
      if (!popupVisible && visible && clearInput) {
        setInputValue('');
      }
      setPopupVisible(visible);
    },
    [popupVisible],
  );
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
      if (!popupVisible) {
        handlePopupVisibleChange(true, false);
      }
      if (value) {
        const newTreeData = getFilteredTreeData(value);
        setTreeData(newTreeData);
        setExpandedKeys(getExpandedKeys(newTreeData));
      } else {
        setExpandedKeys(selectedKeys);
        setTreeData(originTreeData);
      }
    },
    [getExpandedKeys, handlePopupVisibleChange, popupVisible, selectedKeys],
  );
  const handleComposition = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      if (e.type === 'compositionend') {
        isOnCompositionRef.current = false;
        if (!isOnCompositionRef.current) {
          const event = {} as React.ChangeEvent<HTMLInputElement>;
          // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
          event.target = { value: e.data } as HTMLInputElement;
          onChange(event);
        }
      } else {
        isOnCompositionRef.current = true;
      }
    },
    [onChange],
  );
  const onExpand = useCallback((expandedKeys: ITreeNodeKey[]) => {
    setExpandedKeys(expandedKeys);
  }, []);
  const onSelect = useCallback((selectedKeys: ITreeNodeKey[]) => {
    setSelectedKeys(selectedKeys);
    setPopupVisible(false);
  }, []);
  // 自定义节点，高亮关键词
  const renderNodeContent = useCallback(
    (props: ITreeNodeProps & ITreeNodeState) => {
      const title = (props.title as string) || '';
      const index = title.indexOf(inputValue);
      const beforeStr = title.substr(0, index);
      const afterStr = title.substr(index + inputValue.length);
      const $title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#1A7AF8' }}>{inputValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{title}</span>
        );
      return $title;
    },
    [inputValue],
  );
  return (
    <Trigger
      popup={
        <PopupWrapper>
          <PopupScrollBox>
            {treeData.length > 0 ? (
              <Tree
                data={treeData}
                autoExpandParent
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                onExpand={onExpand}
                onSelect={onSelect}
                icon={<FileIcon color="#bad7fd" />}
                renderNodeContent={renderNodeContent}
              />
            ) : (
              <Result
                subTitle="暂无数据"
                type="emptySmall"
                style={{ marginTop: 66, marginBottom: 66 }}
              />
            )}
          </PopupScrollBox>
        </PopupWrapper>
      }
      placement="bottom"
      triggerActions={['click']}
      open={popupVisible}
      onVisibleChange={handlePopupVisibleChange}
      transitionProps={{
        onExited: handlePopupExited,
      }}
      hideArrow
    >
      <Input
        styles={{
          inputWrapper: inputWrapperStyle,
        }}
        value={inputValue}
        placeholder="请输入关键词"
        onChange={onChange}
        onCompositionStart={handleComposition}
        onCompositionUpdate={handleComposition}
        onCompositionEnd={handleComposition}
        suffixNode={<SearchIcon />}
      />
    </Trigger>
  );
}

export const meta = {
  title: '搜索',
  desc: '可搜索的树。',
};
