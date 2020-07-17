// copy from @types/react-transition-group/Transition
// change:
// EnterHandler 保持兼容
// add PureTransitionProps

import React from 'react';

export type EndHandler = (node: HTMLElement, done: () => void) => void;
export type EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;
export type ExitHandler = (node: HTMLElement) => void;

export const UNMOUNTED = 'unmounted';
export const EXITED = 'exited';
export const ENTERING = 'entering';
export const ENTERED = 'entered';
export const EXITING = 'exiting';

export interface TransitionActions {
  /**
   * 内部组件将在transtion加载后立即执行一次转换，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  appear?: boolean;

  /**
   * 是否开启进入转换(关闭后不进入entering状态，直接进入entered状态)
   * * 注意当 appear 为 true 时此设置不会生效
   *
   * 详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  enter?: boolean;

  /**
   * 是否开启退出转换，与enter相反，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  exit?: boolean;
}

export type TransitionStatus =
  | typeof ENTERING
  | typeof ENTERED
  | typeof EXITING
  | typeof EXITED
  | typeof UNMOUNTED;
export type TransitionChildren = React.ReactNode | ((status: TransitionStatus) => React.ReactNode);

export interface PureTransitionProps extends TransitionActions {
  /**
   * 触发进入或退出状态，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  in?: boolean;

  /**
   * 默认情况子组件与transtion组件一起加载(也就是说即使in属性为false，组件也会先以隐藏状态(exited)正常加载)，当mountOnEnter 为true时，会在第一次in属性为true时加载子组件，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  mountOnEnter?: boolean;

  /**
   * 在过渡结束后卸载组件, 测试发现这里确实卸载了子组件生成的dom节点，但是并不会触发 componentWillUnmount 钩子，在子组件重新进入entered状态时也不会重新触发componentDidMount等创建阶段钩子，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  unmountOnExit?: boolean;

  /**
   * 转换的持续时间，可以传入对象以更细粒度的控制动画持续时间, 如果未传入 addEndListener 属性，此项为必传字段，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  timeout: number | { appear?: number; enter?: number; exit?: number };

  /**
   * 用于手动触发动画结束状态的事件以允许你更细粒度的控制动画状态，传入改属性时，timeout属性扔作为后备属性生效，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  addEndListener?: EndHandler;

  /**
   * 进入 entering 状态之前触发的回调, 在第一次 mount 时会传入 isAppearing 判断是否开启 appear 选项，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  onEnter?: EnterHandler;

  /**
   * 进入entering状态后触发的回调（也就是开始调用entering后触发），详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  onEntering?: EnterHandler;

  /**
   * 进入entered状态后触发的回调，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  onEntered?: EnterHandler;

  /**
   * 在exit状态前触发的回调，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  onExit?: ExitHandler;

  /**
   * 在进入exiting状态后触发的回调，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  onExiting?: ExitHandler;

  /**
   * 在进入exited状态后触发的回调，详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  onExited?: ExitHandler;

  /**
   * 详见：[Transition 文档](https://reactcommunity.org/react-transition-group/transition)
   */
  children?: TransitionChildren;
}

export interface TransitionProps extends PureTransitionProps {
  [prop: string]: any;
}
