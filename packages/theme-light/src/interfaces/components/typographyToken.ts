import { ITextColor } from '../colors';
import { IFontSizeSpec } from '../specs';

export type ITypographyHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ITypographyTitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ITypographyToken {
  defaultFontLevel: IFontSizeSpec;
  defaultTextType: keyof ITextColor;
  defaultTitleType: keyof ITextColor;
  titleFontLevelMap: Record<ITypographyHeadingLevel, IFontSizeSpec>;
  titleMarginTop: string;
  titleMarginBottom: string;
}
