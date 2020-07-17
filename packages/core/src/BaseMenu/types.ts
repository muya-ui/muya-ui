import React from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { ISizeSpecBaseProps } from '../types';

export interface IBaseMenuItemBaseProps extends ISizeSpecBaseProps {
  /**
   * item 的内容
   */
  children: React.ReactNode;
  /**
   * item 是否禁用
   */
  disabled?: boolean;
  /**
   * item 是否选中
   */
  selected?: boolean;
  /**
   * item 是否激活，配合键盘事件
   */
  active?: boolean;
  /**
   * item 是否加载中
   */
  loading?: boolean;
  /**
   * 加载的 icon
   */
  loadingIcon?: React.ReactNode;
  /**
   * 选中的 icon
   */
  selectedIcon?: React.ReactNode;
}

export type IBaseMenuItemProps = IBaseMenuItemBaseProps & React.HTMLAttributes<HTMLDivElement>;

export interface IBaseMenuItemGroupBaseProps {
  /**
   * item group 的内容
   */
  label: React.ReactNode;
  /**
   * item group 下的 item
   */
  children: React.ReactNode;
}

export type IBaseMenuItemGroupProps = IBaseMenuItemGroupBaseProps &
  React.HTMLAttributes<HTMLDivElement>;

export interface IBaseMenuBaseProps extends ISizeSpecBaseProps {
  /**
   * 菜单宽度
   */
  width?: number | Record<IComponentSizeSpec, number>;
  /**
   * item 超出多少滚动
   */
  maxItemCountPerPage?: number;
  /**
   * item 的内容
   */
  children: React.ReactElement[] | React.ReactElement;
  /**
   * 菜单滚动
   */
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

export type IBaseMenuProps = IBaseMenuBaseProps & React.HTMLAttributes<HTMLDivElement>;
