import React from 'react';

import { IBackgroundColor } from '@muya-ui/theme-light';

export interface IBackgroundPureProps {
  /**
   * 支持通用背景的几种模式
   * @default 'global'
   */
  type?: keyof IBackgroundColor;
  /**
   * 节点设置
   * @default 'div'
   */
  component?: 'div' | 'span';
  /** css display */
  display?: 'block' | 'flex' | 'inline-block' | 'inline-flex' | React.CSSProperties['display'];
  /**
   * 设置具体的背景色，酌情使用
   */
  backgroundColor?: string;
  /**
   * 文字颜色，酌情使用
   */
  color?: string;
  /** 宽 */
  width?: string | number;
  /** 高 */
  height?: string | number;
}

export type IBackgroundProps = IBackgroundPureProps &
  React.HTMLAttributes<HTMLDivElement | HTMLSpanElement>;
