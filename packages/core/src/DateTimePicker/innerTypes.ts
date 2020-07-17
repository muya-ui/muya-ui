import { ConfigType, Dayjs } from 'dayjs';

import { ICalendarPureProps } from '../Calendar/types';
import { ITimePickerPanelPureProps } from '../TimePicker/types';
import { ICustomStyleBaseProps } from '../types';
import { IDateTimeCalendarStyleKeys } from './types';

type IPropsFromCalendar = Omit<
  ICalendarPureProps,
  'selectType' | 'styles' | 'onChange' | 'selectedDate' | 'defaultDate' | 'onSelect'
>;
type IPropsFromTimePickerPanel = Omit<
  ITimePickerPanelPureProps,
  'styles' | 'onChange' | 'value' | 'defaultValue' | 'rowNum' | 'format'
>;

export interface IDateTimeCalendarPureProps
  extends IPropsFromCalendar,
    IPropsFromTimePickerPanel,
    ICustomStyleBaseProps<IDateTimeCalendarStyleKeys> {
  /** 日期的值，受控时使用，比如 '2020-07-06 22:00:09' */
  selectedDate?: ConfigType;
  /** 默认值，比如 '2020-07-06 22:00:09' */
  defaultDate?: ConfigType;
  /**
   * 选择日期后，默认的时间
   * > 注意： 默认是 `'now'` 表示现在的时间，如果是 `string` ，则必须是 `HH:mm:ss` 格式，比如 `'20:00:00'`
   */
  defaultTime?: 'now' | string;
  /** 受控使用 */
  onChange?: (date?: Dayjs) => void;
  /** 清空时触发 */
  onClear?: () => void;
  /** 选中时触发 */
  onSelect?: (date: Dayjs) => void;
  /** 确认按钮点击触发 */
  onConfirm?: (date: Dayjs) => void;
  /** 时间的格式 */
  timeFormat?: string;
}

export type IDateTimeCalendarProps = IDateTimeCalendarPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue'>;
