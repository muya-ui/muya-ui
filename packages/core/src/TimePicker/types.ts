import { ConfigType, Dayjs } from 'dayjs';

import React from 'react';

import { ICommonTriggerProps, ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';
import { ICalendarOption } from '../Calendar/types';
import { IInputPureProps } from '../Input/types';
import { IPopperPlacement } from '../Popper/types';

/**
 * TimePickerPanel style keys
 *
 * @styles hourCol 时 的列
 * @styles minuteCol 分 的列
 * @styles secondCol 秒 的列
 *
 * @styles colLabel 时分秒的顶部标签
 * @styles colItem 每一个时间选项的容器节点
 * @styles colItemBlock 每一个时间选项的节点
 * @styles colItemSelected 每一个时间选项的节点并选中
 * @styles colItemDisabled 每一个时间选项的节点并禁用
 */
export type ITimePickerPanelStyleKeys =
  // panel 里用的 styles
  | 'hourCol'
  | 'minuteCol'
  | 'secondCol'

  // panel 的 col 里的项
  | 'colLabel'
  | 'colItem'
  | 'colItemBlock'
  | 'colItemSelected'
  | 'colItemDisabled';

/**
 * TimePicker style keys
 *
 * @styles popPanel 弹出的面板容器
 * @styles panel 面板
 * @styles footer 快捷选项容器
 * @styles footerOption 快捷选项
 *
 * @styles inputWrapper Input外层容器
 * @styles statusWrapper 状态图标容器
 * @styles clearWrapper 清除按钮容器
 * @styles nodeWrapper suffixNode、prefixNode的节点容器
 * @styles nodeDivider suffixNode、prefixNode节点间的分隔符
 * @styles input input节点
 */
export type ITimePickerStyleKeys =
  // timepicker 本身的
  | 'popPanel'
  | 'panel'
  | 'footer'
  | 'footerOption'

  // panel
  | ITimePickerPanelStyleKeys

  // input 里的 styles
  | 'inputWrapper'
  | 'statusWrapper'
  | 'clearWrapper'
  | 'nodeWrapper'
  | 'nodeDivider'
  | 'input';

export interface ITimePickerPanelPureProps extends ICustomStyleBaseProps<ITimePickerStyleKeys> {
  /**
   * 小时的间隔设置
   * @default 1
   */
  hourStep?: number;
  /**
   * 分钟的间隔设置
   * @default 1
   */
  minuteStep?: number;
  /**
   * 秒的间隔设置
   * @default 1
   */
  secondStep?: number;

  /** 值 */
  value?: ConfigType;
  /** 默认值 */
  defaultValue?: ConfigType;
  /**
   * 格式化
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 时间选项的行数
   */
  rowNum?: number;
  /**
   * 一开始进入的时候，如果有值，滚动的方式
   * @default 'auto' 直接移动
   */
  defaultScrollBehavior?: 'auto' | 'smooth';

  /** 禁用小时 */
  disabledHours?: (num: number) => boolean;
  /** 根据选中的小时，禁用分钟， selectedHour === -1 表示没有小时没有选中值 */
  disabledMinutes?: (selectedHour: number) => (num: number) => boolean;
  /** 根据选中的小时和分钟，禁用秒， selectedMinute === -1 表示没有分钟没有选中值 */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => (num: number) => boolean;
  /** 是否隐藏 disabled 的选项 */
  hideDisabledOptions?: boolean;
  /** 值变化，受控使用 */
  onChange?: (time: Dayjs) => void;
  // allowEmpty?: boolean;
}

export type ITimePickerPanelProps = ITimePickerPanelPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

type IPropsFromInput = Omit<
  IInputPureProps,
  | 'styles'
  | 'defaultValue'
  | 'value'
  | 'limit'
  | 'multiline'
  | 'autosize'
  | 'allowClear'
  | 'maxRows'
  | 'minRows'
  | 'focusWhenClear'
  | 'resize'
>;

type IPropsFromPanel = Omit<ITimePickerPanelPureProps, 'styles'>;

export interface ITimePickerUIChangeEvent {
  /** 面板是否显示 */
  popupOpen: boolean;
}

export interface ITimePickerPureProps
  extends ISizeSpecBaseProps,
    ICommonTriggerProps,
    ICustomStyleBaseProps<ITimePickerStyleKeys>,
    IPropsFromPanel,
    IPropsFromInput {
  /**
   * 是否允许清空
   * @default true
   */
  allowClear?: boolean;
  /**
   * input 输入框 debounce 延时触发日历面板的UI同步
   * @default 200
   */
  inputDelay?: number;
  /** 时间的快捷选项 */
  options?: ICalendarOption[];
  /** 下拉面板的展开、收起 */
  popupOpen?: boolean;
  /**
   * 日期的位置
   * @default 'bottom'
   */
  placement?: IPopperPlacement;

  /** UI 变化，面板展开、收起 */
  onUIChange?: (e: ITimePickerUIChangeEvent) => void;
}

export type ITimePickerProps = ITimePickerPureProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'onClick'
    | 'onMouseLeave'
    | 'onMouseEnter'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onSelect'
  >;
