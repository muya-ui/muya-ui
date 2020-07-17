import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

export interface IFormToken {
  defaultLabelWidth: number;
  requiredTip: string;
  requiredTipMarginRight: number;
  errorPaddingTop: number;
  errorPaddingBottom: number;
  errorMinHeight: Record<IComponentSizeSpec, number>;
  labelPaddingRight: Record<IComponentSizeSpec, number>;
  labelHeight: Record<IComponentSizeSpec, number>;
  topLabelPaddingBottom: Record<IComponentSizeSpec, number>;
  inlineFormItemMarginRight: Record<IComponentSizeSpec, number>;
  labelFontSizeLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  requiredFontLevel: IFontSizeSpec;
}
