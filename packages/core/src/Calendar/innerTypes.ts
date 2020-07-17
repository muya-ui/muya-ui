import { Dayjs } from 'dayjs';

import { ICustomStyleBaseProps, ICustomStyleItem, Omit } from '../types';
import {
  ICalendarItemNormalStatus, ICalendarItemStatus, ICalendarPanelBaseProps, ICalendarStyleKeys,
  ICalendarType
} from './types';

/**
 * 日期的快捷选项的事件
 */
export interface ICalendarOptionEvent {
  label: string;
  date: Dayjs;
}

/**
 * 区间日期的快捷选项事件
 */
export interface IRangeCalendarOptionEvent {
  label: string;
  range: [Dayjs, Dayjs];
}
export interface ICalendarItemPureProps
  extends ICustomStyleBaseProps<ICalendarStyleKeys>,
    ICalendarPanelBaseProps {
  date: Dayjs;
  viewType: ICalendarType;
  /** 每项的状态 */
  status?: ICalendarItemNormalStatus;
  /** 是否今天 */
  isCurrent?: boolean;
  disabled?: boolean;
  isLabel?: boolean;
  /** 在一行中的位置 */
  rowType?: 'head' | 'tail' | 'normal';
  onItemClick?(date: Dayjs, status: ICalendarItemStatus): void;
  onItemHover?(date: Dayjs, status: ICalendarItemStatus): void;
}

export type ICalendarItemProps = ICalendarItemPureProps & React.HTMLAttributes<HTMLDivElement>;

export interface ICalendarHeadPureProps extends ICustomStyleBaseProps<ICalendarStyleKeys> {
  onPrevYear?: () => void;
  onNextYear?: () => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onSwitch?: (type: ICalendarType) => void;
  viewType: ICalendarType;
  viewDate: Dayjs;
}

export type ICalendarHeadProps = ICalendarHeadPureProps & React.HTMLAttributes<HTMLDivElement>;

export interface ICalendarPanelPureProps
  extends ICustomStyleBaseProps<ICalendarStyleKeys>,
    ICalendarPanelBaseProps {
  viewType: ICalendarType;
  /**
   * 这个date只控制显示
   */
  viewDate: Dayjs;
  todayDate: Dayjs;
  selected?: Dayjs;
  range?: Dayjs[];
  start?: Dayjs;
  end?: Dayjs;
  min?: number;
  max?: number;

  fixedStart?: Dayjs;
  fixedEnd?: Dayjs;
  /**
   * 禁用的日期范围
   */
  disableRange?: Dayjs[];

  isWeek?: boolean;
  hoveredWeek?: [Dayjs, Dayjs];
  selectedWeek?: [Dayjs, Dayjs];

  panelBlockProps?: React.HTMLAttributes<HTMLDivElement>;

  isRange?: boolean;
  /** 禁用日期函数，返回 true 则禁用日期 */
  disableDate?(date: Dayjs): boolean;
  disableWeek?(week: [Dayjs, Dayjs]): boolean;
  onItemClick?(date: Dayjs, status: ICalendarItemStatus): void;
  onItemHover?(date: Dayjs, status: ICalendarItemStatus): void;
}

export interface ICalendarPanelInnerProps extends Omit<ICalendarPanelPureProps, 'styles'> {
  styles: Record<
    | 'panelMonthBlock'
    | 'panelYearBlock'
    | 'panelDecadeBlock'
    | 'panelItem'
    | 'panelLabelItem'
    | 'panelLabelBlock',
    ICustomStyleItem
  >;
}

export type ICalendarPanelProps = ICalendarPanelPureProps & React.HTMLAttributes<HTMLDivElement>;

export interface ICalendarFooterOption {
  disabled?: boolean;
  onClick?: () => void;
  label: string;
}

export interface ICalendarFooterPureProps extends ICustomStyleBaseProps<ICalendarStyleKeys> {
  options?: ICalendarFooterOption[];
  type?: 'date-time' | 'date';
}

export type ICalendarFooterProps = ICalendarFooterPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>;
