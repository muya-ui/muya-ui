import React from 'react';

import { IInputTagValue, ITagInputRemoveEvent } from '../Input/types';
import {
  ICommonTriggerProps,
  ICustomStyleBaseProps,
  IFormBaseProps,
  IPrefixSuffixNode,
  ISizeSpecBaseProps,
  Omit,
} from '../types';
import { ITriggerContainerFunc } from '../Trigger/types';

export type ICascaderExpandTrigger = 'click' | 'hover';
export type ICascaderPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
/**
 * Cascader style keys
 * @styles inputWrapper 输入框容器
 * @styles panel 菜单面板
 * @styles menuBox 菜单滚动容器
 * @styles menu 菜单
 * @styles menuItem 菜单项
 */
export type ICascaderStyleKeys = 'inputWrapper' | 'panel' | 'menuBox' | 'menu' | 'menuItem';

export type ICascaderValueType = string | number;

export type ICascaderDisplayRender = (
  label: ICascaderValueType[],
  selectedOptions?: ICascaderOptionType[],
) => string;

export interface ICascaderDataEntity {
  index: number;
  key: ICascaderValueType;
  pos: string;
  node: ICascaderOptionType;
  keyPath: ICascaderValueType[];
  parent?: ICascaderDataEntity;
  children?: ICascaderDataEntity[];
  level: number;
}

export interface IFieldNamesType {
  label?: string;
  value?: string;
  children?: string;
  isLeaf?: string;
}

export interface IFilledFieldNamesType {
  value: string;
  label: string;
  children: string;
  isLeaf: string;
}

export interface ICascaderOptionType {
  /**
   * 选项值
   */
  value?: ICascaderValueType;
  /**
   * 选项 label，不传则取 value
   */
  label?: string;
  /**
   * 选项禁用
   */
  disabled?: boolean;
  /**
   * 是否叶子，配合 loadData 使用
   */
  isLeaf?: boolean;
  /**
   * 是否加载中（下个版本将移除）
   * @deprecated
   */
  loading?: boolean;
  /**
   * 子节点
   */
  children?: Array<ICascaderOptionType>;
  /**
   * 自定义参数
   **/
  [customProp: string]: any;
}

export interface IFieldNamesType {
  label?: string;
  value?: string;
  children?: string;
}

export interface IFilledFieldNamesType {
  value: string;
  label: string;
  children: string;
}

export interface ICascaderBaseProps
  extends IFormBaseProps<ICascaderValueType[] | ICascaderValueType[][]>,
    ICommonTriggerProps,
    ISizeSpecBaseProps,
    ICustomStyleBaseProps<ICascaderStyleKeys> {
  /**
   * 在 children 前增加节点
   */
  prefixNode?: React.ReactNode;
  /**
   * 开启多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 多选模式下，节点选择完全受控（父子节点选中状态不再关联）
   * @default false
   */
  checkStrictly?: boolean;
  /**
   * 选项
   */
  options: Array<ICascaderOptionType>;
  /**
   * 外部控制是否弹出
   */
  popupVisible?: boolean;
  /**
   * 自定义 options 中 label name children 的字段
   * @default { label: 'label', value: 'value', children: 'children' }
   */
  fieldNames?: IFieldNamesType;
  /**
   * 变更的回调
   */
  onChange?: (
    value: ICascaderValueType[] | ICascaderValueType[][],
    selectedOptions: ICascaderOptionType[] | ICascaderOptionType[][],
  ) => void;
  /**
   * 已经加载的 Keys
   **/
  loadedKeys?: ICascaderValueType[];
  /**
   * 异步加载数据
   */
  loadData?: (activeOptions: ICascaderOptionType[]) => Promise<void> | void;
  /**
   * 节点加载完毕时触发
   **/
  onLoad?: (loadedKeys: ICascaderValueType[]) => void;

  /**
   * input 宽度
   */
  inputWidth?: number | string;
  /**
   * input 展开的 icon
   */
  inputExpandIcon?: React.ReactNode;
  /**
   * 只显示一个 tag，其余的合并
   * @default false
   **/
  collapseTags?: boolean;
  /**
   * tag 最大数量
   **/
  maxTagCount?: number;
  /**
   * tag 文案最大长度
   **/
  maxTagTextLength?: number;
  /**
   * 垂直方向最多几行 tag
   **/
  maxVerticalTagCount?: number;
  /**
   * tag 最大宽度
   **/
  maxTagWidth?: number;
  /**
   * input 节点的 ref
   */
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * 自定义展示
   * @default (labels: string[]) => labels.join('/')
   */
  displayRender?: ICascaderDisplayRender;
  /**
   * 键盘事件监听
   */
  onKeyDown?: (e: React.SyntheticEvent) => void;
  /**
   * 子节点
   */
  children?: React.ReactElement;
  /**
   * 每个级别的 menu 宽度
   */
  menusWidth?: number[] | number;
  /**
   * 点击即触发数据变更，默认需要选择叶子节点才触发
   * @default false
   */
  changeOnSelect?: boolean;
  /**
   * 菜单展开的 icon
   */
  expandIcon?: React.ReactNode;
  /**
   * 菜单加载的 icon
   */
  loadingIcon?: React.ReactNode;

  /**
   * 弹出位置
   * @default 'bottom-start'
   */
  placement?: ICascaderPlacement;
  /**
   * 触发展开的行为：hover 或 click
   * @default 'click'
   */
  expandTrigger?: ICascaderExpandTrigger;
  /**
   * 弹出变更的回调
   */
  onPopupVisibleChange?: (popupVisible: boolean) => void;
  /**
   * 下拉面板的绑定节点
   * @default () => document.body
   */
  getPopupContainer?: ITriggerContainerFunc;
}

