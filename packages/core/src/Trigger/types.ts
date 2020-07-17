import React, { ReactElement } from 'react';

import { TransitionProps } from 'react-transition-group/Transition';

import { IPopperPlacement } from '../Popper';
import { ICommonTriggerProps, IReactElementWithRef } from '../types';

export type ITriggerAction = 'hover' | 'click' | 'focus';
export type ITriggerContainerFunc = (triggerNode: Element) => React.ReactInstance;

export interface ITriggerArrowStyle extends React.CSSProperties {
  /**
   * 箭头宽度
   *
   * @type {number}
   * @memberof ITriggerArrowStyle
   */
  width?: number;
  /**
   * 箭头高度
   *
   * @type {number}
   * @memberof ITriggerArrowStyle
   */
  height?: number;
  /**
   * 箭头的颜色
   *
   * @type {string}
   * @memberof ITriggerArrowStyle
   */
  color?: string;
  /**
   * 箭头距离边缘的距离
   *
   * @type {number}
   * @memberof ITriggerArrowStyle
   */
  margin?: number;
}

export interface ITriggerProps extends ICommonTriggerProps {
  /** 子节点 */
  children: IReactElementWithRef;
  /**
   * 离开事件延迟
   * @default 0
   */
  leaveDelay?: number;
  /**
   * 进入事件延迟
   * @default 0
   */
  enterDelay?: number;
  /**
   * 触发的行为
   * @typeText Array<'hover' | 'click' | 'focus'>
   **/
  triggerActions?: Array<ITriggerAction>;
  /**
   * 触发的行为，优先级低于 triggerActions
   **/
  triggerAction?: ITriggerAction;
  /** 透传给子元素的 id */
  id?: string;
  /**
   * 默认打开与否
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * 是否打开，外部传入的话是受控组件
   * @default false
   */
  open?: boolean;
  /**
   * 打开的位置
   * @default 'bottom'
   */
  placement?: IPopperPlacement;
  /**
   * 自定义箭头大小、颜色
   * @default {}
   */
  arrowStyle?: ITriggerArrowStyle;
  /**
   * 隐藏箭头
   * @default false
   */
  hideArrow?: boolean;
  /** 弹出层距离触发元素的偏移值 */
  offset?: number;
  /**
   * 过渡组件
   * @default Animation.Slide
   */
  TransitionComponent?: React.ComponentType<any>;
  /** 过渡组件的参数 */
  transitionProps?: Partial<TransitionProps>;
  /** 展开的节点 */
  popup: ReactElement;
  /** 绑定的容器 */
  container?: React.ReactInstance | ITriggerContainerFunc;
  /** 是否允许点击外部关闭，只在激活了 click 触发时生效 */
  outsideCloseable?: boolean;
  /**
   * 是否允许按下Esc键关闭，只在激活了 hover 或者 click 时生效
   *
   * @type {boolean}
   * @memberof ITriggerProps
   * @default true
   */
  escapeKeyCloseable?: boolean;
  /** 打开的回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 点击外部触发的事件 */
  onClickAway?: (e: React.MouseEvent) => void;
  /** 按下Esc键触发的事件 */
  onEscapeKeyDown?: (e: React.KeyboardEvent) => void;
  /** 内部Popper弹出层节点的ref */
  popperNodeRef?: React.Ref<HTMLDivElement>;
  /**
   * 禁用Trigger交互逻辑，disabled会透传到子元素上
   * @type {boolean}
   * @memberof ITriggerProps
   */
  disabled?: boolean;
}
