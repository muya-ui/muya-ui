import { IStepsToken, IThemeWithoutComponents } from '../../interfaces';

export default function createStepsToken({
  colors,
  typography,
  spacing,
}: IThemeWithoutComponents): IStepsToken {
  const { spec: typographySpec } = typography;
  const { spec: colorsSpec } = colors;
  return {
    content: {
      fontSize: {
        s: typographySpec.fontSize.s1,
        m: typographySpec.fontSize.s2,
        l: typographySpec.fontSize.s2,
        xl: typographySpec.fontSize.s3,
      },
      lineHeight: typographySpec.lineHeight.s1,
      fontWeight: typographySpec.fontWeight.semibold,
      color: {
        wait: colorsSpec.neutral4.normal,
        finish: colorsSpec.brand,
        process: colorsSpec.brand,
        error: colorsSpec.danger,
        hover: colorsSpec.brand3,
        clicked: colorsSpec.brand1,
      },
      background: {
        wait: 'transparent',
        finish: 'transparent',
        process: 'transparent',
        error: 'transparent',
        hover: 'transparent',
        clicked: 'transparent',
      },
    },
    progressLine: {
      bgColor: colorsSpec.neutral7.normal,
      finishBgColor: colorsSpec.brand,
    },
    circle: {
      size: {
        s: spacing.spec.s8,
        m: spacing.spec.s9,
        l: spacing.spec.s10,
        xl: spacing.spec.s11,
      },
      marginRight: {
        s: spacing.spec.s2,
        m: spacing.spec.s3,
        l: spacing.spec.s4,
        xl: spacing.spec.s4,
      },
    },
    title: {
      color: {
        wait: colorsSpec.neutral4.normal,
        finish: colorsSpec.brand,
        process: colorsSpec.brand,
        error: colorsSpec.danger,
        hover: colorsSpec.brand3,
        clicked: colorsSpec.brand1,
      },
    },
    description: {
      maxWidth: 172,
      marginLeft: {
        s: spacing.spec.s8,
        m: spacing.spec.s9,
        l: spacing.spec.s10,
        xl: spacing.spec.s11,
      },
      paddingLeft: {
        s: spacing.spec.s2,
        m: spacing.spec.s3,
        l: spacing.spec.s4,
        xl: spacing.spec.s4,
      },
      marginTop: spacing.spec.s2,
    },
  };
}
