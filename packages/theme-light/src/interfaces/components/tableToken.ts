import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec, IFontSizeSpec, ISpacingSpec } from '../specs';

export interface ITableToken {
  upArrowIcon?: React.FunctionComponent<ISvgProps>;
  bottomArrowIcon?: React.FunctionComponent<ISvgProps>;
  filterIcon?: React.FunctionComponent<ISvgProps>;
  arrowSize: number;
  fixedZIndex: number;
  color: string;
  borderRadius: string;
  headOrFooterBackground: string;
  headOrFooterFontWeight: number;
  headOrFooterColor: string;
  headOrFooterHoverBackground: string;
  tableBackground: string;
  trBackground: {
    stripe: string;
    normal: string;
    hover: string;
  };
  leftFixedColumnBoxShadow: string;
  rightFixedColumnBoxShadow: string;
  sizeData: Record<
    IComponentSizeSpec,
    {
      fontLevel: IFontSizeSpec;
      headerPaddingLevels: ISpacingSpec[];
      cellPaddingLevels: ISpacingSpec[];
    }
  >;
  filterData: Record<
    IComponentSizeSpec,
    {
      buttonSize: IComponentSizeSpec;
    }
  >;
}
