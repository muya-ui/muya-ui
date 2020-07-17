import { IResultToken, IThemeWithoutComponents } from '../../interfaces';

export default function createResultToken({
  spacing,
  colors,
}: IThemeWithoutComponents): IResultToken {
  const { spec: spacingSpec } = spacing;
  return {
    titleMarginTop: spacingSpec.s6,
    defaultTitleLevel: 3,
    iconMarginRight: spacingSpec.s6,
    subTitleMarginTop: spacingSpec.s4,
    defaultSubTitleFontLevel: 's1',
    reasonMarginTop: spacingSpec.s9,
    buttonMarginTop: spacingSpec.s9,
    typeBg: {
      success: colors.spec.lightSafe2,
      info: colors.spec.lightBrand2,
      warning: colors.spec.lightWarning2,
      error: colors.spec.lightDanger2,
    },
    defaultIconSize: 32,
    typeIconSize: {
      forbidden: { width: 180, height: 180 },
      empty: { width: 180, height: 180 },
      emptySmall: { width: 48, height: 48 },
    },
  };
}
