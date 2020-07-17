import { IButtonToken, IThemeWithoutComponents } from '../../interfaces';

export default function createButtonToken({
  typography,
  colors,
  size,
  spacing,
  opacity,
}: IThemeWithoutComponents): IButtonToken {
  const {
    spec: { borderRadius },
  } = size;
  const { spec: colorsSpec, pattern: colorsPattern } = colors;
  const {
    spec: { fontSize, fontWeight, lineHeight },
  } = typography;
  const typeColor = {
    primary: {
      normal: colorsSpec.brand2,
      click: colorsSpec.brand1,
      hover: colorsSpec.brand3,
    },
    strong: {
      ...colorsSpec.neutral1,
    },
    normal: {
      ...colorsSpec.neutral2,
    },
    secondary: {
      ...colorsSpec.neutral3,
    },
    weak: {
      ...colorsSpec.neutral4,
    },
    danger: {
      normal: colorsSpec.danger2,
      click: colorsSpec.danger1,
      hover: colorsSpec.danger3,
    },
    success: {
      normal: colorsSpec.safe2,
      click: colorsSpec.safe1,
      hover: colorsSpec.safe3,
    },
    warning: {
      normal: colorsSpec.warning2,
      click: colorsSpec.warning1,
      hover: colorsSpec.warning3,
    },
  };

  const lightTypeColor = {
    primary: {
      normal: colorsSpec.lightBrand2,
      click: colorsSpec.lightBrand4,
      hover: colorsSpec.lightBrand3,
    },
    strong: {
      ...colorsSpec.neutral5,
    },
    normal: {
      ...colorsSpec.neutral6,
    },
    secondary: {
      ...colorsSpec.neutral7,
    },
    weak: {
      ...colorsSpec.neutral8,
    },
    danger: {
      normal: colorsSpec.lightDanger2,
      click: colorsSpec.lightDanger4,
      hover: colorsSpec.lightDanger3,
    },
    success: {
      normal: colorsSpec.lightSafe2,
      click: colorsSpec.lightSafe4,
      hover: colorsSpec.lightSafe3,
    },
    warning: {
      normal: colorsSpec.lightWarning2,
      click: colorsSpec.lightWarning4,
      hover: colorsSpec.lightWarning3,
    },
  };

  const borderColor = {
    primary: typeColor.primary.normal,
    strong: colorsSpec.neutral4.normal,
    normal: colorsSpec.neutral5.normal,
    secondary: colorsSpec.neutral5.normal,
    weak: colorsSpec.neutral5.normal,
    danger: typeColor.danger.normal,
    success: typeColor.success.normal,
    warning: typeColor.warning.normal,
  };
  // const typeBgColor = {
  //   strong: {
  //     ...colorsSpec.neutral8,
  //   },
  //   normal: {
  //     ...colorsSpec.neutral8,
  //   },
  //   secondary: {
  //     ...colorsSpec.neutral9,
  //   },
  //   weak: {
  //     ...colorsSpec.neutral9,
  //   },
  // };
  // const textColor = {
  //   strong: colorsSpec.neutral1.normal,
  //   normal: colorsSpec.neutral2.normal,
  //   secondary: colorsSpec.neutral3.normal,
  //   weak: colorsSpec.neutral4.normal,
  // };

  return {
    padding: {
      xl: 24,
      l: 20,
      m: 14,
      s: 12,
    },
    siblingSpacing: {
      xl: 12,
      l: 10,
      m: 8,
      s: 8,
    },
    weakLevels: [colorsSpec.neutral5, colorsSpec.neutral6],
    borderRadius: {
      normal: borderRadius.s1,
      group: '0px',
      circle: borderRadius.s4,
      round: borderRadius.s5,
    },
    fontWeight: fontWeight.semibold,
    fineFontWeight: fontWeight.regular,
    typeColor,
    lightTypeColor,
    inlineButtonTypeColor: typeColor,
    typeBgImage: {},
    typeBgColor: {},
    defaultColor: colorsPattern.text.inverse,
    borderColor,
    textColor: {},
    maskColor: colorsPattern.background.mask,
    fontSize: {
      xl: fontSize.s4,
      l: fontSize.s3,
      m: fontSize.s2,
      s: fontSize.s1,
    },
    lineHeight: {
      xl: lineHeight.s4,
      l: lineHeight.s3,
      m: lineHeight.s2,
      s: lineHeight.s1,
    },
    sidePadding: spacing.spec.s3,
    statusOpacity: {
      hover: opacity.spec.s9,
      click: opacity.spec.s8,
    },
    zIndexOrder: {
      weak: 1,
      secondary: 2,
      normal: 3,
      strong: 4,
      primary: 5,
      success: 6,
      warning: 7,
      danger: 8,
    },
    hoverZIndex: 9,
    selectedZIndex: 10,
    plainIsLight: false,
    loadingPosition: 'suffix',
    defaultShape: 'normal',
    plainColorHighlight: false,
  };
}
