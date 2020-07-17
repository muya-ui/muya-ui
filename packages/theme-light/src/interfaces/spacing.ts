import { IFontSizeSpec, ISpacingSpec } from './specs';

export interface ISpacing {
  spec: Record<ISpacingSpec, number>;
  pattern: {
    textIcon: Record<IFontSizeSpec, number>;
  };
}
