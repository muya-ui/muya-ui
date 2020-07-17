import * as React from 'react';

import { Omit } from '../types';
import {
  CheckEventTrigger,
  ExpandEventTrigger,
  ITreeNodeData,
  ITreeNodeEventData,
  ITreeNodeKey,
  ITreeProps,
} from './types';

export interface ITreeNodeDataEntity<T extends ITreeNodeData = ITreeNodeData> {
  index: number;
  key: ITreeNodeKey;
  pos: string;
  node: T;
  parent?: ITreeNodeDataEntity<T>;
  children?: ITreeNodeDataEntity<T>[];
  level: number;
}

export interface ITreeState<T extends ITreeNodeData = ITreeNodeData> {
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity<T>>;
  selectedKeys: ITreeNodeKey[];
  checkedKeys: ITreeNodeKey[];
  halfCheckedKeys: ITreeNodeKey[];
  loadedKeys: ITreeNodeKey[];
  loadingKeys: ITreeNodeKey[];
  expandedKeys: ITreeNodeKey[];
  dragging: boolean;
  dragNodesKeys: ITreeNodeKey[];
  dragOverNodeKey: ITreeNodeKey | null;
  dropPosition: number | null;
  treeData: T[];
}

export interface ITreeContextValue<T extends ITreeNodeData = ITreeNodeData>
  extends Omit<ITreeState<T>, 'dragging' | 'dragNodesKeys'>,
    Pick<
      ITreeProps<T>,
      | 'loadData'
      | 'renderNodeContent'
      | 'size'
      | 'renderNodeRightArea'
      | 'disabled'
      | 'notLeafCheckable'
      | 'checkable'
      | 'selectable'
      | 'draggable'
      | 'icon'
      | 'expandIcon'
      | 'expandOnClick'
      | 'checkOnClick'
      | 'showLine'
      | 'renderAfterExpand'
      | 'disableNativeTitle'
    > {
  onNodeDragStart: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeDragEnd: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeDragEnter: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeDragOver: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeDragLeave: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeDrop: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeClick: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeDoubleClick: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeSelect: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeCheck: (
    event: React.SyntheticEvent,
    eventData: ITreeNodeEventData<T>,
    trigger: CheckEventTrigger,
  ) => void;
  onNodeExpand: (
    event: React.MouseEvent,
    eventData: ITreeNodeEventData<T>,
    trigger: ExpandEventTrigger,
  ) => void;
  onNodeMouseEnter: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeMouseLeave: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeContextMenu: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  onNodeLoad: (eventData: ITreeNodeEventData<T>) => void;
}
