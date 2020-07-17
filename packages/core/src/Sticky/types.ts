import React from 'react';
import { ICustomStyleBaseProps } from '../types';

/**
 * Step style keys
 * @styles sticky 固定节点
 */
export type IStickyStyleKeys = 'sticky';

export interface IStickyPureProps extends ICustomStyleBaseProps<IStickyStyleKeys> {
  /**
   * 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
   *
   * @default () => window
   * @memberof IStickyPureProps
   */
  target?: () => HTMLElement;
  /**
   * 距离窗口顶部达到指定偏移量后触发
   *
   * @memberof IStickyPureProps
   */
  offsetTop?: number;
  /**
   * 固定状态改变时触发的回调函数
   *
   * @memberof IStickyPureProps
   */
  onStatusChange?: (fixed: boolean) => void;
}

export type IStickyProps = IStickyPureProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'target'>;
export type ScrollElement = HTMLElement | Window;
