import { IFormToken, IThemeWithoutComponents } from '../../interfaces';

export default function createFormToken({ spacing, size }: IThemeWithoutComponents): IFormToken {
  const {
    spec: { height },
  } = size;
  const { spec } = spacing;
  return {
    defaultLabelWidth: 80,
    requiredTip: '*',
    requiredTipMarginRight: spec.s2,
    requiredFontLevel: 's2',
    labelPaddingRight: {
      s: spec.s7,
      m: spec.s7,
      l: spec.s9,
      xl: spec.s10,
    },
    labelHeight: {
      ...height,
    },
    topLabelPaddingBottom: {
      s: spec.s3,
      m: spec.s3,
      l: spec.s4,
      xl: spec.s4,
    },
    inlineFormItemMarginRight: {
      s: 44,
      m: 48,
      l: 52,
      xl: 58,
    },
    errorMinHeight: {
      s: spec.s8,
      m: spec.s9,
      l: spec.s10,
      xl: spec.s11,
    },
    labelFontSizeLevel: {
      s: 's1',
      m: 's1',
      l: 's2',
      xl: 's2',
    },
    errorPaddingTop: spec.s2,
    errorPaddingBottom: spec.s2,
  };
}
