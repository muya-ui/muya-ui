import { ISelectToken, IThemeWithoutComponents } from '../../interfaces';

export default function createSelectToken({
  typography,
  size,
  spacing,
}: IThemeWithoutComponents): ISelectToken {
  const {
    spec: { fontSize },
  } = typography;
  const {
    spec: { height, borderRadius },
  } = size;
  const { spec: spacingSpec } = spacing;
  return {
    // ctrl
    wrapperPadding: '4px 4px 0 4px',
    contentPaddingRight: 24,
    tag: {
      margin: '0 4px 4px 0',
      outerPadding: 4,
    },
    ctrlHeight: {
      s: height.s - 2,
      m: height.m - 2,
      l: height.l - 2,
      xl: height.xl - 2,
    },
    ctrlPaddingLeft: {
      s: spacingSpec.s5,
      m: spacingSpec.s5,
      l: spacingSpec.s6,
      xl: spacingSpec.s6,
    },
    fontSize: {
      s: fontSize.s1,
      m: fontSize.s1,
      l: fontSize.s2,
      xl: fontSize.s2,
    },
    borderRadius: borderRadius.s1,
    // popup
    offset: {
      s: spacingSpec.s2,
      m: spacingSpec.s2,
      l: spacingSpec.s3,
      xl: spacingSpec.s3,
    },
    // group
    groupPaddingLeft: {
      s: spacingSpec.s5,
      m: spacingSpec.s5,
      l: spacingSpec.s6,
      xl: spacingSpec.s6,
    },
    groupItemIndent: spacingSpec.s5,
    // icon
    iconRight: {
      s: spacingSpec.s5,
      m: spacingSpec.s5,
      l: spacingSpec.s6,
      xl: spacingSpec.s6,
    },
    notFoundPanelHeight: 120,
  };
}
