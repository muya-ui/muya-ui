import { IBaseMenuToken, IThemeWithoutComponents } from '../../interfaces';

export default function createBaseMenuToken({
  typography,
  colors,
  size,
  spacing,
}: IThemeWithoutComponents): IBaseMenuToken {
  const {
    pattern: { background, text },
    spec: colorsSpec,
  } = colors;
  const {
    spec: { fontSize, fontWeight },
  } = typography;
  const {
    spec: { borderRadius, height },
  } = size;
  const {
    spec: spacingSpec,
    pattern: { textIcon },
  } = spacing;
  return {
    item: {
      height: {
        ...height,
      },
      background: {
        normal: colorsSpec.light,
        hover: colorsSpec.neutral10.normal,
        clicked: colorsSpec.neutral10.normal,
        selected: colorsSpec.lightBrand1,
        selectedHover: colorsSpec.lightBrand2,
        selectedClicked: colorsSpec.lightBrand1,
        disabled: colorsSpec.light,
      },
      color: {
        normal: colorsSpec.neutral2.normal,
        hover: colorsSpec.neutral2.normal,
        clicked: colorsSpec.neutral2.normal,
        selected: colorsSpec.brand,
        selectedHover: colorsSpec.brand,
        selectedClicked: colorsSpec.brand,
        disabled: colorsSpec.neutral6.normal,
      },
      fontWeight: {
        normal: fontWeight.regular,
        selected: fontWeight.semibold,
        disabled: fontWeight.regular,
      },
      paddingHorizontal: 12,
      fontSize: {
        s: fontSize.s1,
        m: fontSize.s1,
        l: fontSize.s2,
        xl: fontSize.s2,
      },
    },
    iconMarginLeft: textIcon.s3 * 2,
    iconColor: 'inherit',
    group: {
      color: text.secondary,
      background: background.block,
      fontSize: fontSize.s1,
      height: 24,
      paddingLeft: {
        s: spacingSpec.s5,
        m: spacingSpec.s5,
        l: spacingSpec.s6,
        xl: spacingSpec.s6,
      },
      itemIndent: spacingSpec.s5,
    },
    divider: {
      paddingLeft: {
        s: spacingSpec.s5,
        m: spacingSpec.s5,
        l: spacingSpec.s6,
        xl: spacingSpec.s6,
      },
      paddingRight: spacingSpec.s5,
      paddingVertical: 5.5,
    },
    wrapper: {
      paddingRight: spacingSpec.s2,
      paddingVertical: spacingSpec.s2,
      borderRadius: borderRadius.s1,
      innerPaddingRight: spacingSpec.s2,
    },
  };
}
