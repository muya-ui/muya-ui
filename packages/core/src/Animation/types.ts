import { TransitionTimingFunctionProperty } from 'csstype';
import React from 'react';

import { ITheme } from '@muya-ui/theme-light';

import { IReactElementWithRef, Omit } from '../types';
import { PureTransitionProps, TransitionStatus } from './innerTypes';

export interface IAnimationBaseParams {
  /** 动画时间 */
  timeout: number;
  /** 动画过渡曲线 */
  easing?: TransitionTimingFunctionProperty;
  /** 动画样式 */
  style?: React.CSSProperties;
  /** 主题 */
  theme: ITheme;
}

export interface IAnimationBaseHooks {
  /** 在 exit 前的钩子 */
  beforeExit?(node: HTMLElement, props: IAnimationBaseParams): void;
  /** 在 enter 前的钩子 */
  beforeEnter?(node: HTMLElement, props: IAnimationBaseParams): void;
}

/**
 * 动画组件的通用 Props
 * @include
 */
export interface IAnimationBaseProps
  extends Omit<PureTransitionProps, 'timeout'>,
    IAnimationBaseHooks {
  /** 包裹的节点 */
  children: IReactElementWithRef;
  /**
   * 动画时间
   * @default 'theme.transiton.spec.duration.normal'
   **/
  timeout?: number;
  /**
   * 动画过渡曲线
   * @default 'theme.transiton.pattern.easing.status'
   */
  easing?: TransitionTimingFunctionProperty;
  /** 样式 */
  style?: React.CSSProperties;
  /** 创建样式的函数 */
  makeStyles?(state: TransitionStatus, props: IAnimationBaseParams): React.CSSProperties;
}

export type ISlideAnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface ICollapseAnimationProps extends IAnimationBaseProps {
  /**
   * 设置收起动画可以达到的最小高度，默认为0，即完全折叠
   *
   * @default 0
   * @type {number}
   * @memberof ICollapseAnimationProps
   */
  minHeight?: number;
}
export interface ISlideAnimationProps extends IAnimationBaseProps {
  /**
   * slide 进入的方向
   * @default 'up'
   **/
  direction?: ISlideAnimationDirection;
  /**
   * 最小的缩放比例
   * @default 0.8
   * @type {number}
   * @memberof ISlideAnimationProps
   */
  minScale?: number;
}
