import { IComponentSizeSpec, ITheme } from '@muya-ui/theme-light';

import { Modifiers } from 'popper.js';

import React from 'react';

import { IPopperProps } from '../Popper';

export interface IThemedBaseProps {
  /**
   * 主题
   * @default 默认为 'muya-theme-light'
   */
  theme: ITheme;
}

export interface ISizeSpecBaseProps {
  /**
   * 尺寸规格
   *
   * @default 'm'
   */
  size?: IComponentSizeSpec;
}

export interface IPrefixSuffixNode {
  /**
   * 在 children 前增加节点
   * @default -
   */
  prefixNode?: React.ReactNode;
  /**
   * 在 children 后增加节点
   * @default -
   */
  suffixNode?: React.ReactNode;
}

export type ICustomStylePropMap<T extends string> = Record<T, string | React.CSSProperties>;
export interface ICustomStyleItem {
  className: string;
  style?: React.CSSProperties;
}

export type ICustomStyleMap<T extends string> = Record<T, ICustomStyleItem>;

export interface ICustomStyleBaseProps<T extends string> {
  /**
   * 样式重置的Map
   */
  styles?: Partial<ICustomStylePropMap<T>>;
}

/**
 * 表单组件基础的 props，后续可以抽取为公共的
 */
export interface IFormBaseProps<T> {
  /**
   * 允许清除内容
   * @default false
   **/
  allowClear?: boolean;
  /**
   * 默认获取焦点
   * @default false
   **/
  autoFocus?: boolean;
  /** 默认值 */
  defaultValue?: T;
  /** 当前值 */
  value?: T;
  /**
   * 是否禁用
   * @default false
   **/
  disabled?: boolean;
  /**
   * 是否只读
   * @default false
   **/
  readOnly?: boolean;
  /** 占位文案  */
  placeholder?: string;
  /** 失焦事件 */
  onBlur?: React.FocusEventHandler;
  /** 获取焦点事件 */
  onFocus?: React.FocusEventHandler;
  /** 获取焦点事件 */
  onClick?: React.MouseEventHandler;
  /** 鼠标移入事件 */
  onMouseEnter?: React.MouseEventHandler;
  /** 鼠标移出事件 */
  onMouseLeave?: React.MouseEventHandler;
  /**
   * status存在时，是否显示反馈图标
   */
  hasFeedback?: boolean;
  /**
   * 控件当前状态
   */
  status?: 'loading' | 'success' | 'error';
}

/**
 * 支持 labelInValue 的表单组件通用的 value 类型
 */
export interface ILabeledValue {
  value: number | string;
  label?: React.ReactNode;
}
/**
 *
 * 兼容ts低于3.5的版本
 * Construct a type with the properties of T except for those in type K.
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export interface ICommonTriggerProps {
  /** trigger 本身的 id，将覆盖默认内部生成的 id */
  triggerId?: string;
  /**
   * 自定义 popper 参数
   */
  popperProps?: Partial<IPopperProps>;
  /**
   * 开启 flip 后，若当前方向空间不足，弹出层会自动调整方向。
   * - boolean 类型用于快速开启 flip 功能；
   * - Modifiers['flip'] 类型用于详细设置 flip 的行为，详见 [popper.js](https://popper.js.org/docs/v1/#modifiers..flip)。
   * @default true
   * @typeText boolean | Modifiers['flip']
   */
  flip?: boolean | Modifiers['flip'];
  /**
   * 箭头是否指向目标元素中心
   * @default false
   * @type {boolean}
   * @memberof ITriggerProps
   */
  arrowPointAtCenter?: boolean;
}

export type IReactElementWithRef<
  P = any,
  T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>,
  R = any
> = React.ReactElement<P, T> & { ref?: React.Ref<R> };
