import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';
import { ITypographyTitleLevel } from './typographyToken';

export type IDialogIconType = 'success' | 'info' | 'error' | 'warning';

export interface IDialogSize {
  /**
   * 单位px
   *
   * @type {number}
   * @memberof IDialogSize
   */
  width: number;
  /**
   * 单位px
   *
   * @type {number}
   * @memberof IDialogSize
   */
  height: number;
}

export interface IDialogFullWidth {
  /**
   * 单位百分比，70%填写70即可
   *
   * @type {number}
   * @memberof IDialogFullWidth
   */
  widthPrecent: number;
  /**
   * 单位px
   *
   * @type {number}
   * @memberof IDialogFullWidth
   */
  marginTopAndBottom: number;
}

export interface IDialogToken {
  maskBgColor: string;
  /**
   * Dialog 的阴影
   *
   * @type {number}
   * @memberof IDialogToken
   */
  shadow: string;
  /**
   * 内容区域的border-radius
   *
   * @type {number}
   * @memberof IDialogToken
   */
  containerBorderRadius: string;
  /**
   * 内容区域举例顶部的top百分比数值，默认40
   *
   * @type {number}
   * @memberof IDialogToken
   */
  top: number;
  /**
   * 不同size下弹窗的尺寸
   *
   * @type {Record<IDialogSizeSpec, IDialogSize>}
   * @memberof IDialogToken
   */
  size: Record<IComponentSizeSpec, IDialogSize>;
  /**
   * 提醒型及决策型弹窗 Close Icon 大小
   *
   * @type {Record<IDialogSizeSpec, IDialogSize>}
   * @memberof IDialogToken
   */
  alertCloseIconTop: Record<IComponentSizeSpec, string>;
  /**
   * fullWidth状态下，容器的尺寸配置
   *
   * @type {IDialogFullWidth}
   * @memberof IDialogToken
   */
  fullWidth: IDialogFullWidth;
  /**
   * DialogActions的配置
   *
   * @type {{
   *     padding: string;
   *     childrenSpacing: number;
   *   }}
   * @memberof IDialogToken
   */
  actions: {
    paddingForAlert: string;
    fullWidthPadding: string;
    childrenSpacing: number;
    complexPadding: string;
  };
  /**
   * DialogTitle的配置
   *
   * @type {{
   *     closeIcon?: React.FunctionComponent<ISvgProps>;
   *     padding: string;
   *   }}
   * @memberof IDialogToken
   */
  title: {
    closeIcon?: React.FunctionComponent<ISvgProps>;
    closeIconRight: number;
    closeIconTop: number;
    paddingHorizontal: number;
    paddingVertical: number;
    fullWidthPadding: string;
    defaultTitleLevel: ITypographyTitleLevel;
    borderBottom: string;
  };
  /**
   * DialogContent的配置
   *
   * @type {{
   *     padding: string;
   *   }}
   * @memberof IDialogToken
   */
  content: {
    padding: string;
    paddingHorizontal: string;
    fullWidthPaddingHorizontal: string;
    paddingWithType: string;
    typeIcon?: Record<IDialogIconType, React.FunctionComponent<ISvgProps>>;
    typeIconBgColor: Record<IDialogIconType, string>;
    titleMarginBottom: number;
    defaultTitleLevel: ITypographyTitleLevel;
    iconMarginLeft: number;
    iconMarginTop: number;
    borderColor: string;
  };
}