export type ICascaderProps = ICascaderBaseProps &
  Omit<React.HTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onKeyDown' | 'onChange'>;

export interface ICascaderInputBaseProps
  extends IFormBaseProps<ICascaderValueType[] | ICascaderValueType[][]>,
    IPrefixSuffixNode,
    ISizeSpecBaseProps {
  /**
   * tag 最大数量
   **/
  maxTagTextLength?: number;
  /**
   * 垂直方向最多几行 tag
   **/
  maxVerticalTagCount: number;
  /**
   * tag 最大宽度
   **/
  maxTagWidth?: number;
  /**
   * 展开 icon
   **/
  expandIcon?: React.ReactNode;
  /**
   * 输入框值
   **/
  inputValue: string | string[];
  /**
   * 弹出状态
   **/
  popupVisible: boolean;
  /**
   * 是否多选
   **/
  multiple: boolean;
  /**
   * 自定义 options 中 label name children 的字段
   * @default { label: 'label', value: 'value', children: 'children' }
   */
  fieldNames: IFilledFieldNamesType;
  /**
   * 清除按钮点击回调
   **/
  onClear?: React.MouseEventHandler;
  /**
   * 输入框键盘事件
   **/
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * 移除 tag 事件
   */
  onRemoveTag: (value: IInputTagValue, index: number, e: ITagInputRemoveEvent) => void;
  /**
   * 选择器宽度
   **/
  width?: number | string;
  /**
   * select 内部 input 的 ref
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

export type ICascaderInputProps = ICascaderInputBaseProps &
  Omit<React.HTMLAttributes<HTMLInputElement>, 'onKeyDown' | 'onChange' | 'value' | 'defaultValue'>;

export interface ICascaderPanelProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<ICascaderStyleKeys> {
  /**
   * 多选的选中状态
   */
  checkedKeys: {
    checked: ICascaderValueType[];
    halfChecked: ICascaderValueType[];
  };
  /**
   * 加载中的 keys
   */
  loadingKeys: ICascaderValueType[];
  /**
   * 加载完成的 keys
   */
  loadedKeys: ICascaderValueType[];
  /**
   * 加载函数
   */
  onLoad: (targetValue: ICascaderValueType, activeOptions?: ICascaderOptionType[]) => Promise<void>;
  /**
   * 是否多选
   */
  multiple: boolean;
  /**
   * 激活项
   */
  activeValue: ICascaderValueType[];
  /**
   * 选项
   */
  options: Array<ICascaderOptionType>;
  /**
   * 自定义 options 中 label name children 的字段
   * @default { label: 'label', value: 'value', children: 'children' }
   */
  fieldNames: IFilledFieldNamesType;
  /**
   * 触发展开的方式
   */
  expandTrigger: ICascaderExpandTrigger;
  /**
   * 菜单是否可见
   * @default false
   */
  visible: boolean;
  /**
   * 展开的 icon
   */
  expandIcon?: React.ReactNode;
  /**
   * 加载的 icon
   */
  loadingIcon?: React.ReactNode;
  /**
   * 可配置的菜单宽度
   */
  menusWidth?: number[] | number;
  /**
   * 弹出位置
   * @default 'bottom-start'
   */
  placement: ICascaderPlacement;
  /**
   * menu 是否反向
   */
  menuReverse: boolean;
  /**
   * 选择的回调
   */
  onSelect: (
    targetOption: ICascaderOptionType,
    menuIndex: number,
    e: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
  ) => void;
  /** 取消选中的回调 */
  onDeselect: (
    targetOptions: ICascaderOptionType[],
    e: React.MouseEvent | React.ChangeEvent,
  ) => void;
}

export interface ICascaderMenuItemProps
  extends Pick<
    ICascaderPanelProps,
    | 'size'
    | 'expandTrigger'
    | 'checkedKeys'
    | 'fieldNames'
    | 'multiple'
    | 'expandIcon'
    | 'loadingIcon'
    | 'onSelect'
    | 'onDeselect'
    | 'placement'
  > {
  menuIndex: number;
  option: ICascaderOptionType;
  active: boolean;
  activeOptionsRef: React.MutableRefObject<HTMLLIElement[]>;
  loading: boolean;
  loaded: boolean;
  onLoad: (targetValue: ICascaderValueType, activeOptions?: ICascaderOptionType[]) => Promise<void>;
  className: string;
  style?: React.CSSProperties;
}
