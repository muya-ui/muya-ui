import React from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/**
 * Step style keys
 * @styles content 内容节点
 * @styles circle 标题前的圆形容器
 * @styles title 标题
 * @styles progressLine 进度线条
 * @styles descriptionWrapper 描述区域容器节点
 * @styles text 描述文本
 */
export type IStepStyleKeys =
  | 'content'
  | 'circle'
  | 'title'
  | 'progressLine'
  | 'descriptionWrapper'
  | 'text';

export interface IStepsPureProps extends ISizeSpecBaseProps {
  /**
   * 步骤变化的回调函数
   *
   * @memberof IStepsPureProps
   */
  onChange?: (current: number) => void;
  /**
   * 当前步骤
   *
   * @default 0
   * @type {number}
   * @memberof IStepsPureProps
   */
  current?: number;
  /**
   * Steps子元素，必须为Step组件的数组
   *
   * @type {React.ReactElement[]}
   * @memberof IStepsPureProps
   */
  children: React.ReactElement[];
  /**
   * 指定当前步骤的状态
   *
   * @default 'process'
   * @type {StepStatus}
   * @memberof IStepsPureProps
   */
  status?: StepStatus;
}

export type IStepsProps = IStepsPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'>;

export interface IStepPureProps extends ICustomStyleBaseProps<IStepStyleKeys> {
  /**
   * 步骤标题
   *
   * @type {React.ReactNode}
   * @memberof IStepPureProps
   */
  title?: React.ReactNode;
  /**
   * 步骤描述
   *
   * @type {React.ReactNode}
   * @memberof IStepPureProps
   */
  description?: React.ReactNode;
  /**
   * 步骤状态。 Steps会自动分配状态，单独传入可以覆盖
   *
   * @type {StepStatus}
   * @memberof IStepPureProps
   */
  status?: StepStatus;
  /**
   * 步骤编号，一般不用填
   *
   * @type {number}
   * @memberof IStepPureProps
   * @default 0
   */
  stepNumber?: number;
  /**
   * 点击步骤事件
   *
   * @memberof IStepPureProps
   */
  onStepClick?: (next: number) => void;
  /**
   * 自定义步骤图标
   *
   * @type {React.ReactNode}
   * @memberof IStepPureProps
   */
  icon?: React.ReactNode;
}

export type IStepProps = IStepPureProps &
  ISizeSpecBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;
