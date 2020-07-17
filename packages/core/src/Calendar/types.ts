import { ConfigType, Dayjs } from 'dayjs';

import { ICustomStyleBaseProps, Omit } from '../types';

/**
 * 日历的显示类型
 */
export type ICalendarType = 'month' | 'year' | 'decade';
/**
 * 日历的选择类型，跟显示类型一一对应
 * `month` => `date`
 * `year` => `month`
 * `decade` => `year`
 */
export type ICalendarSelectType = 'date' | 'month' | 'year';

/**
 *  Calendar style keys

 * @styles head 顶部容器
 * @styles panel 面板容器
 * @styles footer 页尾
 * @styles container 区间日历的整体容器
 * @styles leftCalendar 左日历
 * @styles rightCalendar 右日历

 * @styles pagerPrev prev翻页容器
 * @styles pagerPrevYear 前一年按钮
 * @styles pagerPrevMonth 前一月按钮
 * @styles pagerNext next翻页容器
 * @styles pagerNextYear 后一年按钮
 * @styles pagerNextMonth 后一个月按钮
 * @styles switchYear 切换年按钮
 * @styles switchMonth 切换月按钮


 * @styles panelMonthBlock 月面板的块
 * @styles panelYearBlock 年面板的块
 * @styles panelDecadeBlock 十年面板的块
 * @styles panelItem 面板里的每一个项的容器
 * @styles panelLabelBlock 月的星期标签的块
 * @styles panelLabelItem 月的星期标签的块的容器
 * @styles panelItemWrapper 面板里的每一个项的容器里的容器
 * @styles panelItemContent 面板里的每一个项的容器里的内容

 * @styles footerOption 页尾每一个选项
 */
export type ICalendarStyleKeys =
  // base
  | 'head'
  | 'panel'
  | 'footer'
  | 'container'
  | 'leftCalendar'
  | 'rightCalendar'

  // head
  | 'pagerPrev'
  | 'pagerPrevYear'
  | 'pagerPrevMonth'
  | 'pagerNext'
  | 'pagerNextYear'
  | 'pagerNextMonth'
  | 'switchYear'
  | 'switchMonth'

  // panel
  | 'panelMonthBlock'
  | 'panelYearBlock'
  | 'panelDecadeBlock'
  | 'panelItem'
  | 'panelLabelBlock'
  | 'panelLabelItem'
  | 'panelItemWrapper'
  | 'panelItemContent'

  // footer
  | 'footerOption';

export type ICalendarItemNormalStatus =
  // 选中状态
  | 'selected'
  // 常态
  | 'normal'
  // hovered 在 weekpicker 里用，不会有 disabled
  | 'hovered'
  // 在 weekpicker 里用，不会有 disabled
  | 'range-hovered'
  // 在区间中
  | 'range'
  // 区间起点
  | 'range-start'
  // 区间终点
  | 'range-end'
  // 不在当前面板时间范围内
  | 'outside';

export type ICalendarItemDisabledStatus =
  // 选中状态
  | 'selected-disabled'
  // 常态
  | 'disabled'
  // 在区间中
  | 'range-disabled'
  // 区间起点
  | 'range-start-disabled'
  // 区间终点
  | 'range-end-disabled'
  // 不在当前面板时间范围内
  | 'outside-disabled';

export type ICalendarItemStatus = ICalendarItemNormalStatus | ICalendarItemDisabledStatus;

export interface ICalendarBaseOption {
  /** 标签 */
  label: string;
  /** 禁用 */
  disabled?: boolean;
}
/**
 * 日期的快捷选项
 */
export interface ICalendarOption extends ICalendarBaseOption {
  /**
   * 时间
   * @default (() => dayjs()) 今天
   */
  date?: ConfigType | (() => Dayjs);
}
/**
 * 区间日期的快捷选项
 */
export interface IRangeCalendarOption extends ICalendarBaseOption {
  /**
   * 时间区间
   */
  range: ConfigType[] | (() => [Dayjs, Dayjs]);
}

export interface ICalendarPanelBaseProps {
  /** 隐藏非当前月份的日期 */
  hideItemOutside?: 'month';
  /**
   * 渲染月份面板的星期的标签
   * @param date 日期
   */
  renderMonthLabel?(date: Dayjs): React.ReactNode;
  /**
   * 渲染月份面板的 Item
   * @param date 日期
   */
  renderMonthItem?(date: Dayjs, status: ICalendarItemStatus): React.ReactNode;
  /**
   * 渲染年面板的 Item
   * @param date 日期
   */
  renderYearItem?(date: Dayjs, status: ICalendarItemStatus): React.ReactNode;
  /**
   * 渲染十年面板的 Item
   * @param date 日期
   */
  renderDecadeItem?(date: Dayjs, status: ICalendarItemStatus): React.ReactNode;
}

