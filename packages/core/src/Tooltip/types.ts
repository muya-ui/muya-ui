import React, { CSSProperties } from 'react';

import { ITriggerProps } from '../Trigger';
import { ISizeSpecBaseProps, Omit } from '../types';

export interface ITooltipProps extends Omit<ITriggerProps, 'popup'>, ISizeSpecBaseProps {
  /**
   * tooltip的内容，如果传 null 或空字符串，将不渲染 Tooltip。
   *
   * @type {React.ReactNode}
   * @memberof ITooltipProps
   */
  title: React.ReactNode;
  /**
   * tooltip容器的样式
   *
   * @type {CSSProperties}
   * @memberof ITooltipProps
   */
  style?: CSSProperties;
  /**
   * tooltip容器的class
   *
   * @type {string}
   * @memberof ITooltipProps
   */
  className?: string;
}
