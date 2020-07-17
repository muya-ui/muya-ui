import React from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

/**
 * Switch style keys
 * @styles loadingWrapper 加载的容器
 * @styles childrenWrapper 子节点容器
 */
export type ISwitchStyleKeys = 'loadingWrapper' | 'childrenWrapper';

export interface ISwitchBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<ISwitchStyleKeys> {
  /**
   * 禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 选中的子节点
   */
  checkedChildren?: React.ReactNode;
  /**
   * 未选中的子节点
   */
  unCheckedChildren?: React.ReactNode;
  /**
   * change 事件
   */
  onChange?: (checked: boolean, e: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * mouseUp 事件
   */
  onMouseUp?: React.MouseEventHandler;
  /**
   * click 事件
   */
  onClick?: (checked: boolean, e: React.MouseEvent) => void;
  /**
   * 选中状态
   */
  checked?: boolean;
  /**
   * 默认选中状态
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 是否自动获取焦点
   * @default false
   */
  autoFocus?: boolean;
  /**
   * 加载 Icon
   */
  loadingIcon?: React.ReactNode;
  /**
   * 加载状态
   */
  loading?: boolean;
}

export type ISwitchProps = ISwitchBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
