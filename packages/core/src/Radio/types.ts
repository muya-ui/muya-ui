import React from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

/**
 * @styles wrapper 容器
 * @styles inputRadio 内部的 input
 * @styles innerRadio 内部的radio
 * @styles text 文本
 */
export type IRadioStyleKeys = 'wrapper' | 'inputRadio' | 'innerRadio' | 'text';
/**
 * Base Props
 */
export interface IRadioPureProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IRadioStyleKeys> {
  /**
   * 设置自动溢出省略
   * @default false
   */
  ellipsis?: boolean;
  /** 容器宽度 */
  width?: string | number;
  /**
   * 是否默认聚焦
   * @default false
   */
  autoFocus?: boolean;
  /**
   * 占满容器宽度
   */
  // block?: boolean;
  /**
   * 指定当前是否选中, 受控用法
   */
  checked?: boolean;
  /**
   * 子节点
   */
  children?: React.ReactNode;
  /**
   * 初始是否选中
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * checked 改变事件
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 鼠标进入事件
   */
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  /**
   * 鼠标移出事件
   */
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  /**
   * 鼠标移出事件
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 根据 value 进行比较，判断是否选中
   */
  value?: any;
  /**
   * 内部 input 的 ref
   */
  inputRef?: React.RefObject<HTMLInputElement>;
}

export type IRadioProps = IRadioPureProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange' | 'onMouseEnter' | 'onMouseLeave' | 'value' | 'onClick'
  >;

export type IRadioGroupValue = string | number | null;

export interface IRadioGroupOption extends Pick<IRadioPureProps, 'width' | 'ellipsis'> {
  /**
   * 变化事件
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 该项内容
   */
  label: React.ReactNode;
  /**
   * 该项的值
   */
  value: IRadioGroupValue;
  /**
   * 挂载自定义数据
   */
  data?: any;
}

export interface IRadioGroupPureProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IRadioStyleKeys> {
  /** 透传 radio 的 ellipsis */
  radioEllipsis?: boolean;
  /** 透传 radio 的 width */
  radioWidth?: string | number;
  /**
   * 默认值
   * @default null
   */
  defaultValue?: IRadioGroupValue;
  /**
   * 是否整体禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 变化事件
   * @param checkedValue
   */
  onChange?: (checkedValue: IRadioGroupValue) => void;
  /**
   * RadioGroup 具体参数
   */
  options?: Array<IRadioGroupOption | string>;
  /**
   * 当前选中值
   */
  value?: IRadioGroupValue;
  /**
   * 自定义 radio 的渲染
   * @default (radioNode: React.ReactElement) => React.ReactElement
   */
  renderRadio?: (
    radioNode: React.ReactElement,
    option: IRadioGroupOption,
    optionIndex: number,
  ) => React.ReactNode;
}

export type IRadioGroupProps = IRadioGroupPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'>;
