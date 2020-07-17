import { ConfigType, Dayjs } from 'dayjs';

import {
  ICalendarBaseOption, ICalendarPanelBaseProps, ICalendarStyleKeys, ICalendarType,
  ICalendarUIChangeEvent
} from '../Calendar/types';
import { ICustomStyleBaseProps } from '../types';
import { IWeekPickerValue } from './types';

/**
 * 日期的快捷选项
 */
export interface IWeekCalendarOption extends ICalendarBaseOption {
  /**
   * 时间
   * @default dayjs() 今天
   */
  week?: IWeekPickerValue;
}

/**
 * 日期的快捷选项的事件
 */
export interface IWeekCalendarOptionEvent {
  label: string;
  week: [Dayjs, Dayjs];
}

export interface IWeekCalendarPureProps
  extends ICalendarPanelBaseProps,
    ICustomStyleBaseProps<ICalendarStyleKeys> {
  /** 选择的日期 */
  selectedWeek?: IWeekPickerValue;
  /** 默认日期 */
  defaultWeek?: IWeekPickerValue;
  /** 周禁用 */
  disableWeek?: (week: [Dayjs, Dayjs]) => boolean;

  /**
   * 用于展示的类型
   * @default 'month'
   **/
  viewType?: ICalendarType;
  /** 用于展示的日期  */
  viewDate?: ConfigType;

  /** 今天的日期 */
  todayDate?: ConfigType;
  /**
   * 是否允许清空选择的日期
   * @default true
   */
  allowClear?: boolean;
  /** 设置默认的面板展示的日期 */
  defaultViewDate?: ConfigType;
  /** 日期的快捷选项 */
  options?: IWeekCalendarOption[];
  /** UI的状态变化，包括面板的翻页、切换 */
  onUIChange?: (event: ICalendarUIChangeEvent) => void;
  /** 选中则触发onSelect，取消时会 date 为 undefined */
  onChange?: (week?: [Dayjs, Dayjs]) => void;
  /** 日历区间选中 */
  onSelect?: (week: [Dayjs, Dayjs]) => void;
}

export type IWeekCalendarProps = IWeekCalendarPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue'>;
