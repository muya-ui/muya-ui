import React from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps } from '../types';

/**
 *  Badge style keys
 * @styles container 外部容器
 * @styles badge 徽标自身
 */
export type IBadgeStyleKeys = 'container' | 'badge';

export interface IBadgePureProps extends ICustomStyleBaseProps<IBadgeStyleKeys> {
  /**
   * 是否是点型徽标
   * @default false
   */
  dot?: boolean;

  /**
   * 是否是描边线型
   * @default false
   */
  isStroke?: boolean;

  /**
   * 当前数字或文字
   */
  value?: number | string;

  /**
   * 最大显示数字
   * @default 99
   */
  max?: number;

  /**
   * 为零时是否展示
   * @default false
   */
  showZero?: boolean;

  /**
   * 是否位于元素右侧(分离)
   * @default false
   */
  detached?: boolean;

  /**
   * 徽标背景色
   */
  color?: string;

  /**
   * 子节点
   */
  children?: React.ReactNode;
}

export type IBadgeProps = IBadgePureProps &
  ISizeSpecBaseProps &
  React.HTMLAttributes<HTMLSpanElement>;
