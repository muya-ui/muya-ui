import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { ITypographyTitleLevel } from './typographyToken';

type PagerArrowType = 'monthPrev' | 'monthNext' | 'yearPrev' | 'yearNext';

export interface ICalendarToken {
  defaultWidth: number;
  /**
   * 顶部 UI 切换箭头的 icon 配置
   */
  pagerArrow?: Record<PagerArrowType, React.FunctionComponent<ISvgProps>>;
  pagerArrowTipDelay: number;
  pagerButton: {
    margin: string;
  };
  head: {
    height: number;
    defaultDecadeTitleLevel: ITypographyTitleLevel;
  };
  footer: {
    height: number;
    optionMargin: string;
  };
  panel: {
    containerMonthPadding: string;
    containerOtherPadding: string;
    monthPadding: string;
    otherMargin: string;
    monthItemMarginBottom: number;
    otherItemMarginBottom: number;
  };
  headButton: {
    padding: string;
  };
  /**
   * 单个日期项的 token
   */
  item: {
    height: number;
    gutterInMonth: number;
    gutterOther: number;
    fontSize: number;
    borderRadius: string;
    background: {
      normal: string;
      hover: string;
      range: string;
      rangeClick: string;
      click: string;
      selected: string;
      selectedClick: string;
    };
    color: {
      normal: string;
      disabled: string;
      outside: string;
      current: string;
      selected: string;
    };
  };

  /** 日期时间面板的配置 */
  dateTimeCalendar: {
    /** 底部操作区域高度 */
    footerHeight: number;
    timeHeadMarginBottom: number;
  };
}
