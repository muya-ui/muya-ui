import React from 'react';

import { Omit } from '../types';
import { IPopperPlacement } from '../Popper';
import { ITooltipProps } from '../Tooltip';
import { ITypographyBaseProps } from '../Typography';

export interface IEllipsisContentProps extends ITypographyBaseProps {
  /**
   * 启用 tooltip
   * @default true
   */
  enableTooltip?: boolean;
  /**
   * 透传给 Tooltip 的 props
   */
  tooltipProps?: Omit<ITooltipProps, 'title' | 'children'>;
  /**
   * 弹出的位置
   */
  placement?: IPopperPlacement;
  /**
   * 子节点
   */
  children: React.ReactNode;
  /**
   * 透传给 Typograph 的样式对象
   */
  style?: React.CSSProperties;
  /**
   * 透传给 Typograph 的类名
   */
  className?: string;
  /**
   * 渲染的节点名
   */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}
