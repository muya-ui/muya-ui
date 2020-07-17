import { ICustomStyleBaseProps, Omit } from '../types';
import { ITimePickerStyleKeys } from './types';

export interface ITimePickerNumberListPureProps
  extends ICustomStyleBaseProps<ITimePickerStyleKeys> {
  /** 顶部标签 */
  label: string;
  onChange?: (num: number) => void;
  /** 选中的值 */
  selected?: number;
  /**
   * 最小值
   * @default 0
   */
  min?: number;
  /**
   * 最大值
   * @default 59
   */
  max?: number;
  /**
   * 步进
   * @default 1
   */
  step?: number;
  /**
   * 是否隐藏 disabled 的数字
   */
  hideDisabledNum?: boolean;
  /**
   * 时间选项的行数
   */
  rowNum?: number;
  /**
   * 一开始进入的时候，如果有值，滚动的方式
   * @default 'auto' 直接移动
   */
  defaultScrollBehavior?: 'auto' | 'smooth';
  /** 禁用的数字 */
  disableNum?(num: number): boolean;
}

export type ITimePickerNumberListProps = ITimePickerNumberListPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
