import { ISvgProps } from '../../components/SvgIcon';
import { IFontSizeSpec } from '../specs';
import { ITypographyTitleLevel } from './typographyToken';

export type IResultTypeIconType = 'success' | 'info' | 'error' | 'warning';
export type IResultStatusIconType = 'forbidden' | 'empty' | 'emptySmall';
export type IResultIconType = IResultTypeIconType | IResultStatusIconType;

export interface IResultToken {
  titleMarginTop: number;
  iconMarginRight: number;
  subTitleMarginTop: number;
  reasonMarginTop: number;
  buttonMarginTop: number;
  /**
   * 种类 icon
   */
  typeIcon?: Record<IResultIconType, React.FunctionComponent<ISvgProps> | string>;
  /**
   * 对应类型的背景色
   */
  typeBg: Record<IResultTypeIconType, string>;
  defaultIconSize: number;
  defaultTitleLevel: ITypographyTitleLevel;
  defaultSubTitleFontLevel: IFontSizeSpec;
  typeIconSize: Record<IResultStatusIconType, { width: number; height: number }>;
}
