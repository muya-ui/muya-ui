import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

export interface IPaginationToken {
  MoreIcon?: React.FunctionComponent<ISvgProps>;
  PageForwardIcon?: React.FunctionComponent<ISvgProps>;
  PageBackwardIcon?: React.FunctionComponent<ISvgProps>;
  FastBackwardIcon?: React.FunctionComponent<ISvgProps>;
  FastForwardIcon?: React.FunctionComponent<ISvgProps>;
  pageIconSize: number;
  tooltipDelay: number;
  numberFontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  itemLineHeight: Record<IComponentSizeSpec, number>;
  itemHeight: Record<IComponentSizeSpec, number>;
  itemMargin: Record<IComponentSizeSpec, number>;
  itemPadding: Record<IComponentSizeSpec, number>;
  jumpFontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  inputWidth: Record<IComponentSizeSpec, number>;
  inputFontWeight: number;
  itemFontWeight: {
    normal: number;
    selected: number;
  };
  simpleSizeMap: Record<IComponentSizeSpec, IComponentSizeSpec>;
  border: {
    disabled: string;
    normal: string;
    current: string;
    hover: string;
    clicked: string;
  };
  background: {
    whiteBg: string;
    darkBg: string;
    current: string;
    hover: string;
    clicked: string;
  };
  numberColor: {
    current: string;
    hover: string;
    normal: string;
  };
  arrowColor: {
    normal: string;
    disabled: string;
    hover: string;
    simpleHover: string;
  };
  moreColor: {
    normal: string;
    hover: string;
    clicked: string;
  };
  /**
   * 一页条数的 Select 的宽度
   */
  pageSizeChangerWidth: number;
}
