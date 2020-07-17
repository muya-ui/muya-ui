import { ConfigType, Dayjs } from 'dayjs';

import { ICalendarStyleKeys } from '../Calendar/types';
import { IDatePickerUIChangeEvent } from '../DatePicker/types';
import { IInputOnlyInputStyleKeys, IInputPureProps } from '../Input/types';
import { ITriggerProps } from '../Trigger/types';
import { ICommonTriggerProps, ICustomStyleBaseProps, Omit } from '../types';
import { IDateTimeCalendarProps } from './innerTypes';

type IPropsFromCalendar = Omit<
  IDateTimeCalendarProps,
  'styles' | 'onChange' | 'onUIChange' | 'allowClear' | 'defaultDate' | 'selectedDate' | 'onSelect'
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
  | 'onClear'
>;

/**
 * DateTimeCalendar style keys
 *
 * @styles popPanel 弹出浮层
 * @styles dateTimePanel 日期和时间的容器
 * @styles dateCol 日期的列
 * @styles timeCol 时间的列
 * @styles timeHead 时间的头部容器
 * @styles timeHeadText 时间标题
 * @styles timePanel 时间面板
 * @styles footerContainer 面板底部容器
 * @styles buttonContainer 按钮容器
 * @styles clearButton 清空按钮
 * @styles confirmButton 确认按钮
 */
export type IDateTimeCalendarStyleKeys =
  | ICalendarStyleKeys
  | 'dateTimePanel'
  | 'dateCol'
  | 'timeCol'
  | 'timeHead'
  | 'timeHeadText'
  | 'timePanel'
  | 'footerContainer'
  | 'buttonContainer'
  | 'clearButton'
  | 'confirmButton';
/**
 * ScrollView style keys
 *
 * @styles popPanel 弹出浮层
 */
export type IDateTimePickerStyleKeys =
  | 'popPanel'

  // input 里的 styles
  | IInputOnlyInputStyleKeys;

export interface IDateTimePickerBaseProps
  extends ICustomStyleBaseProps<IDateTimePickerStyleKeys>,
    IPropsFromInput,
    ICommonTriggerProps,
    IPropsFromCalendar {
  /** 日期的值，受控时使用，比如 '2020-07-06 22:00:09' */
  value?: ConfigType;
  /** 默认值，比如 '2020-07-06 22:00:09' */
  defaultValue?: ConfigType;
  /**
   * 日期格式化，参考 https://github.com/iamkun/dayjs
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string | ((date: Dayjs) => string);
  /**
   * 时间格式化，参考 https://github.com/iamkun/dayjs
   * 会自动从 format 获取，如果不设置的话
   * @default 'HH:mm:ss'
   */
  timeFormat?: string;
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
  calendarStyles?: IDateTimeCalendarProps['styles'];
  /**
   * 是否允许清空选择的日期
   * @default true
   */
  allowClear?: boolean;

  /** UI的状态变化，包括面板的翻页、切换、展开收起 */
  onUIChange?: (event: IDatePickerUIChangeEvent) => void;
  /** DatePicker 变化的值，注意 value === '' 时，date.isValid() === false */
  onChange?: (date: Dayjs) => void;
  /**
   * Calender的 onChange 透传
   */
  onCalendarChange?: (week?: Dayjs) => void;
}
export type IDateTimePickerProps = IDateTimePickerBaseProps &
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
