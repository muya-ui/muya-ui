import React from 'react';

import {
  ICommonTriggerProps,
  ICustomStyleBaseProps,
  ICustomStyleItem,
  IFormBaseProps,
  ILabeledValue,
  IReactElementWithRef,
  ISizeSpecBaseProps,
  Omit,
} from '../types';
import { ITagInputRemoveEvent } from '../Input/types';
import { IPopperPlacement } from '../Popper/types';
import { ITreeNodeDataEntity } from '../Tree/innerTypes';
import {
  ITreeCheckInfo,
  ITreeExpandInfo,
  ITreeIconType,
  ITreeNodeData,
  ITreeNodeEventData,
  ITreeNodeKey,
  ITreeNodeProps,
  ITreeNodeState,
  ITreeSelectInfo,
} from '../Tree/types';
import { ITriggerContainerFunc } from '../Trigger/types';

export type ITreeSelectSingleValueType = ITreeNodeKey | ILabeledValue;

export type ITreeSelectMultiValueType = Array<ITreeSelectSingleValueType>;

export type ITreeSelectValueType =
  | ITreeSelectSingleValueType
  | ITreeSelectMultiValueType
  | undefined;

/**
 * TreeSelect style keys
 * @styles inputWrapper 输入框容器
 * @styles popup 弹出节点
 * @styles scrollContainer 弹出滚动的容器
 */
export type ITreeSelectStyleKeys = 'inputWrapper' | 'popup' | 'scrollContainer';

export interface ITreeSelectBaseProps
  extends IFormBaseProps<ITreeSelectValueType>,
    ISizeSpecBaseProps,
    ICustomStyleBaseProps<ITreeSelectStyleKeys>,
    ICommonTriggerProps {
  /** popup 相关属性 */
  popupVisible?: boolean;
  /** popup 弹出位置 */
  placement?: IPopperPlacement;
  /** popup 延迟关闭 */
  leaveDelay?: number;
  /** 点击外部触发的事件 */
  onClickAway?: (e: React.MouseEvent) => void;
  /** 菜单绑定的节点 */
  getPopupContainer?: ITriggerContainerFunc;
  /** 菜单打开关闭的回调 */
  onPopupVisibleChange?: (open: boolean) => void;
  /** 清除按钮点击回调 */
  onClear?: React.MouseEventHandler;
  /** 选中的回调 */
  onSelect?: (selectedKeys: ITreeNodeKey[], info?: ITreeSelectInfo | ITreeCheckInfo) => void;
  /** 取消选中的回调 */
  onDeselect?: (selectedKeys: ITreeNodeKey[], info?: ITreeSelectInfo | ITreeCheckInfo) => void;
  /** 搜索的回调 */
  onSearch?: (value: string) => void;
  /** 是否加载中 */
  loading?: boolean;
  /** 搜索无结果展示 */
  notFoundContent?: React.ReactElement;
  /** tag 最大数量 */
  maxTagCount?: number;
  /** tag 文案最大长度 */
  maxTagTextLength?: number;
  /** 垂直方向最多几行 tag */
  maxVerticalTagCount?: number;
  /** tag 最大宽度  */
  maxTagWidth?: number;
  /**
   * 定义选中项回填的方式。默认全部显示，false 则只显示父节点
   * @default true
   */
  showAllChecked?: boolean;
  /**
   * 是否把每个选项的 label 包装到 value 中
   * @default false
   */
  labelInValue?: boolean;
  /**
   * 是否支持搜索框，多选默认开启。
   * @default false
   */
  showSearch?: boolean;
  /** 选择器下拉 icon */
  expandIcon?: React.ReactNode;
  /** 节点选中的 icon */
  selectedIcon?: React.ReactNode;
  /** 回填 */
  backfill?: boolean;
  /** 选择器宽度 */
  width?: number | string;
  /**
   * 在 children 前增加节点
   */
  prefixNode?: React.ReactNode;
  /**
   * select 内部 input 的 ref
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /** 树节点 Icon */
  treeIcon?: React.ReactNode;
  /**
   * 树节点展开的 Icon
   * @typeText React.ReactNode | ((props: ITreeNodeProps<T> & ITreeNodeState) => React.ReactNode)
   **/
  treeExpandIcon?: ITreeIconType;
  /**
   * 点击并展开
   * @default false
   **/
  treeExpandOnClick?: boolean;
  /**
   * 展开后才渲染子节点
   * @default false
   **/
  treeRenderAfterExpand?: boolean;
  /** 自定义子节点内容渲染 */
  treeRenderNodeContent?: (
    props: ITreeNodeProps & ITreeNodeState & { inputValue: string },
  ) => React.ReactNode;
  /**
   * 树溢出是否滚动，默认使用省略号
   * @default false
   */
  treeScrollable?: boolean;
  /** 子节点 */
  children?: IReactElementWithRef;

  /**
   * 是否多选，treeCheckable 时自动变为 `tree`
   * @default false
   **/
  multiple?: boolean;
  /** 树节点数据 */
  treeData: Array<ITreeNodeData>;
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
  /**
   * 按需筛选树节点，返回 true
   * @default (searchText: string, node: ITreeNodeData) => boolean
   * */
  filterTreeNode?: (searchText: string, node: ITreeNodeData) => boolean;

  /** 选择的 Keys */
  value?: ITreeSelectValueType;
  /**
   * 默认选择的 Keys
   * @default []
   **/
  defaultValue?: ITreeSelectValueType;
  /** 选择的事件 */
  onChange?: (selectedKeys: ITreeSelectValueType, info?: ITreeSelectInfo | ITreeCheckInfo) => void;

  /** 展开的 Keys */
  treeExpandedKeys?: ITreeNodeKey[];
  /**
   * 是否自动展开父节点
   * @default true
   **/
  treeAutoExpandParent?: boolean;
  /**
   * 默认展开的 Keys
   * @default []
   **/
  treeDefaultExpandedKeys?: ITreeNodeKey[];
  /**
   * 默认展开所有树节点
   * @default false
   **/
  treeDefaultExpandAll?: boolean;
  /** 展开的事件 */
  onTreeExpand?: (expandedKeys: ITreeNodeKey[], info: ITreeExpandInfo) => void;

  /**
   * 节点前添加 Checkbox 复选框
   * @default false
   **/
  treeCheckable?: boolean;
  /**
   * checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
   * @default false
   **/
  treeCheckStrictly?: boolean;

  /** 异步加载数据 */
  loadData?: (eventData: ITreeNodeEventData) => Promise<void> | void;
  /** 节点加载完毕时触发 */
  onLoad?: (loadedKeys: ITreeNodeKey[], eventData: ITreeNodeEventData) => void;
}

