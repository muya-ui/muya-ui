import { IIpnutToken, IThemeWithoutComponents } from '../../interfaces';

export default function createInputToken({
  size,
  spacing,
  colors,
}: IThemeWithoutComponents): IIpnutToken {
  const {
    spec: { borderRadius, width, height },
  } = size;
  const { spec: spacingSpec } = spacing;
  return {
    inputPadding: {
      s: spacingSpec.s5,
      m: spacingSpec.s5,
      l: spacingSpec.s6,
      xl: spacingSpec.s6,
    },
    inputAddonNodeMargin: {
      s: spacingSpec.s2,
      m: spacingSpec.s2,
      l: spacingSpec.s4,
      xl: spacingSpec.s4,
    },
    color: colors.pattern.text.title,
    bgColor: colors.pattern.background.global,
    focusShadow: 'none',
    errorFocusShadow: 'none',
    inputHeight: {
      ...height,
    },
    inputWidth: {
      ...width,
    },
    rangeInputWidth: {
      s: 320,
      m: 320,
      l: 480,
      xl: 480,
    },
    textareaPadding: {
      s: [10, 12, 10, 12],
      m: [10, 12, 10, 12],
      l: [14, 16, 14, 16],
      xl: [14, 16, 14, 16],
    },
    autosizeTextareaPadding: {
      s: [5, spacingSpec.s5, 5, spacingSpec.s5],
      m: [7, spacingSpec.s5, 7, spacingSpec.s5],
      l: [9, spacingSpec.s6, 9, spacingSpec.s6],
      xl: [13, spacingSpec.s6, 13, spacingSpec.s6],
    },
    textareaLimitMarginBottom: {
      s: 34,
      m: 34,
      l: 42,
      xl: 42,
    },
    textareaLimitPosition: {
      s: {
        right: 12,
        bottom: 10,
      },
      m: {
        right: 12,
        bottom: 10,
      },
      l: {
        right: 14,
        bottom: 16,
      },
      xl: {
        right: 16,
        bottom: 14,
      },
    },
    textareaHeight: {
      s: 92,
      m: 92,
      l: 116,
      xl: 116,
    },
    textareaWidth: {
      s: 320,
      m: 320,
      l: 320,
      xl: 320,
    },
    borderRadius: {
      s: borderRadius.s1,
      m: borderRadius.s1,
      l: borderRadius.s1,
      xl: borderRadius.s1,
    },
    borderColor: {
      normal: colors.spec.neutral6.normal,
      hover: colors.spec.neutral6.hover,
      focused: colors.spec.brand,
    },
    fontLevel: {
      s: 's1',
      m: 's1',
      l: 's2',
      xl: 's2',
    },
    selectionBackground: colors.spec.lightBrand4,
    inputTag: {
      margin: '0 4px 4px 0',
      outerPadding: 4,
    },
    tagsInput: {
      wrapperPadding: '4px 4px 0 4px',
      contentPaddingRight: {
        s: 24,
        m: 24,
        l: 32,
        xl: 32,
      },
    },
  };
}
