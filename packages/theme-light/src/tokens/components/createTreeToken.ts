import { IThemeWithoutComponents, ITreeToken } from '../../interfaces';

export default function createTreeToken({
  colors,
  typography,
  opacity,
}: IThemeWithoutComponents): ITreeToken {
  const {
    spec: { fontSize, lineHeight, fontWeight },
  } = typography;
  const { spec: colorsSpec, pattern: colorsPattern } = colors;
  return {
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
    dragNodeHighlightOpacity: opacity.spec.s2,
    nodeHeight: {
      s: 28,
      m: 28,
      l: 32,
      xl: 32,
    },
    firstNodePaddingLeft: {
      s: 4,
      m: 4,
      l: 12,
      xl: 12,
    },
    contentMargin: 4,
    contentPaddingRight: {
      s: 8,
      m: 8,
      l: 12,
      xl: 12,
    },
    childIndent: 20,
    dragOverGapColor: colorsSpec.brand,
    rootLevelColor: colorsPattern.text.title,
    dragOverBgColor: colorsSpec.neutral7.normal,
    checkboxMarginRight: 8,
    iconFontSize: {
      s: 14,
      m: 14,
      l: 16,
      xl: 16,
    },
    iconWrapperMarginRight: 4,
    expandIconWrapperWidth: 16,
    expandIconWrapperMarginRight: 4,
    lineVertical: {
      top: 26,
      bottom: 18,
      firstLevelLeft: 16,
      otherLevelLeft: 12,
    },
    lineHorizontal: {
      left: -4,
      beforeLeft: -12,
      beforeTop: 14,
      beforeWidth: 8,
    },
    lineSize: 1,
  };
}
