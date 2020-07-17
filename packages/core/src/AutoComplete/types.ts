import React from 'react';

import {
  ICommonTriggerProps,
  ICustomStyleBaseProps,
  IFormBaseProps,
  ISizeSpecBaseProps,
  Omit,
} from '../types';
import { IPopperPlacement } from '../Popper/types';
import { IFilterFunc, ISelectOptionState, ISelectValueType } from '../Select/types';
import { ITriggerContainerFunc } from '../Trigger/types';

/**
 * AutoComplete style keys
 * @styles inputWrapper input 外部容器
 */
export type IAutoCompleteStyleKeys = 'inputWrapper';

export interface IAutoCompleteDataSourceObjItem {
  value: string;
  label: string;
}

export type IAutoCompleteDataSourceItem = string | IAutoCompleteDataSourceObjItem;

export interface IAutoCompletePureProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IAutoCompleteStyleKeys>,
    IFormBaseProps<ISelectValueType>,
    ICommonTriggerProps {
  /**
   * 选中后回填到输入框，默认会作为输入框的 placeholder
   * @default false
   */
  backfill?: boolean;
  /**
   * 默认选中第一项
   * @default true
   **/
  defaultActiveFirstOption?: boolean;
  /**
   * 子节点可以是 Option 或者 Input
   * @default <Input />
   */
  children?: React.ReactElement | React.ReactElement[];
  /**
   * 数据源
   */
  dataSource?: IAutoCompleteDataSourceItem[];
  /**
   * 是否加载中
   * @default false
   **/
  loading?: boolean;
  /**
   * 自定义过滤规则或者禁用过滤规则
   * @default true
   **/
  filterOption?: boolean | IFilterFunc;
  /**
   * 选择器下拉 icon
   **/
  expandIcon?: React.ReactNode;
  /**
   * 选择器清除 icon
   **/
  clearIcon?: React.ReactNode;
  /**
   * 选择器加载 icon
   **/
  loadingIcon?: React.ReactNode;
  /**
   * 选择器选中 icon
   **/
  selectedIcon?: React.ReactNode;
  /**
   * 输入框宽度
   **/
  width?: number | string;
  /**
   * popup 是否可见
   */
  popupVisible?: boolean;
  /**
   * popup 弹出位置
   * @default 'bottom'
   */
  placement?: IPopperPlacement;
  /**
   * popup 延迟关闭
   **/
  leaveDelay?: number;
  /**
   * 每页最大的 item 数量
   * @default 6.5
   **/
  maxItemCountPerPage?: number;
  /**
   * 下拉菜单自定义的 className
   **/
  menuNodeClassName?: string;
  /**
   * 无结果
   */
  notFoundContent?: React.ReactElement;
  /**
   * 在 children 前增加节点
   */
  prefixNode?: React.ReactNode;
  /**
   * 菜单绑定的节点
   * @default () => document.body
   **/
  getPopupContainer?: ITriggerContainerFunc;
  /**
   * 菜单打开关闭的回调
   **/
  onPopupVisibleChange?: (open: boolean) => void;
  /**
   * 菜单滚动事件
   **/
  onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
  /**
   * 选中的回调
   **/
  onSelect?: (value: ISelectOptionState) => void;
  /**
   * 搜索的回调
   **/
  onSearch?: (value: string) => void;
  /**
   * 选中值改变的回调
   **/
  onChange?: (value: string) => void;
}

export type IAutoCompleteProps = IAutoCompletePureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onSelect' | 'onChange'>;

export interface IAutoCompleteItemProps {
  /** 主要字段 */
  primary: string;
  /** 次要字段 */
  secondary: string;
}
