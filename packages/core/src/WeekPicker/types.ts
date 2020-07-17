import { ConfigType, Dayjs } from 'dayjs';

import { ICalendarPureProps, ICalendarUIChangeEvent } from '../Calendar/types';
import { IInputOnlyInputStyleKeys, IInputPureProps } from '../Input/types';
import { ITriggerProps } from '../Trigger/types';
import { ICommonTriggerProps, ICustomStyleBaseProps, Omit } from '../types';
import { IWeekCalendarPureProps } from './innerTypes';

export type IWeekPickerValue = [ConfigType, ConfigType] | ConfigType;

type IPropsFromCalendar = Omit<
  IWeekCalendarPureProps,
  'defaultWeek' | 'styles' | 'onChange' | 'onUIChange' | 'allowClear'
>;

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
  | 'readOnly'
>;
/**
 * ScrollView style keys
 *
 * @styles content 内容节点
 */
export type IWeekPickerStyleKeys =
  // weekpicker 本身的
  | 'popPanel'

  // input 里的 styles
  | IInputOnlyInputStyleKeys;

export interface IWeekPickerUIChangeEvent extends ICalendarUIChangeEvent {
  /** 面板是否显示 */
  popupOpen: boolean;
}

export interface IWeekPickerBaseProps
  extends ICustomStyleBaseProps<IWeekPickerStyleKeys>,
    IPropsFromInput,
    ICommonTriggerProps,
    IPropsFromCalendar {
  /**
   * 日期格式化，参考 https://github.com/iamkun/dayjs
   * @default 'YYYY-MM-DD'
   */
  format?: string | ((date: [Dayjs, Dayjs]) => string);
  /**
   * 日期格式化分割符
   * @default ' - '
   */
  formatSeparator?: string;
  /**
   * 日期的位置
   * @default 'bottom'
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
  // inputDelay?: number;
  /**
   * 是否允许清空选择的日期
   * @default true
   */
  allowClear?: boolean;

  /** WeekPicker 的值 */
  value?: IWeekPickerValue;
  /** WeekPicker 的默认值 */
  defaultValue?: IWeekPickerValue;

  /** UI的状态变化，包括面板的翻页、切换、展开收起 */
  onUIChange?: (event: IWeekPickerUIChangeEvent) => void;
  /** DatePicker 变化的值，注意 value === '' 时，date.isValid() === false */
  onChange?: (date: [Dayjs, Dayjs]) => void;
  /**
   * Calender的 onChange 透传
   */
  onCalendarChange?: (week?: [Dayjs, Dayjs]) => void;
}

export type IWeekPickerProps = IWeekPickerBaseProps &
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
