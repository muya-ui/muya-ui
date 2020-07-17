import { IAlertToken, IThemeWithoutComponents } from '../../interfaces';

export default function createAlertToken({
  spacing,
  colors,
  typography,
}: IThemeWithoutComponents): IAlertToken {
  const { spec: spacingSpec } = spacing;
  const { spec: colorsSpec } = colors;
  const {
    spec: { fontSize, lineHeight },
  } = typography;
  return {
    borderRadius: '0px',
    defaultShowIcon: true,
    padding: {
      s: [6, 16, 6, 16],
      m: [8, 16, 8, 16],
      l: [10, 20, 10, 20],
      xl: [14, 20, 14, 20],
    },
    hasTitleAndDescPaddingVertical: {
      s: 16,
      m: 16,
      l: 16,
      xl: 16,
    },
    hasIconPaddingLeft: {
      s: 34,
      m: 38,
      l: 44,
      xl: 44,
    },
    hasIconAndDescPaddingLeft: {
      s: 34,
      m: 38,
      l: 44,
      xl: 44,
    },
    hasCloseIconPaddingRight: {
      s: 52,
      m: 52,
      l: 54,
      xl: 54,
    },
    typeBg: {
      success: colorsSpec.lightSafe2,
      info: colorsSpec.lightBrand2,
      warning: colorsSpec.lightWarning2,
      error: colorsSpec.lightDanger2,
    },
    typeBorder: {
      success: 'none',
      info: 'none',
      warning: 'none',
      error: 'none',
    },
    /** title 属性 **/
    title: {
      textFine: true,
      hasDescTextFine: false,
      fontSize: {
        s: fontSize.s1,
        m: fontSize.s1,
        l: fontSize.s2,
        xl: fontSize.s2,
      },
      lineHeight: {
        s: lineHeight.s1,
        m: lineHeight.s1,
        l: lineHeight.s2,
        xl: lineHeight.s2,
      },
      hasDescFontSize: fontSize.s2,
      hasDescLineHeight: lineHeight.s2,
      hasDescMarginBottom: spacingSpec.s2,
    },
    desc: {
      fontSize: fontSize.s1,
      lineHeight: lineHeight.s1,
    },
    icon: {
      size: {
        s: fontSize.s2,
        m: fontSize.s2,
        l: fontSize.s3,
        xl: fontSize.s3,
      },
      hasTitleAndDescSize: {
        s: fontSize.s2,
        m: fontSize.s2,
        l: fontSize.s3,
        xl: fontSize.s3,
      },
      left: {
        s: 12,
        m: 16,
        l: 20,
        xl: 20,
      },
      top: {
        s: 6,
        m: 8,
        l: 10,
        xl: 14,
      },
      bgColor: {
        error: colorsSpec.light,
        warning: colorsSpec.light,
        success: colorsSpec.light,
        info: '',
      },
      hasTitleAndDescLeft: 16,
      hasTitleAndDescTop: 19,
      iconMarginRight: spacingSpec.s4,
    },
    hasTitleAndDescCloseIconTop: 20,
    closeIconTop: {
      s: 8,
      m: 10,
      l: 12,
      xl: 16,
    },
    closeIconRight: 20,
    closeIconButtonSize: {
      s: 's',
      m: 's',
      l: 'm',
      xl: 'm',
    },
  };
}
