import React, { InputHTMLAttributes } from 'react';

import { ICustomStyleBaseProps, IPrefixSuffixNode, ISizeSpecBaseProps, Omit } from '../types';

/**
 * @styles inputWrapper input 容器
 * @styles input input 节点
 */
export type IInputNumberStyleKeys = 'inputWrapper' | 'input';

export interface IInputNumberBaseProps
  extends IPrefixSuffixNode,
    ISizeSpecBaseProps,
    ICustomStyleBaseProps<IInputNumberStyleKeys> {
  /**
   * 禁用组件
   *
   * @type {boolean}
   * @memberof IInputProps
   */
  disabled?: boolean;
  /**
   * 获取内部Input的ref
   *
   * @type {(Ref<HTMLInputElement>)}
   * @memberof IInuptBaseProps
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface IInputNumberPureProps extends IInputNumberBaseProps {
  /**
   * value of input
   *
   * @type {string}
   * @memberof IInputProps
   */
  value?: string | number;
  /**
   * defaultValue of input
   *
   * @type {string}
   * @memberof IInputProps
   */
  defaultValue?: string | number;
  /**
   * 变化事件
   * displayedValue 实时变化；formatterValue 为格式化后的值，只有当触发 onBlur 事件后才一定与 displayedValue 相符
   */
  onChange?: (displayedValue: string, formatterValue: number) => void;
  /**
   *  最小值
   *
   * @type {number}
   * @default -Infinity
   * @memberof IInputProps
   */
  min?: number;
  /**
   *  最大值
   *
   * @type {number}
   * @default Infinity
   * @memberof IInputProps
   */
  max?: number;
  /**
   *  数值精度
   *
   * @type {number}
   * @default 1
   * @memberof IInputProps
   */
  precision?: number;
  /**
   *  每次改变步数，可以为小数
   *
   * @type {number}
   * @default 1
   * @memberof IInputProps
   */
  step?: number;
  /**
   *  箭头图标大小
   *
   * @type {number}
   * @memberof IInputProps
   */
  iconSize?: number;
  /**
   *  是否常驻隐藏箭头按钮
   *
   * @type {boolean}
   * @default false
   * @memberof IInputProps
   */
  hiddenArrow?: boolean;
  /**
   * 按下回车键的事件
   *
   * @memberof IInputProps
   */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /**
   * onBlur 时不触发 onchange 事件
   *  @default false
   *
   * @memberof IInputProps
   */
  disableBlurFormat?: boolean;
}

export type IInputNumberProps = IInputNumberPureProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    | 'size'
    | 'onClick'
    | 'onMouseLeave'
    | 'onMouseEnter'
    | 'onChange'
    | 'value'
    | 'defaultValue'
    | 'min'
    | 'max'
  > &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onMouseEnter' | 'onMouseLeave'>;
