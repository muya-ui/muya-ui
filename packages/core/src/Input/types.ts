import React, { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

import {
  ICustomStyleBaseProps,
  ILabeledValue,
  IPrefixSuffixNode,
  ISizeSpecBaseProps,
  Omit,
} from '../types';

export interface IInputBaseProps extends IPrefixSuffixNode, ISizeSpecBaseProps {
  /**
   * 禁用组件
   *
   * @type {boolean}
   * @memberof IInputProps
   */
  disabled?: boolean;
  /**
   * input当前状态
   *
   * @type {('loading' | 'success' | 'error')}
   * @memberof IInputProps
   */
  status?: 'loading' | 'success' | 'error';
  /**
   * 展示清除input按钮
   *
   * @type {boolean}
   * @memberof IInputProps
   */
  allowClear?: boolean;
  /**
   * 此项设置为 true 时，clear 替换最后一个节点
   *
   * @type {boolean}
   * @memberof IInputProps
   */
  clearReplace?: boolean;
  /**
   * 清空输入框的时候，是否聚焦输入框
   *
   * @type {boolean}
   * @memberof IInuptBaseProps
   * @default true
   */
  focusWhenClear?: boolean;
  /**
   * status存在时，是否显示反馈图标
   *
   * @type {boolean}
   * @default true
   * @memberof IInuptBaseProps
   */
  hasFeedback?: boolean;
  /**
   * 获取内部Input的ref
   *
   * @type {(Ref<HTMLInputElement | HTMLTextAreaElement>)}
   * @memberof IInuptBaseProps
   */
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * 组件的宽，数字会默认加上 px
   *
   * @type {string | number}
   * @memberof IInuptBaseProps
   */
  width?: string | number;
  /**
   * 组件的高度，数字会默认加上 px
   *
   * @type {string | number}
   * @memberof IInuptBaseProps
   */
  height?: string | number;
}

/**
 * Input style keys
 * @styles inputWrapper Input外层容器
 * @styles statusWrapper 状态图标容器
 * @styles clearWrapper 清除按钮容器
 * @styles nodeWrapper suffixNode、prefixNode的节点容器
 * @styles nodeDivider suffixNode、prefixNode节点间的分隔符
 * @styles input input节点
 */
export type IInputOnlyInputStyleKeys =
  | 'inputWrapper'
  | 'statusWrapper'
  | 'clearWrapper'
  | 'nodeWrapper'
  | 'nodeDivider'
  | 'input';

/**
 * Input style keys
 * @styles textareaWrapper 多行模式下，Textarea外层容器
 * @styles textarea textarea节点
 * @styles textLimitWrapper 开启limit字数限制时，limit文本的包裹容器
 * @styles textLimit limit文本节点
 */
export type IInputStyleKeys =
  | 'textareaWrapper'
  | 'textarea'
  | 'textLimitWrapper'
  | 'textLimit'
  | IInputOnlyInputStyleKeys;
export interface IInputPureProps extends IInputBaseProps, ICustomStyleBaseProps<IInputStyleKeys> {
  /**
   * 自定义多行输入模式下，textarea的resize行为
   *
   * @type {CSSProperties['resize']}
   * @memberof IInputProps
   */
  resize?: CSSProperties['resize'];
  /**
   * 输入框的值
   *
   * @type {string}
   * @memberof IInputProps
   */
  value?: string;
  /**
   * 输入框默认值
   *
   * @type {string}
   * @memberof IInputProps
   * @default ''
   */
  defaultValue?: string;
  /**
   *  输入框的字数限制
   *
   * @type {number}
   * @memberof IInputProps
   */
  limit?: number;
  /**
   * 是否为多行输入框
   *
   * @type {boolean}
   * @memberof IInputProps
   */
  multiline?: boolean;
  /**
   * 多行模式下，textarea高度是否自适应
   *
   * @type {boolean}
   * @memberof IInputProps
   */
  autosize?: boolean;
  /**
   * 多行模式下，最大行数
   *
   * @type {number}
   * @memberof IInputPureProps
   */
  maxRows?: number;
  /**
   * 多行模式下，最小行数
   *
   * @type {number}
   * @memberof IInputPureProps
   */
  minRows?: number;
  /**
   * 按下回车键的事件
   *
   * @memberof IInputPureProps
   */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /**
   * clear 按钮点击事件
   */
  onClear?: React.MouseEventHandler<HTMLElement>;
}

export type IInputProps = IInputPureProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    | 'size'
    | 'onClick'
    | 'onMouseLeave'
    | 'onMouseEnter'
    | 'value'
    | 'defaultValue'
    | 'width'
    | 'height'
  > &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onMouseEnter' | 'onMouseLeave'>;

export interface IRangeInputChangeEvent {
  /** 变化的值 */
  value: [string, string];
}

export type IRangeInputInnerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'size'
  | 'onClick'
  | 'value'
  | 'defaultValue'
  | 'placeholder'
  | 'onClick'
  | 'onMouseLeave'
  | 'onMouseEnter'
>;

/**
 * Input style keys
 * @styles inputWrapper Input外层容器
 * @styles clearWrapper 清除按钮容器
 * @styles headInput 第一个input
 * @styles tailInput 第二个input
 * @styles nodeWrapper suffixNode、prefixNode的节点容器
 * @styles nodeDivider suffixNode、prefixNode节点间的分隔符
 */
export type IRangeInputStyleKeys =
  | 'inputWrapper'
  | 'clearWrapper'
  | 'headInput'
  | 'tailInput'
  | 'nodeWrapper'
  | 'nodeDivider';

export interface IRangeInputPureProps
  extends IInputBaseProps,
    ICustomStyleBaseProps<IRangeInputStyleKeys> {
  /**
   * RangeInput的值，必须是长度为2的字符串数组
   */
  value?: string[];
  /**
   * RangeInput的默认值，必须是长度为2的字符串数组
   */
  defaultValue?: string[];
  /**
   * RangeInput的placeholder，必须是长度为2的字符串数组
   * @default []
   */
  placeholder?: string[];
  /**
   * 插在中间的节点
   */
  middleNode?: ReactNode;
  /**
   * 内部两个input节点的props
   * @typeText
   * Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onClick' | 'value' | 'defaultValue' | 'placeholder' | 'onClick' | 'onMouseLeave' | 'onMouseEnter'>
   */
  inputProps?: IRangeInputInnerProps;
  /**
   * 变化事件
   */
  onChange?(event: IRangeInputChangeEvent): void;
  /**
   * 键盘 enter 事件
   */
  onPressEnter?(event: IRangeInputChangeEvent): void;
  /**
   * 键盘 enter 事件
   */
  onClear?(event: IRangeInputChangeEvent): void;
}

export interface IRangeInputBaseElement {
  /** input focus */
  focus(position: 0 | 1, option?: FocusOptions): void;
  /** input blur */
  blur(position: 0 | 1): void;
}

export type IRangeInputElement = IRangeInputBaseElement & Omit<HTMLDivElement, 'focus' | 'blur'>;

export type IRangeInputProps = IRangeInputPureProps &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'onKeyDown'> &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue' | 'placeholder' | 'onKeyDown'
  >;

/**
 * @styles inputWrapper 最外层容器
 * @styles contentWrapper 内容（tags+input）容器
 * @styles tagsWrapper tags 的容器
 * @styles input input节点
 * @styles tag tag节点
 */
export type ITagsInputStyleKeys =
  | 'inputWrapper'
  | 'contentWrapper'
  | 'tagsWrapper'
  | 'input'
  | 'tag';

export type IInputTagValue = string | number | ILabeledValue;

export type ITagsInputValue = Array<IInputTagValue>;

export type ITagInputAddEvent = React.KeyboardEvent | React.FocusEvent;

export type ITagInputRemoveEvent = React.KeyboardEvent | React.MouseEvent;

export interface ITagsInputBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<ITagsInputStyleKeys> {
  /**
   * 禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 展示清除input按钮
   * @default false
   */
  allowClear?: boolean;
  /**
   * 自动聚焦
   * @default false
   */
  autoFocus?: boolean;
  /**
   * tag 数据（受控）
   */
  value?: ITagsInputValue;
  /**
   * tag 默认数据（非受控）
   * @default []
   */
  defaultValue?: ITagsInputValue;
  /**
   * input 数据（受控）
   */
  inputValue?: string;
  /**
   * input 默认数据（非受控）
   * @default ''
   */
  defaultInputValue?: string;
  /**
   * input 后缀节点
   */
  suffixNode?: React.ReactNode;
  /**
   * 是否允许回车添加标签
   * @default false
   */
  allowAdd?: boolean;
  /**
   * 自定义清空的 icon
   */
  clearIcon?: React.ReactNode;
  /**
   * tag 最多的行数
   * @default 2.5
   */
  maxVerticalTagCount?: number;
  /**
   * tag 最长文案
   */
  maxTagTextLength?: number;
  /**
   * tag 最大长度
   */
  maxTagWidth?: number;
  /**
   * input 宽度
   */
  width?: number | string;
  /**
   * 获取 tag 展示的内容
   * @default (value: IInputTagValue) => string | number
   */
  getTagText?: (value: IInputTagValue) => React.ReactNode;
  /**
   * 添加标签时触发
   */
  onAddTag?: (value: string, e: ITagInputAddEvent) => void;
  /**
   * 删除标签时触发
   */
  onRemoveTag?: (value: IInputTagValue, index: number, e: ITagInputRemoveEvent) => void;
  /**
   * input 内容变化时触发
   */
  onInputChange?: (value: string) => void;
  /**
   * input 键盘事件
   */
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * 点击清空按钮时触发
   */
  onClear?: React.MouseEventHandler;
  /**
   * input 输入时触发
   */
  onInput?: React.FormEventHandler<HTMLInputElement>;
  /**
   * tag 改变时触发
   */
  onChange?: (value: ITagsInputValue) => void;
  /**
   * input 点击触发
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 鼠标进入 input 触发
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 鼠标离开 input 触发
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 获取内部Input的ref
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * input当前状态
   */
  status?: 'loading' | 'success' | 'error';
  /**
   * 是否要在 useEffect 中滚动到顶部，与下拉搭配时需要
   * @default false
   */
  scrollTopAfterEffect?: boolean;
}

export type ITagsInputProps = ITagsInputBaseProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'value'
    | 'defaultValue'
    | 'onInput'
    | 'onChange'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onClick'
  >;
