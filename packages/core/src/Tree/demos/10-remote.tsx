import React, { useState } from 'react';

import { ITreeNodeData, ITreeNodeEventData, ITreeNodeKey, Tree } from '@muya-ui/core';

function traverseDataNodes(dataNodes: ITreeNodeData[], nodeKey: ITreeNodeKey) {
  function dfs(node: ITreeNodeData | null) {
    const children = node ? node.children : dataNodes;
    if (node && node.key === nodeKey) {
      node.children = [
        { title: 'Child Node', key: `${nodeKey}-0` },
        { title: 'Child Node', key: `${nodeKey}-1` },
      ];
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

export default function RemoteDemo() {
  const [data, setData] = useState([
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true },
  ]);
  const onLoadData = (eventData: ITreeNodeEventData) =>
    new Promise(resolve => {
      const { nodeKey, children } = eventData;
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        traverseDataNodes(data, nodeKey);
        setData([...data]);
        resolve();
      }, 2000);
    });
  return (
    <Tree
      style={{
        width: 200,
        boxShadow: '0 0 12px 0 rgba(56,60,66,0.08)',
      }}
      data={data}
      loadData={onLoadData}
    ></Tree>
  );
}

export const meta = {
  title: '远程加载数据',
  desc: '点击展开节点，动态加载数据。',
};
