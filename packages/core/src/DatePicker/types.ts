import { ConfigType, Dayjs } from 'dayjs';
import React from 'react';

import {
  ICalendarPureProps,
  ICalendarUIChangeEvent,
  IRangeCalendarChangeEvent,
  IRangeCalendarPureProps,
  IRangeCalendarUIChangeEvent,
} from '../Calendar/types';
import {
  IInputOnlyInputStyleKeys,
  IInputPureProps,
  IRangeInputPureProps,
  IRangeInputStyleKeys,
} from '../Input/types';
import { ITriggerProps } from '../Trigger/types';
import { ICommonTriggerProps, ICustomStyleBaseProps, Omit } from '../types';

type IPropsFromCalendar = Omit<
  ICalendarPureProps,
  'defaultDate' | 'styles' | 'onChange' | 'onUIChange' | 'allowClear'
>;

/**
 * DatePicker style keys
 *
 * @styles popPanel 弹出的面板容器
 */
export type IDatePickerStyleKeys =
  // timepicker 本身的
  | 'popPanel'

  // input 里的 styles
  | IInputOnlyInputStyleKeys;

/**
 * RangeDatePicker style keys
 *
 * @styles popPanel 弹出的面板容器
 */
export type IRangeDatePickerStyleKeys =
  // timepicker 本身的
  | 'popPanel'

  // range input 里的 styles
  | IRangeInputStyleKeys;

export interface IDatePickerBaseProps extends ICommonTriggerProps {
  /**
   * 日期格式化的字符串，参考 https://github.com/iamkun/dayjs
   * 默认值随 `selectType` 变化
   *  * `selectType === 'date'` format 为 `YYYY-MM-DD`
   *  * `selectType === 'month'` format 为 `YYYY-MM`
   *  * `selectType === 'year'` format 为 `YYYY`
   */
  format?: string | ((date: Dayjs) => string);
  /**
   * 日期的位置
   * @default 'bottom-start'
   */
  placement?: ITriggerProps['placement'];
  /** 日期面板的显示/隐藏 */
  popupOpen?: boolean;
  /**
   * 日历组件的样式重置，详见 [日历样式重置](../components/calendar#styles)
   */
  calendarStyles?: ICalendarPureProps['styles'];
  /**
   * input 输入框 debounce 延时触发日历面板的UI同步
   * @default 200
   */
  inputDelay?: number;
  /**
   * 是否允许清空选择的日期
   * @default true
   */
  allowClear?: boolean;
}

export interface IDatePickerUIChangeEvent extends ICalendarUIChangeEvent {
  /** 面板是否显示 */
  popupOpen: boolean;
}

type IPropsFromInput = Omit<
  IInputPureProps,
  | 'defaultValue'
  | 'value'
  | 'limit'
  | 'multiline'
  | 'autosize'
  | 'allowClear'
  | 'maxRows'
  | 'minRows'
  | 'focusWhenClear'
  | 'styles'
>;

export interface IDatePickerPureProps
  extends IDatePickerBaseProps,
    ICustomStyleBaseProps<IDatePickerStyleKeys>,
    IPropsFromInput,
    IPropsFromCalendar {
  /** DatePicker 的值 */
  value?: ConfigType;
  /** DatePicker 的默认值 */
  defaultValue?: ConfigType;
  /**
   * 已废弃，请使用 `defaultViewDate`
   * @deprecated
   */
  defaultDate?: ConfigType;

  /** UI的状态变化，包括面板的翻页、切换、展开收起 */
  onUIChange?: (event: IDatePickerUIChangeEvent) => void;
  /** DatePicker 变化的值，注意 value === '' 时，date.isValid() === false */
  onChange?: (date: Dayjs) => void;
  /** 同 onChange 一样，多传了一个 string */
  onDateChange?: (value: string, date: Dayjs) => void;
  /**
   * Calender的 onChange 透传
   */
  onCalendarChange?: (date?: Dayjs) => void;
}

export type IDatePickerProps = IDatePickerPureProps &
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

export interface IRangeDatePickerUIChangeEvent extends IRangeCalendarUIChangeEvent {
  /** 面板是否显示 */
  popupOpen: boolean;
}

type IPropsFromRangeCalendar = Omit<
  IRangeCalendarPureProps,
  'defaultRange' | 'styles' | 'onChange' | 'onUIChange' | 'allowClear'
>;

type IPropsFromRangeInput = Omit<
  IRangeInputPureProps,
  | 'value'
  | 'suffixNode'
  | 'allowClear'
  | 'clearReplace'
  | 'onChange'
  | 'focusWhenClear'
  | 'defaultValue'
  | 'styles'
>;
export interface IRangeDatePickerPureProps
  extends IDatePickerBaseProps,
    ICustomStyleBaseProps<IRangeDatePickerStyleKeys>,
    IPropsFromRangeCalendar,
    IPropsFromRangeInput {
  /**
   * 已废弃，请使用 `defaultViewDate`
   * @deprecated
   */
  defaultRange?: ConfigType[];
  /**
   * RangeDatePicker 的值
   */
  value?: ConfigType[];
  /**
   * RangeDatePicker 的默认值
   */
  defaultValue?: ConfigType[];
  /** UI的状态变化，包括面板的翻页、切换、展开收起 */
  onUIChange?: (event: IRangeDatePickerUIChangeEvent) => void;
  /**
   * 注意当 value === ['', ''] 时，range[0 | 1].isValid() === false
   */
  onChange?: (range: [Dayjs, Dayjs]) => void;
  /** 同 onChange 一样，多传了一个 [string, string] */
  onDateChange?: (value: [string, string], range: [Dayjs, Dayjs]) => void;
  /** RangeCalendar 的 onChange 透传 */
  onCalendarChange?: (state: IRangeCalendarChangeEvent) => void;
}

export type IRangeDatePickerProps = IRangeDatePickerPureProps &
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'width' | 'height'> &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onSelect' | 'defaultValue' | 'placeholder'
  >;
