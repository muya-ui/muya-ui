import React, { Ref } from 'react';

import {
  ICommonTriggerProps,
  ICustomStyleBaseProps,
  IFormBaseProps,
  ILabeledValue,
  IPrefixSuffixNode,
  ISizeSpecBaseProps,
  Omit,
} from '../types';
import { ITagInputAddEvent } from '../Input/types';
import { IPopperPlacement } from '../Popper/types';
import { ITriggerContainerFunc } from '../Trigger/types';

/**
 * Select style keys
 * @styles menu 选项菜单容器
 * @styles menuGroup 菜单项组
 * @styles menuItem 选项菜单项
 * @styles menuDivider 选项菜单分割线
 * @styles inputWrapper 输入框容器
 * @styles input 输入框
 */
export type ISelectStyleKeys =
  | 'menu'
  | 'menuGroup'
  | 'menuItem'
  | 'menuDivider'
  | 'inputWrapper'
  | 'input';

export type ISelectMode = 'default' | 'tags' | 'multiple';

export type ISelectSingleValueType = string | number | ILabeledValue;

export type ISelectMultiValueType = Array<ISelectSingleValueType>;

export type ISelectValueType = ISelectSingleValueType | ISelectMultiValueType | undefined;

export type IFilterFunc = (inputValue: string, option: ISelectOptionState) => boolean;

/**
 * 选中可能通过：键盘、焦点、鼠标事件触发
 */
export type ISelectSelectTriggerEvent = React.FocusEvent | React.MouseEvent | React.KeyboardEvent;

/**
 * 取消选中可能通过：键盘、点击
 */
export type ISelectDeselectTriggerEvent = React.MouseEvent | React.KeyboardEvent;

export interface ISelectOptionState {
  label?: string | number;
  value: string | number;
  disabled?: boolean;
}

export type ISelectOptionsState = Record<string, ISelectOptionState>;

