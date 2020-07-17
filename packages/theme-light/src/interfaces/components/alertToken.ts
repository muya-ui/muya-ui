import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export type IAlertIconType = 'success' | 'info' | 'error' | 'warning';

export interface IAlertToken {
  /** 全局属性 **/
  borderRadius: string;
  defaultShowIcon: boolean;
  padding: Record<IComponentSizeSpec, number[]>;
  hasTitleAndDescPaddingVertical: Record<IComponentSizeSpec, number>;
  hasIconPaddingLeft: Record<IComponentSizeSpec, number>;
  hasIconAndDescPaddingLeft: Record<IComponentSizeSpec, number>;
  hasCloseIconPaddingRight: Record<IComponentSizeSpec, number>;
  typeBg: Record<IAlertIconType, string>;
  typeIcon?: Record<IAlertIconType, React.FunctionComponent<ISvgProps>>;
  /**
   * 对应类型的边框
   */
  typeBorder: Record<IAlertIconType, string>;
  /** title 属性 **/
  title: {
    textFine: boolean;
    hasDescTextFine: boolean;
    fontSize: Record<IComponentSizeSpec, number>;
    lineHeight: Record<IComponentSizeSpec, number>;
    hasDescFontSize: number;
    hasDescLineHeight: number;
    hasDescMarginBottom: number;
  };
  /** 描述属性 **/
  desc: {
    fontSize: number;
    lineHeight: number;
  };
  /** icon 属性 **/
  icon: {
    size: Record<IComponentSizeSpec, number>;
    hasTitleAndDescSize: Record<IComponentSizeSpec, number>;
    left: Record<IComponentSizeSpec, number>;
    top: Record<IComponentSizeSpec, number>;
    hasTitleAndDescLeft: number;
    hasTitleAndDescTop: number;
    iconMarginRight: number;
    bgColor: Record<IAlertIconType, string>;
  };
  /**
   * 关闭按钮 icon
   */
  closeIcon?: React.FunctionComponent<ISvgProps>;
  closeIconRight: number;
  closeIconTop: Record<IComponentSizeSpec, number>;
  hasTitleAndDescCloseIconTop: number;
  closeIconButtonSize: Record<IComponentSizeSpec, IComponentSizeSpec>;
}
