import { IBreakpoint } from '@muya-ui/theme-light';

import { ICustomStyleBaseProps } from '../types';

export type IAlignType = 'top' | 'middle' | 'bottom';
export type IJustifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
/**
 *  Row style keys
 * @styles wrapper 外部容器
 */
export type IRowStyleKeys = 'wrapper';
/**
 *  Col style keys
 * @styles wrapper 外部容器
 */
export type IColStyleKeys = 'wrapper';

export interface IRowPureProps extends ICustomStyleBaseProps<IRowStyleKeys> {
  /**
   * Row 下的 Col 的间隔大小，支持响应式
   * @default 0
   **/
  gutter?: number | Partial<Record<IBreakpoint, number>>;
  /**
   * 垂直对齐方式
   * @default 'top'
   */
  align?: IAlignType;
  /**
   * 水平对齐方式
   * @default 'start'
   */
  justify?: IJustifyType;
  /**
   * 等分数量（设置以后 `Row` 底下的 `Col` 的 `span`、`offset`、`push`、`pull` 参数将会失效；支持响应式）
   * @default -
   */
  equalNum?: number | Partial<Record<IBreakpoint, number>>;
}

export type IRowProps = IRowPureProps & React.HTMLAttributes<HTMLDivElement>;

export interface IColSize {
  /**
   * 栅格占位格数
   * @default -
   */
  span?: number;
  /**
   * 栅格顺序
   * @default -
   */
  order?: number;
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   * @default -
   */
  offset?: number;
  /**
   * 栅格向右移动格数
   * @default -
   */
  push?: number;
  /**
   * 栅格向左移动格数
   * @default -
   */
  pull?: number;
}

export interface IColPureProps extends ICustomStyleBaseProps<IColStyleKeys>, IColSize {
  /**
   * 尺寸 <=1280 下栅格占位格数，[尺寸可以随主题切换而变化](/design-token/breakpoints)
   * @default -
   */
  xs?: number | IColSize;
  /**
   * 尺寸 >1280 且 <=1440 下栅格占位格数，[尺寸可以随主题切换而变化](/design-token/breakpoints)
   * @default -
   */
  sm?: number | IColSize;
  /**
   * 尺寸 >1440 且 <=1680 下栅格占位格数，[尺寸可以随主题切换而变化](/design-token/breakpoints)
   * @default -
   */
  md?: number | IColSize;
  /**
   * 尺寸 >1680 且 <=1920 下栅格占位格数，[尺寸可以随主题切换而变化](/design-token/breakpoints)
   * @default -
   */
  lg?: number | IColSize;
  /**
   * 尺寸 > 1920 下栅格占位格数，[尺寸可以随主题切换而变化](/design-token/breakpoints)
   * @default -
   */
  xl?: number | IColSize;
}

export type IColProps = IColPureProps & React.HTMLAttributes<HTMLDivElement>;
