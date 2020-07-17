import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec, IItemInteractionStatus, IItemStatus } from '../../interfaces';
import { IFontSizeSpec } from '../specs';

export interface IMenuToken {
  wrapper: {
    background: string;
    borderRadius: string;
    inlineCollapsedWidth: number;
  };
  item: {
    indent: number;
    indentWithIcon: number;
    marginHorizontal: number;
    marginVertical: number;
    paddingHorizontal: number;
    verticalPaddingHorizontal: number;
    horizontalPaddingHorizontal: number;
    background: Record<IItemInteractionStatus, string>;
    color: Record<IItemInteractionStatus, string>;
    fontWeight: Record<IItemStatus, number>;
    horizontalBackground: Record<IItemInteractionStatus, string>;
    horizontalColor: Record<IItemInteractionStatus, string>;
  };
  tooltip: {
    offset: number;
    size: IComponentSizeSpec;
  };
  background: string;
  height: number;
  verticalHeight: Record<IComponentSizeSpec, number>;
  verticalBorderRadius: string;
  fontLevel: IFontSizeSpec;
  verticalFontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  expandIcon?: React.FunctionComponent<ISvgProps>;
  iconMarginRight: number;
  iconFontLevel: IFontSizeSpec;
  iconColor: string;
  highlightIconColor: string;
  verticalIconFontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  group: {
    indent: number;
    indentWithIcon: number;
    fontLevel: IFontSizeSpec;
    height: number;
    verticalHeight: number;
    paddingHorizontal: number;
    paddingTop: number;
    itemPaddingInGroup: number;
    verticalpaddingTop: number;
    background: string;
    color: string;
  };
  subMenu: {
    indent: number;
    indentWithIcon: number;
    offset: number;
    verticalMinWidth: number;
    verticalPaddingVertical: number;
    preventOverflowPadding: number;
    offsetHasScrollBar: number;
    scrollBarPadding: number;
    background: Record<IItemInteractionStatus, string>;
    color: Record<IItemInteractionStatus, string>;
    fontWeight: Record<IItemStatus, number>;
    horizontalBackground: Record<IItemInteractionStatus, string>;
    horizontalColor: Record<IItemInteractionStatus, string>;
  };
  divider: {
    paddingHorizontal: number;
    paddingVertical: number;
  };
}
