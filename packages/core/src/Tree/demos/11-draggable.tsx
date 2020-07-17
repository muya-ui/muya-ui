import React, { useState } from 'react';

import { ITreeNodeEventData, ITreeNodeKey, Tree } from '@muya-ui/core';
import { FileIcon } from '@muya-ui/theme-light';

import { ITreeNodeData } from '../types';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        children: [{ title: '普通条目#0#0#0', key: '0-0-0-0', icon: null }],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [{ title: '普通条目#0#1#0', key: '0-0-1-0', icon: null }],
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

export default function DraggableDemo() {
  const [data, setData] = useState(treeData);
  const onDrop = (info: {
    event: React.DragEvent;
    node: ITreeNodeEventData;
    dragNode: ITreeNodeEventData;
    dragNodesKeys: ITreeNodeKey[];
    dropPosition: number;
    dropToGap: boolean;
  }) => {
    const dropKey = info.node.nodeKey;
    const dragKey = info.dragNode.nodeKey;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data: ITreeNodeData[], key: ITreeNodeKey, callback: Function) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const newData = [...data];
    let dragObj: ITreeNodeData;
    loop(newData, dragKey, (item: ITreeNodeData, index: number, arr: any[]) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(newData, dropKey, (item: ITreeNodeData) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(newData, dropKey, (item: ITreeNodeData) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar: ITreeNodeData[] = [];
      let i: number;
      loop(newData, dropKey, (item: ITreeNodeData, index: number, arr: any[]) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setData(newData);
  };
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      icon={<FileIcon color="#bad7fd" id="fileIcon" />}
      data={data}
      onDragStart={(e, data) => {
        console.log(data);
        const fileIconNode = document.querySelector('#fileIcon');
        if (fileIconNode && data.icon !== null) {
          e.dataTransfer.setDragImage(fileIconNode, 10, 10);
        }
      }}
      onDrop={onDrop}
      defaultExpandAll
      draggable
    ></Tree>
  );
}

export const meta = {
  title: '可拖拽的树',
  desc: '可拖拽的树，可以自定义拖拽预览图',
};