export interface IOptionProps {
  /**
   * 组名
   */
  label?: string;
  /**
   * 默认根据此属性值进行筛选
   */
  value: string | number;
  key?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 选中该 Option 后，Select 的 title
   */
  title?: string;
  /**
   * Option 器类名
   */
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface IOptionGroupProps {
  /**
   * 组名
   */
  label: string;
  key?: string;
  /**
   * Option 器类名
   */
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactElement | React.ReactElement[];
}

export type IOptionDividerProps = React.HTMLAttributes<HTMLDivElement>;

export type IOptionElement = React.ReactElement<
  IOptionProps | IOptionGroupProps | IOptionDividerProps
>;

export type IOptionElements = Array<IOptionElement>;

export interface ISelectBaseProps
  extends IFormBaseProps<ISelectValueType>,
    ISizeSpecBaseProps,
    IPrefixSuffixNode,
    ICustomStyleBaseProps<ISelectStyleKeys>,
    ICommonTriggerProps {
  /** popup 相关属性 */
  popupVisible?: boolean;
  /**
   * popup 弹出位置
   * @default 'bottom-start'
   */
  placement?: IPopperPlacement;
  /** popup 延迟关闭 */
  leaveDelay?: number;
  /**
   * 每页最大的 item 数量
   * @default 6.5
   */
  maxItemCountPerPage?: number;
  /** 菜单绑定的节点 */
  getPopupContainer?: ITriggerContainerFunc;
  /** 点击外部触发的事件 */
  onClickAway?: (e: React.MouseEvent) => void;
  /** 菜单打开关闭的回调 */
  onPopupVisibleChange?: (open: boolean) => void;
  /** 菜单滚动事件 */
  onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
  /** 清除按钮点击回调 */
  onClear?: React.MouseEventHandler;
  /** 选中的回调 */
  onSelect?: (value: ISelectOptionState) => void;
  /** 取消选中的回调 */
  onDeselect?: (option: ISelectOptionState, selectedIndex: number) => void;

  /** Tag 相关属性 */
  /** tag 最大数量 */
  maxTagCount?: number;
  /** tag 文案最大长度 */
  maxTagTextLength?: number;
  /**
   * 垂直方向最多几行 tag
   * @default 2.5
   */
  maxVerticalTagCount?: number;
  /** tag 最大宽度  */
  maxTagWidth?: number;

  /** 搜索相关属性 */
  /** 搜索无结果展示 */
  notFoundContent?: React.ReactElement;
  /**
   * 是否展示搜索框
   * @default false
   */
  showSearch?: boolean;
  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 全量 loading，loadingIcon 会整体替换 options，false 时 loadingIcon 会插到 options 下方
   * @default true
   */
  loadingAll?: boolean;
  /**
   * 自定义过滤规则或者禁用过滤规则
   * @default true
   */
  filterOption?: boolean | IFilterFunc;
  /** 搜索的回调 */
  onSearch?: (value: string) => void;
  /**
   * 是否保留搜索选中项
   * @default true
   */
  reservedSearchResult?: boolean;

  /** 展示相关属性 */
  /** 选择器下拉 icon */
  expandIcon?: React.ReactNode;
  /** 选择器加载 icon */
  loadingIcon?: React.ReactNode;
  /** 选择器选中 icon */
  selectedIcon?: React.ReactNode;

  /** 其他 */
  id?: string;
  /**
   * label 放入 value 中返回
   * @default false
   */
  labelInValue?: boolean;
  /**
   * 选择器模式
   * @default 'default'
   */
  mode?: ISelectMode;
  /**
   * 子节点
   * @typeText
   */
  children: IOptionElement | IOptionElements;
  /** 面板宽度 */
  width?: number | string;
  /** 覆盖默认的控制节点 */
  getInputElement?: () => React.ReactElement;
  /** 选中值改变的回调 */
  onChange?: (value: ISelectValueType) => void;
  /**
   * 回填
   * @default false
   */
  backfill?: boolean;
  /**
   * 隐藏展开 icon
   * @default false
   */
  hideExpandIcon?: boolean;
  /**
   * 是否默认选中第一个 option
   * @default false
   */
  defaultActiveFirstOption?: boolean;
  /**
   * select 内部 input 的 ref
   */
  inputRef?: Ref<HTMLInputElement>;
}

export type ISelectProps = ISelectBaseProps &
  Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'defaultValue' | 'onSelect' | 'onChange'
  >;

export interface ISelectInputBaseProps
  extends IFormBaseProps<ISelectValueType>,
    ISizeSpecBaseProps,
    IPrefixSuffixNode,
    ICustomStyleBaseProps<ISelectStyleKeys> {
  id?: string;
  /** Form 相关属性 */
  /** 占位文案 */
  placeholder: string;

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
  value: ISelectMultiValueType;
  /** 所有的 options */
  allOptions: ISelectOptionsState;
  /** 是否多选 */
  isMultiple: boolean;
  /** 是否有选中值 */
  hasValue: boolean;
  /** 是否为搜索模式 */
  isSearchMode: boolean;

  /** 回调 */
  /** 清除按钮点击回调 */
  onClear: React.MouseEventHandler;
  /** 选择回调 */
  onSelect: (
    value: ISelectOptionState,
    popupVisible: boolean,
    e?: ISelectSelectTriggerEvent,
  ) => void;
  /** 取消选择回调 */
  onDeselect: (
    option: ISelectOptionState,
    selectedIndex: number,
    e?: ISelectDeselectTriggerEvent,
  ) => void;
  /** 输入框输入事件 */
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 输入框聚焦事件 */
  onInputChange: (value: string) => void;
  /** 添加 tag */
  onAddTag: (value: string, e: ITagInputAddEvent) => void;

  /** 其他 */
  /** 模式 */
  mode: ISelectMode;
  /** 传入和输出是否为 labelInValue */
  labelInValue: boolean;
  /** 选择器宽度 */
  width?: number | string;
  /** 覆盖默认的控制节点 */
  getInputElement?: () => React.ReactElement;
  /** 回填 */
  backfill: boolean;
  /** 隐藏展开按钮 */
  hideExpandIcon: boolean;
  /**
   * select 内部 input 的 ref
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

export type ISelectInputProps = ISelectInputBaseProps &
  Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onSelect' | 'onInput' | 'onChange' | 'value' | 'defaultValue' | 'size'
  >;
