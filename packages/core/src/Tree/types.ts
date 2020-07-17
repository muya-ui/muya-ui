import React, { Ref, RefObject } from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

/**
 * Tree style keys
 * @styles node 树节点
 * @styles nodeContent 树节点内容
 * @styles nodeSelector 树节点选择区
 * @styles nodeIconWrapper树节点 Icon 容器
 * @styles nodeTitle 树节点标题
 * @styles childTree 子树
 */
export type ITreeNodeStyleKeys =
  | 'node'
  | 'nodeContent'
  | 'nodeSelector'
  | 'nodeIconWrapper'
  | 'nodeTitle'
  | 'childTree';

/**
 * Tree style keys
 * @style 树容器
 */
export type ITreeStyleKeys = 'wrapper';

/** Tree 节点的 key */
export type ITreeNodeKey = string | number;

/** 树选中行为触发点 */
export enum CheckEventTrigger {
  Checkbox = 'Checkbox',
  TreeNode = 'TreeNode',
}

/** 树展开行为触发点 */
export enum ExpandEventTrigger {
  ExpandIcon = 'ExpandIcon',
  TreeNode = 'TreeNode',
}

export interface ITreeNodeState {
  /**
   * 是否 hover
   */
  hovering: boolean;
  /**
   * 节点展开状态
   */
  expanded: boolean;
  /**
   * 节点选则状态
   */
  selected: boolean;
  /**
   * 节点加载状态
   */
  loaded: boolean;
  /**
   * 节点加载中状态
   */
  loading: boolean;
  /**
   * 节点选中状态
   */
  checked: boolean;
  /**
   * 节点半选状态
   */
  halfChecked: boolean;
  /**
   * 节点位置
   */
  pos: string;
  /**
   * 是否有节点放置
   */
  dragOver: boolean;
  /**
   * 是否有节点放到上面
   */
  dragOverGapTop: boolean;
  /**
   * 是否有节点放到下面
   */
  dragOverGapBottom: boolean;
}

/** TreeIcon */
export type ITreeIconType<T extends ITreeNodeData = ITreeNodeData> =
  | React.ReactNode
  | ((props: ITreeNodeProps<T> & ITreeNodeState) => React.ReactNode);

/** Tree Checkbox 的 Key 类型 */
export type ITreeCheckedKeys =
  | ITreeNodeKey[]
  | { checked: ITreeNodeKey[]; halfChecked: ITreeNodeKey[] };

/** Tree 数据节点：用户输入 */
export interface ITreeNodeData {
  /** 节点是否可选中 */
  checkable?: boolean;
  /** 节点是否可选择 */
  selectable?: boolean;
  /** 子节点 */
  children?: ITreeNodeData[];
  /** 节点是否禁用 */
  disabled?: boolean;
  /** 节点 Checkbox 是否禁止 */
  disableCheckbox?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 节点唯一 key */
  key?: ITreeNodeKey;
  /** 节点标题 */
  title?: React.ReactNode;
  /** 节点 Icon */
  icon?: React.ReactNode;
  /**
   * 节点展开的 Icon
   * @typeText
   * React.ReactNode | ((props: ITreeNodeProps & ITreeNodeState) => React.ReactNode)
   */
  expandIcon?: ITreeIconType;
  /** 自定义参数 */
  [customProp: string]: any;
}

export interface ITreeCheckInfo<T extends ITreeNodeData = ITreeNodeData> {
  /** check 事件数据 */
  data: ITreeNodeEventData<T>;
  /** 选中状态 */
  checked: boolean;
  /** 触发选中行为的触发点 */
  trigger: CheckEventTrigger;
  /** 原生事件 */
  nativeEvent: Event;
  /** 选中的节点 */
  checkedNodes: T[];
  /** 选中的节点位置 */
  checkedNodesPositions?: { node: T; pos: string }[];
  /** 半选的节点 Key */
  halfCheckedKeys?: ITreeNodeKey[];
}

export interface ITreeExpandInfo<T extends ITreeNodeData = ITreeNodeData> {
  /** 展开事件数据 */
  data: ITreeNodeEventData<T>;
  /** 展开状态 */
  expanded: boolean;
  /** 触发展开行为的触发点 */
  trigger: ExpandEventTrigger;
  /** 原生事件 */
  nativeEvent: Event;
}

export interface ITreeSelectInfo<T extends ITreeNodeData = ITreeNodeData> {
  /** 选择事件数据 */
  data: ITreeNodeEventData<T>;
  /** 选择状态 */
  selected: boolean;
  /** 原生事件 */
  nativeEvent: Event;
}

/**
 * TreeNode 的 Event 数据
 **/
export interface ITreeNodeEventData<T extends ITreeNodeData = ITreeNodeData>
  extends ITreeNodeBaseProps<T>,
    ITreeNodeState {
  /** 节点 ref */
  nodeRef: RefObject<HTMLDivElement>;
}

export interface ITreeNodeBaseProps<T extends ITreeNodeData = ITreeNodeData>
  extends ITreeNodeData,
    ICustomStyleBaseProps<ITreeNodeStyleKeys> {
  /** 节点 Key */
  nodeKey: ITreeNodeKey;
  /** 节点数据 */
  data: T;
}

export type ITreeNodeProps<T extends ITreeNodeData = ITreeNodeData> = ITreeNodeBaseProps<T> &
  Omit<React.HTMLAttributes<HTMLLIElement>, 'children' | 'title'>;