export type ITreeSelectProps = ITreeSelectBaseProps &
  Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onSelect' | 'onChange' | 'onLoad'
  >;

export interface ITreeSelectInputBaseProps
  extends IFormBaseProps<ITreeNodeKey[]>,
    ISizeSpecBaseProps {
  /** Tag 相关属性 */
  /** tag 最大数量 */
  maxTagTextLength?: number;
  /** 垂直方向最多几行 tag */
  maxVerticalTagCount: number;
  /** tag 最大宽度 */
  maxTagWidth?: number;

  /** 搜索相关属性 */
  /** 是否显示搜索框 */
  showSearch: boolean;
  /** 搜索回调 */
  onSearch?: (value: string) => void;

  /** icon 覆盖 */
  /** 展开 icon */
  expandIcon?: React.ReactNode;

  /** 状态和计算值 */
  /** 输入框值 */
  inputValue: string;
  /** 弹出状态 */
  popupVisible: boolean;
  /** 选中状态 */
  value: ITreeNodeKey[];
  /** 所有的  */
  treeKeyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity>;
  /** 是否多选 */
  multiple: boolean;
  /** 是否有选中值 */
  hasValue: boolean;
  /** 是否为搜索模式 */
  isSearchMode: boolean;

  /** 回调 */
  /** 清除按钮点击回调 */
  onClear?: React.MouseEventHandler;
  /** 输入框输入事件 */
  onInput?: React.FormEventHandler<HTMLInputElement>;
  /** 输入框聚焦事件 */
  onInputChange: (value: string) => void;
  /** 输入框聚焦事件 */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** 输入框失焦事件 */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** 输入框键盘事件 */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 取消选中的回调 */
  onDeselect: (deselectKey: ITreeNodeKey, e: ITagInputRemoveEvent) => void;

  /** 其他 */
  /** 传入和输出是否为 labelInValue */
  labelInValue: boolean;
  /** 选择器宽度 */
  width?: number | string;
  /** 回填 */
  backfill: boolean;
  /**
   * 在 children 前增加节点
   */
  prefixNode?: React.ReactNode;
  /**
   * select 内部 input 的 ref
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * input 容器的 StyleItem
   */
  wrapperStyleItem?: ICustomStyleItem;
}

export type ITreeSelectInputProps = ITreeSelectInputBaseProps &
  Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onSelect' | 'onInput' | 'onChange' | 'value' | 'defaultValue' | 'size'
  >;
