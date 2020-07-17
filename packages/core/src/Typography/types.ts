import {
  IFeatureSpec,
  IFontSizeSpec,
  ITextColor,
  ITypographyTitleLevel,
} from '@muya-ui/theme-light';

export interface ITypographyEllipsis {
  /**
   * 多行文本溢出省略，设置省略行数
   *
   * @type {number}
   * @memberof ITypographyEllipsis
   */
  rows: number;
}

/**
 * @include
 */
export interface ITypographyBaseProps {
  /**
   * 为文本设置删除线样式
   *
   * @type {boolean}
   * @memberof ITypographyBaseProps
   * @default false
   */
  delete?: boolean;
  /**
   * 设置自动溢出省略
   *
   * @type {boolean}
   * @memberof ITypographyBaseProps
   * @default false
   */
  ellipsis?: boolean | ITypographyEllipsis;
  /**
   * 文字加粗
   *
   * @type {boolean}
   * @memberof ITypographyBaseProps
   * @default false
   */
  strong?: boolean;
  /**
   * 文字增加下划线
   *
   * @type {boolean}
   * @memberof ITypographyBaseProps
   * @default false
   */
  underline?: boolean;
  /**
   * 设置文字颜色类型，[文字颜色规格查看此处](/design-token/colors#文字色)
   *
   * @type {keyof ITextColor}
   * @memberof ITypographyBaseProps
   * @default -
   */
  color?: keyof ITextColor;
  /**
   * 设置文字大小等级，[字体大小规格查看此处](/design-token/typography)
   *
   * @type {IFontSizeSpec}
   * @memberof ITypographyBaseProps
   * @default -
   */
  fontSize?: IFontSizeSpec | number;
  /**
   * 自定义文字行高
   *
   * @type {(string | number)}
   * @memberof ITypographyBaseProps
   */
  lineHeight?: string | number;
  /**
   * 文本类型
   *
   * @type {IFeatureSpec}
   * @memberof ITypographyBaseProps
   * @default -
   */
  type?: IFeatureSpec;
}

export interface ITypographyTitlePureProps extends ITypographyBaseProps {
  /**
   * 标题等级
   * @default 1
   */
  level?: ITypographyTitleLevel;
}

export type ITypographyTitleProps = ITypographyTitlePureProps &
  React.HTMLAttributes<HTMLHeadElement>;
