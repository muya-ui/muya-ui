import React from 'react';

import { IAnimationBaseProps } from '../Animation/types';
import { ICustomStyleBaseProps, ISizeSpecBaseProps } from '../types';

/**
 * Alert style keys
 * @styles wrapper Alert 外部容器
 * @styles container Alert 居中容器
 * @styles icon Icon 节点
 * @styles title 标题节点
 * @styles desc 描述节点
 * @styles close 关闭 Icon 节点
 */
export type IAlertStyleKeys = 'wrapper' | 'container' | 'icon' | 'title' | 'desc' | 'close';

type PropsFromAnimation = Pick<IAnimationBaseProps, 'appear' | 'timeout'>;

export interface IAlertPureProps
  extends ICustomStyleBaseProps<IAlertStyleKeys>,
    PropsFromAnimation {
  /**
   * 显示关闭按钮
   * @default false
   */
  showClose?: boolean;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 描述
   */
  description?: React.ReactNode;
  /**
   * 显示图标
   * @default true
   */
  showIcon?: boolean;
  /**
   * 类型
   * success-成功 error-失败 warning-警告 info-提示
   * @default 'info'
   */
  type?: 'success' | 'error' | 'warning' | 'info';
  /**
   * 显示与否，注意传了这个值 Alert 就变成受控组件了
   * @default true
   */
  visible?: boolean;
  /**
   * 点击关闭后的回调
   */
  onClose?: () => void;
  /**
   * children 当成是 title 使用
   */
  childrenAsTitle?: boolean;
  /**
   * 过渡组件
   * @default Animation.Collapse
   **/
  TransitionComponent?: React.ComponentType<any>;
}

export type IAlertProps = IAlertPureProps &
  ISizeSpecBaseProps &
  React.HTMLAttributes<HTMLDivElement>;
