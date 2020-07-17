import { IPaginationToken, IThemeWithoutComponents } from '../../interfaces';

export default function createPaginationToken({
  colors,
  typography,
}: IThemeWithoutComponents): IPaginationToken {
  const { spec: colorsSpec, pattern: colorsPattern } = colors;
  return {
    tooltipDelay: 2000,
    pageIconSize: 8,
    numberFontLevel: {
      xl: 's3',
      l: 's3',
      m: 's2',
      s: 's1',
    },
    itemHeight: {
      xl: 48,
      l: 40,
      m: 32,
      s: 28,
    },
    itemLineHeight: {
      xl: 48,
      l: 40,
      m: 32,
      s: 28,
    },
    itemPadding: {
      xl: 12,
      l: 10,
      m: 8,
      s: 6,
    },
    itemMargin: {
      xl: 8,
      l: 8,
      m: 6,
      s: 6,
    },
    jumpFontLevel: {
      xl: 's2',
      l: 's2',
      m: 's1',
      s: 's1',
    },
    inputWidth: {
      xl: 48,
      l: 40,
      m: 32,
      s: 28,
    },
    inputFontWeight: typography.spec.fontWeight.semibold,
    itemFontWeight: {
      normal: typography.spec.fontWeight.regular,
      selected: typography.spec.fontWeight.semibold,
    },
    // simple 的 xl 和 l 大小一致
    simpleSizeMap: {
      xl: 'l',
      l: 'l',
      m: 'm',
      s: 's',
    },
    border: {
      disabled: 'none',
      normal: 'none',
      current: 'none',
      hover: 'none',
      clicked: 'none',
    },
    background: {
      whiteBg: colorsSpec.neutral9.normal,
      darkBg: colorsSpec.light,
      current: colorsSpec.brand2,
      hover: colorsSpec.brand3,
      clicked: colorsSpec.brand1,
    },
    numberColor: {
      current: colorsSpec.light,
      hover: colorsSpec.light,
      normal: colorsPattern.text.title,
    },
    arrowColor: {
      normal: colorsPattern.text.title,
      disabled: colorsPattern.text.disabled,
      hover: colorsSpec.light,
      simpleHover: colorsSpec.brand3,
    },
    moreColor: {
      normal: colorsPattern.text.title,
      hover: colorsSpec.brand3,
      clicked: colorsSpec.brand1,
    },
    pageSizeChangerWidth: 96,
  };
}
