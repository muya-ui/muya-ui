import { CSSProperties, ReactNode } from 'react';

import { ITriggerProps } from '../Trigger';
import { ICustomStyleBaseProps, Omit } from '../types';

/**
 * @styles wrapper 容器
 * @styles titleWrapper 标题容器
 * @styles actionsWrapper 操作区容器
 * @styles contentWrapper 内容容器
 */
export type IPopoverCardStyleKeys =
  | 'wrapper'
  | 'titleWrapper'
  | 'actionsWrapper'
  | 'contentWrapper';

export interface IPopoverCardProps
  extends Omit<ITriggerProps, 'popup'>,
    ICustomStyleBaseProps<IPopoverCardStyleKeys> {
  /**
   * 卡片标题
   *
   * @type {React.ReactNode}
   * @memberof ITooltipProps
   */
  title?: ReactNode;
  /**
   * 卡片内容
   *
   * @type {ReactNode}
   * @memberof IPopoverCardProps
   */
  content?: ReactNode;
  /**
   * 卡片行动区域
   *
   * @type {ReactNode}
   * @memberof IPopoverCardProps
   */
  actions?: ReactNode;
  /**
   * 弹出层容器的样式
   *
   * @type {CSSProperties}
   * @memberof ITooltipProps
   */
  style?: CSSProperties;
  /**
   * 弹出层容器的class
   *
   * @type {string}
   * @memberof ITooltipProps
   */
  className?: string;
}
