import React from 'react';

import { ICustomStyleBaseProps, IPrefixSuffixNode, ISizeSpecBaseProps, Omit } from '../types';

/**
 * @ignore
 */
export type IButtonNode = HTMLButtonElement | HTMLAnchorElement;

/**
 * @styles suffix 后缀节点
 * @styles prefix 前缀节点
 */
export type IButtonStyleKeys = 'prefix' | 'suffix';

/**
 * @ignore
 */
export type IButtonType =
  | 'primary'
  | 'strong'
  | 'normal'
  | 'secondary'
  | 'weak'
  | 'danger'
  | 'success'
  | 'warning';

export interface IButtonBaseProps
  extends ISizeSpecBaseProps,
    IPrefixSuffixNode,
    ICustomStyleBaseProps<IButtonStyleKeys> {
  /**
   * Button 的类型
   * * `primary`: 主要
   * * `strong`: 强化
   * * `normal`: 默认
   * * `secondary`: 次要
   * * `weak`: 弱化
   * * `danger`: 危险
   * * `success`: 成功
   * * `warning`: 警告
   * @default 'normal'
   */
  type?: IButtonType;
  /**
   * 加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 按钮原生类型
   * @default 'button'
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * 按钮不可用
   * @default false
   */
  disabled?: boolean;
  /**
   * 按钮暂时不可用
   * @default false
   */
  busy?: boolean;
  /**
   * 文字粗细控制
   * @default false
   * @deprecated
   */
  textFine?: boolean;
  /**
   * 按钮文字的 font-weight 设置
   * @default 'normal'
   */
  fontWeight?: 'normal' | 'lighter';
  /**
   * styled-components 中 as 的别名，改变基础节点
   * @default 'button'
   */
  component?: 'button' | 'a' | 'span';
  /**
   * 重置一下 onClick
   * @default -
   */
  onClick?: React.MouseEventHandler<IButtonNode>;
  /**
   * 按钮宽度快捷设置
   * @default -
   */
  width?: number | string;
  /**
   * 禁用并排按钮默认设置的左边距
   * @default false
   */
  disableSiblingMargin?: boolean;
}

/**
 * 按钮基础的Props
 */
export interface IButtonPureProps extends IButtonBaseProps {
  /**
   * 按钮形状
   * @default 'normal'
   */
  shape?: 'circle' | 'round' | 'square' | 'normal';
  /**
   * 线框，需要注意的是，当 `type=normal`时，默认为 `true`
   * @default false
   */
  plain?: boolean;
  /**
   * 按钮占满容器宽度
   * @default false
   */
  block?: boolean;
  /**
   * 在Group中的类型，一般不需要手动设置，
   * 会根据这个属性设置按钮的 border-radius
   * @default -
   */
  groupType?: 'head' | 'tail' | 'group';
  /**
   * 当 ButtonGroup 存在混用的时候，border需要特殊处理，一般不需要手动设置，
   * 会根据这个属性设置按钮的 border-width
   * @default -
   */
  offBorder?: 'right' | 'left' | 'both' | 'no';

  /**
   * 快捷设置
   *
   * * `selected === true && !type` 设置 `type = 'primary'`，
   * * `selected === false && !type` 设置 `type = 'secondary'`，
   * * `selected === undefined` 什么也不做，
   *
   * > 特殊点：在 ButtonGroup 中 selected 会设置 z-index
   * @default false
   */
  selected?: boolean;
}

export interface IInlineButtonPureProps extends IButtonBaseProps {
  /**
   * 去掉 hover click 状态变化
   * @default false
   */
  constant?: boolean;
  /**
   * 弱化等级
   * @default -
   */
  weakLevel?: 1 | 2;
}

export interface IMaskButtonPureProps extends Omit<IButtonBaseProps, 'type'> {
  /**
   * 按钮形状
   * @default 'normal'
   */
  shape?: IButtonPureProps['shape'];
  /**
   * 是否占满容器
   * @default false
   */
  block?: IButtonPureProps['block'];
}

type OmitForButton = 'type' | 'disabled' | 'onClick';
type IButtonTypeFn<P> = P &
  Omit<React.ButtonHTMLAttributes<IButtonNode>, OmitForButton> &
  Omit<React.AnchorHTMLAttributes<IButtonNode>, OmitForButton>;

export type IButtonProps = IButtonTypeFn<IButtonPureProps>;

export type IButtonCoreWithNativeProps = IButtonTypeFn<IButtonBaseProps>;

export type IInlineButtonProps = IButtonTypeFn<IInlineButtonPureProps>;

export type IMaskButtonProps = IButtonTypeFn<IMaskButtonPureProps>;

export type IButtonGroupProps = Omit<IButtonPureProps, 'groupType' | 'component'> &
  React.HTMLAttributes<HTMLDivElement>;