export interface ICalendarBaseProps extends ICalendarPanelBaseProps {
  /**
   * 选择的类型
   * @default 'date'
   **/
  selectType?: ICalendarSelectType;
  /** 今天的日期 */
  todayDate?: ConfigType;
  /** 禁用的日期范围  */
  disableRange?: ConfigType[];
  /**
   * 是否允许清空选择的日期
   * @default true
   */
  allowClear?: boolean;
  /** 禁用日期函数，返回 true 则禁用日期 */
  disableDate?(date: Dayjs): boolean;
}

/**
 * 日期变化事件
 */
export interface ICalendarUIChangeEvent {
  /** 用于展示的类型 */
  viewType: ICalendarType;
  /** 用于展示的日期  */
  viewDate: Dayjs;
}

export interface ICalendarPureProps
  extends ICalendarBaseProps,
    ICustomStyleBaseProps<ICalendarStyleKeys> {
  /**
   * 用于展示的类型
   * @default 'month'
   **/
  viewType?: ICalendarType;
  /** 用于展示的日期  */
  viewDate?: ConfigType;
  /** 选择的日期 */
  selectedDate?: ConfigType;
  /** 默认日期 */
  defaultDate?: ConfigType;
  /** 设置默认的面板展示的日期 */
  defaultViewDate?: ConfigType;
  /** 日期的快捷选项 */
  options?: ICalendarOption[];
  /** UI的状态变化，包括面板的翻页、切换 */
  onUIChange?(event: ICalendarUIChangeEvent): void;
  /** 选中则触发onSelect，取消时会 date 为 undefined */
  onChange?(date?: Dayjs): void;
  /** 日历区间选中 */
  onSelect?(date: Dayjs): void;
}

export type ICalendarProps = ICalendarPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'>;

/**
 * 区间日历的UI变化事件
 */
export interface IRangeCalendarUIChangeEvent {
  /** 受控时使用，用于展示的类型 */
  viewType: [ICalendarType, ICalendarType];
  /** 受控时使用，用于展示的日期  */
  viewDate: [Dayjs, Dayjs];
}
/**
 * 区间日历的变化事件
 */
export interface IRangeCalendarChangeEvent {
  /** 区间起点 */
  start?: Dayjs;
  /** 区间终点 */
  end?: Dayjs;
  /** 区间 */
  range?: [Dayjs, Dayjs];
}

export interface IRangeCalendarPureProps
  extends ICalendarBaseProps,
    ICustomStyleBaseProps<ICalendarStyleKeys> {
  /** 受控时使用，用于展示的类型 */
  viewType?: ICalendarType[];
  /** 受控时使用，用于展示的日期  */
  viewDate?: ConfigType[];
  /** 受控时使用，区间起点 */
  start?: ConfigType;
  /** 受控时使用，区间终点 */
  end?: ConfigType;
  /** 受控时使用，区间 */
  range?: ConfigType[];

  /** 用于固定开始时间 */
  fixedStartDate?: ConfigType;
  /** 用于固定截止时间 */
  fixedEndDate?: ConfigType;
  /**
   * 最少选择的数量，根据 selectType 变化
   * * `selectType === 'date'` 则表示最少选择多少天
   * * `selectType === 'month'` 则表示最少选择多少月
   * * `selectType === 'year'` 则表示最少选择多少年
   */
  minRangeLength?: number;
  /**
   * 最多选择的数量，根据 selectType 变化
   * * `selectType === 'date'` 则表示最多选择多少天
   * * `selectType === 'month'` 则表示最多选择多少月
   * * `selectType === 'year'` 则表示最多选择多少年
   */
  maxRangeLength?: number;
  /** 默认的区间 */
  defaultRange?: ConfigType[];
  /** 设置默认的面板的日期 */
  defaultViewDate?: ConfigType[];
  /** 区间的快捷选项 */
  options?: IRangeCalendarOption[];
  /** UI的状态变化，包括面板的翻页、切换 */
  onUIChange?(e: IRangeCalendarUIChangeEvent): void;
  /** 日历选中状态变化，在受控时使用 */
  onChange?(e: IRangeCalendarChangeEvent): void;
  /** 日历区间选中 */
  onSelect?(range: [Dayjs, Dayjs]): void;
}
export type IRangeCalendarProps = IRangeCalendarPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'>;
