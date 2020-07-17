import { ICheckboxToken, IThemeWithoutComponents } from '../../interfaces';

export default function createCheckboxToken({
  typography,
  colors,
  spacing,
}: IThemeWithoutComponents): ICheckboxToken {
  const { spec: colorsSpec } = colors;
  const { spec: spacingSpec, pattern: spacingPattern } = spacing;
  const {
    spec: { fontSize },
  } = typography;
  return {
    marginRightInGroup: spacingSpec.s4,
    textIconSpacing: {
      xl: spacingPattern.textIcon.s3,
      l: spacingPattern.textIcon.s2,
      m: spacingPattern.textIcon.s2,
      s: spacingPattern.textIcon.s1,
    },
    iconFontSize: {
      xl: fontSize.s5,
      l: fontSize.s4,
      m: fontSize.s3,
      s: fontSize.s3,
    },
    fontLevel: {
      xl: 's3',
      l: 's2',
      m: 's1',
      s: 's1',
    },
    labelColor: colorsSpec.neutral1.normal,
    iconBgColor: colorsSpec.light,
    iconColor: {
      unChecked: {
        normal: colorsSpec.neutral5.normal,
        hover: colorsSpec.brand,
        click: colorsSpec.brand1,
      },
      checked: {
        normal: colorsSpec.brand,
        hover: colorsSpec.brand3,
        click: colorsSpec.brand1,
      },
      indeterminate: {
        normal: colorsSpec.brand,
        hover: colorsSpec.brand3,
        click: colorsSpec.brand1,
      },
    },
  };
}
