import React from 'react';

import { ICustomStyleBaseProps, Omit } from '../types';

export interface ISwipeStep {
  key: number;
  offset: number;
}

export type ISwipeDirection = 'horizontal' | 'vertical';

export type ISwipeTransitionStatus = 'on' | 'off';

/**
 * Swipe 的控制器，支持控制 item 和 step 的跳转偏移
 */
export interface IBaseSwipeManager {
  /** 当前所在 item 的索引 */
  readonly itemIndex: number;
  /** item 可以移动的数量 */
  readonly itemSize: number;
  /** 当前所在页的索引 */
  readonly index: number;
  /** 总页数 */
  readonly size: number;
  /** 相对容器的偏移量 */
  readonly offset: number;
  /** 移动方向 */
  readonly direction: ISwipeDirection;
  /** 跳到上一页 */
  prev(): void;
  /** 跳到下一页 */
  next(): void;
  /** 跳到指定页 */
  goTo(index: number): void;
  /** 是否有指定索引的页 */
  hasStep(index: number): boolean;
  /** 获取指定 item 的偏移 */
  getStepOffset(index: number): number;
  /** 跳到上一 item */
  prevItem(): void;
  /** 跳到下一 item */
  nextItem(): void;
  /** 跳到指定 item */
  goToItem(itemIndex: number): void;
  /** 是否有指定索引的 item */
  hasItem(itemIndex: number): boolean;
  /** 获取指定 item 的偏移 */
  getItemOffset(itemIndex: number): number;
  /** 更新偏移值 */
  updateOffset(offset: number): void;
}

export interface ISwipeManager extends IBaseSwipeManager {
  /** 是否有下一页 */
  readonly hasNext: boolean;
  /** 是否有上一页 */
  readonly hasPrev: boolean;
  /** 是否有下一个 item */
  readonly hasNextItem: boolean;
  /** 是否有上一个 item */
  readonly hasPrevItem: boolean;
  /** 最大偏移值 */
  readonly maxOffset: number;
  /** 获取指定 item 所在的 step */
  getItemStep(itemIndex: number): number;
}

export interface ILoopSwipeManager extends IBaseSwipeManager {
  /** 当前所在 item 的真正索引 */
  readonly realItemIndex: number;
  /** 真正的 item 数量 */
  readonly realItemSize: number;
  /** 锁定的状态 */
  readonly locked: boolean;
  /** 锁定滚动 */
  lock(): void;
  /** 解锁滚动 */
  unlock(): void;
}

export interface ILoopSwipeHookState {
  /** 当前所在的 item 的索引 */
  itemIndex: number;
  /** item 可以移动的数量 */
  itemSize: number;
  /** 当前所在页的索引 */
  stepIndex: number;
  /** 总页数 */
  stepSize: number;
  /** 是否循环，当排不满容器时不循环 */
  loop: boolean;
  /** 轮播的动画状态 */
  transitionStatus?: ISwipeTransitionStatus;
  /** Swipe 控制实例 */
  manager?: ILoopSwipeManager;
  /** 跳到前一个 item */
  onItemPrev(): void;
  /** 跳到后一个 item */
  onItemNext(): void;
  /** 跳转到指定索引的 item */
  onItemGoTo(itemIndex: number): void;
  /** 往前翻页 */
  onPrev(): void;
  /** 往后翻页 */
  onNext(): void;
  /** 跳转到指定索引页 */
  onGoTo(index: number): void;
  /** 当 step 的信息发生变化的时候调用 */
  onStepsChange(manager?: ILoopSwipeManager): void;
}

export interface ISwipeHookState
  extends Omit<ILoopSwipeHookState, 'manager' | 'loop' | 'onStepsChange'> {
  /** 是否有下一页 */
  hasNext: boolean;
  /** 是否有上一页 */
  hasPrev: boolean;
  /** 是否有下一个 item */
  hasNextItem: boolean;
  /** 是否有上一个 item */
  hasPrevItem: boolean;
  /** 偏移量 */
  offset?: number;
  /** 分步控制实例 */
  manager?: ISwipeManager;
  /** 鼠标滚轮控制Swipe */
  onWheel: React.WheelEventHandler<HTMLDivElement>;
  /** 启用滚轮 */
  onWheelActive(): void;
  /** 禁用滚轮 */
  onWheelDisable(): void;
  /** 当 Swipe 的信息发生变化的时候调用 */
  onStepsChange(manager?: ISwipeManager): void;
  /** 指定 item 所在的 step */
  getItemStep(itemIndex?: number): number;
}

export interface ISwipeBaseProps extends ICustomStyleBaseProps<'panel'> {
  /**
   * 切换的方向
   * @default 'horizontal'
   */
  direction?: ISwipeDirection;
  /** 当前 item 的索引 */
  itemIndex?: number;
  /** 当前分页的索引 */
  stepIndex?: number;
  /** 根据默认的项的位置计算默认所在的页 */
  defaultIndex?: number;
  /** 轮播的动画状态 */
  transitionStatus?: ISwipeTransitionStatus;
  /** 等分数量 */
  equalNum?: number;
  /** 间距 */
  gutter?: number;
  /** 动画时长，单位 ms */
  duration?: number;
  /**
   * 是否开启检查子节点变更
   * 开启了以后要注意，传到 Swipe 中的 children 需使用 React.useMemo 包裹
   */
  enableDiffChildren?: boolean;
}

export interface ISwipePureProps extends ISwipeBaseProps {
  /**
   * 具体的偏移值
   */
  offset?: number;
  /**
   * 当容器发生变化时触发分页信息的改动
   * @param manager
   */
  onStepsChange?(manager: ISwipeManager): void;
}

export interface ILoopSwipePureProps extends ISwipeBaseProps {
  onStepsChange?(manager: ILoopSwipeManager): void;
}

export type ISwipeProps = ISwipePureProps & React.HTMLAttributes<HTMLDivElement>;
export type ILoopSwipeProps = ILoopSwipePureProps & React.HTMLAttributes<HTMLDivElement>;