export interface ITreeBaseProps<T extends ITreeNodeData = ITreeNodeData>
  extends ICustomStyleBaseProps<ITreeStyleKeys | ITreeNodeStyleKeys>,
    ISizeSpecBaseProps {
  /** 树的 ref */
  treeRef?: Ref<HTMLUListElement>;
  /**
   * 树溢出是否可滚动，默认不可滚动，采用省略文本策略
   * @default false
   */
  scrollable?: boolean;
  /**
   * 自定义 treeData 中 key 的键名
   **/
  customKeyName?: string;
  /**
   * 自定义 treeData 中 title 的键名
   **/
  customTitleName?: string;
  /**
   * 自定义 treeData 中 children 的键名
   **/
  customChildrenName?: string;
  /** 树节点 Icon */
  icon?: React.ReactNode;
  /**
   * 树节点展开的 Icon
   * @typeText
   * React.ReactNode | ((props: ITreeNodeProps & ITreeNodeState) => React.ReactNode)
   */
  expandIcon?: ITreeIconType<T>;
  /**
   * 是否显示连接线
   * @default false
   **/
  showLine?: boolean;
  /**
   * 点击并展开
   * @default false
   **/
  expandOnClick?: boolean;
  /**
   * 点击并选中
   * @default false
   **/
  checkOnClick?: boolean;
  /**
   * 展开后才渲染子节点，树节点数量较大时请将此参数设为 `true`。
   * @default false
   **/
  renderAfterExpand?: boolean;
  /** 自定义子节点内容渲染（不包含展开 Icon、Checkbox 和 Icon） */
  renderNodeContent?: (props: ITreeNodeProps<T> & ITreeNodeState) => React.ReactNode;
  /** 自定义子节点右侧内容的渲染，通常是一些操作的行动点 */
  renderNodeRightArea?: (props: ITreeNodeProps<T> & ITreeNodeState) => React.ReactNode;
  /** 子节点 */
  children?: React.ReactNode;
  /** 节点点击 */
  onClick?: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  /** 节点双击 */
  onDoubleClick?: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  /** 鼠标进入节点 */
  onMouseEnter?: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  /** 鼠标离开节点 */
  onMouseLeave?: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;
  /** 节点右击 */
  onRightClick?: (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => void;

  /**
   * 禁用整个树
   * @default false
   **/
  disabled?: boolean;
  /**
   * 是否多选
   * @default false
   **/
  multiple?: boolean;
  /** 树节点数据 */
  data: Array<T>;
  /**
   * 禁用原生的 title，在自定义节点的 Tooltip 时可通过此属性禁用原生的 Title 属性
   * @default false
   */
  disableNativeTitle?: boolean;

  /**
   * 是否可选择
   * @default true
   **/
  selectable?: boolean;
  /** 选择的 Keys */
  selectedKeys?: ITreeNodeKey[];
  /**
   * 默认选择的 Keys
   * @default []
   **/
  defaultSelectedKeys?: ITreeNodeKey[];
  /** 选择的事件 */
  onSelect?: (selectedKeys: ITreeNodeKey[], info: ITreeSelectInfo<T>) => void;

  /** 展开的 Keys */
  expandedKeys?: ITreeNodeKey[];
  /**
   * 是否自动展开父节点
   * @default true
   **/
  autoExpandParent?: boolean;
  /**
   * 默认展开的 Keys
   * @default []
   **/
  defaultExpandedKeys?: ITreeNodeKey[];
  /**
   * 默认展开所有树节点
   * @default false
   **/
  defaultExpandAll?: boolean;
  /** 展开的事件 */
  onExpand?: (expandedKeys: ITreeNodeKey[], info: ITreeExpandInfo<T>) => void;

  /**
   * 节点前添加 Checkbox 复选框
   * @default false
   **/
  checkable?: boolean;
  /**
   * 非叶子节点是否可选中（仅 checkable 启用时有效，用于快速关闭非叶子节点的选中）
   * @default true
   */
  notLeafCheckable?: boolean;
  /** 选中的 Keys */
  checkedKeys?: ITreeCheckedKeys;
  /**
   * 默认选中的 Keys
   * @default []
   **/
  defaultCheckedKeys?: ITreeNodeKey[];
  /**
   * checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
   * @default false
   **/
  checkStrictly?: boolean;
  /** 选中的事件 */
  onCheck?: (checkedKeys: ITreeCheckedKeys, info: ITreeCheckInfo<T>) => void;

  /** 已经加载的 Keys */
  loadedKeys?: ITreeNodeKey[];
  /** 异步加载数据 */
  loadData?: (eventData: ITreeNodeEventData<T>) => Promise<void> | void;
  /** 节点加载完毕时触发 */
  onLoad?: (loadedKeys: ITreeNodeKey[], eventData: ITreeNodeEventData<T>) => void;

  /**
   * 是否支持拖拽
   * @default false
   **/
  draggable?: boolean;
  /** 开始拖拽时调用 */
  onDragStart?: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  /** dragenter 触发时调用 */
  onDragEnter?: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  /** dragover 触发时调用 */
  onDragOver?: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  /** dragleave 触发时调用 */
  onDragLeave?: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  /** dragend 触发时调用 */
  onDragEnd?: (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => void;
  /** drop 触发时调用 */
  onDrop?: (info: {
    event: React.DragEvent;
    node: ITreeNodeEventData<T>;
    dragNode: ITreeNodeEventData<T>;
    dragNodesKeys: ITreeNodeKey[];
    dropPosition: number;
    dropToGap: boolean;
  }) => void;
}

export type ITreeProps<T extends ITreeNodeData = ITreeNodeData> = ITreeBaseProps<T> &
  Omit<
    React.HTMLAttributes<HTMLUListElement>,
    | 'children'
    | 'onClick'
    | 'onDoubleClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onDrop'
    | 'onDragStart'
    | 'onDragEnter'
    | 'onDragOver'
    | 'onDragLeave'
    | 'onDragEnd'
    | 'onLoad'
    | 'onSelect'
  >;
