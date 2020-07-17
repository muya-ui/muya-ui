import { IFontSizeSpec, IFontWeightSpec } from './specs';

export interface ITypographySpec {
  global: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  fontWeight: Record<IFontWeightSpec, number>;
  fontSize: Record<IFontSizeSpec, number>;
  lineHeight: Record<IFontSizeSpec, number>;
}

export interface ITypography {
  spec: ITypographySpec;
}
