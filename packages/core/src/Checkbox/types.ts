import React, { RefObject } from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

/**
 * @styles wrapper checkbox 容器
 * @styles span span 容器
 * @styles iconWrap Icon 容器
 * @styles icon Icon
 */
export type ICheckboxStyleKeys = 'wrapper' | 'span' | 'iconWrap' | 'icon';

export interface ICheckboxBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<ICheckboxStyleKeys> {
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
   * 是否选中
   */
  checked?: boolean;
  /**
   * 默认是否选中
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否半选选中
   * @default false
   */
  indeterminate?: boolean;
  /**
   * checked改变事件
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
   * 点击事件
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * value，在CheckGroup中使用
   */
  value?: any;
  /**
   * 内部 input 的 ref
   */
  inputRef?: RefObject<HTMLInputElement>;
}

export type ICheckboxProps = ICheckboxBaseProps &
  Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onChange' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
  >;

/**
 * CheckboxGroup Value类型
 */
export type ICheckboxGroupValue = string | number | boolean;

/**
 * CheckboxGroup option
 */
export interface ICheckboxGroupOption extends Pick<ICheckboxBaseProps, 'width' | 'ellipsis'> {
  /**
   * 变化事件
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 需要显示的内容
   */
  label: React.ReactNode;
  /**
   * 某项的值
   */
  value: ICheckboxGroupValue;
  /**
   * 挂载自定义数据
   */
  data?: any;
}

export interface ICheckboxGroupBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<ICheckboxStyleKeys> {
  /** 透传 checkbox 的 ellipsis */
  checkboxEllipsis?: boolean;
  /** 透传 checkbox 的 width */
  checkboxWidth?: string | number;
  /**
   * 默认值
   */
  defaultValue?: ICheckboxGroupValue[];
  /**
   * 内容变化事件
   * @param checkedValue
   */
  onChange?: (checkedValue: ICheckboxGroupValue[]) => void;
  /**
   * Checkbox参数
   */
  options?: Array<ICheckboxGroupOption | string>;
  /**
   * 值
   * @default []
   */
  value?: ICheckboxGroupValue[];
  /**
   * 禁用整个 checkbox group
   */
  disabled?: boolean;
  /**
   * 自定义 checkbox 的渲染
   */
  renderCheckbox?: (
    checkboxNode: React.ReactElement,
    option: ICheckboxGroupOption,
    optionIndex: number,
  ) => React.ReactNode;
}

export type ICheckboxGroupProps = ICheckboxGroupBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>;
