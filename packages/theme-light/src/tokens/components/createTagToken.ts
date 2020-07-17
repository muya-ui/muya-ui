import { ITagToken, IThemeWithoutComponents } from '../../interfaces';

export default function createTagToken({
  colors,
  size,
  opacity,
}: IThemeWithoutComponents): ITagToken {
  const {
    pattern: { text },
    spec: colorsSpec,
  } = colors;
  const {
    spec: { borderRadius },
  } = size;
  return {
    height: {
      s: 20,
      m: 24,
      l: 28,
      xl: 32,
    },
    paddingHorizontal: {
      rect: {
        s: 6,
        m: 8,
        l: 8,
        xl: 12,
      },
      circle: {
        s: 8,
        m: 10,
        l: 12,
        xl: 16,
      },
    },
    borderRadius: {
      circle: borderRadius.s5,
      rect: borderRadius.s1,
    },
    background: {
      plain: colorsSpec.neutral9.normal,
      hover: colorsSpec.lightBrand3,
      checked: colorsSpec.brand2,
      checkedHover: colorsSpec.brand3,
      checkedClicked: colorsSpec.brand1,
    },
    fontSize: {
      s: 10,
      m: 12,
      l: 14,
      xl: 16,
    },
    color: {
      plain: colorsSpec.neutral2.normal,
      hover: colorsSpec.brand,
      click: colorsSpec.brand4,
      checked: text.inverse,
    },
    iconSpacing: {
      s: 4,
      m: 6,
      l: 8,
      xl: 8,
    },
    // fontSize - 2
    iconSize: {
      s: 8,
      m: 10,
      l: 10,
      xl: 14,
    },
    marginRight: 8,
    inverseHoverOpacity: opacity.spec.s1,
    defaultBordered: false,
    defaultShape: 'circle',
  };
}
