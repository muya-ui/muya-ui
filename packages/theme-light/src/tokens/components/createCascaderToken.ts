import { ICascaderToken, IThemeWithoutComponents } from '../../interfaces';

export default function createCascaderToken({
  colors,
  size,
  spacing,
  typography,
}: IThemeWithoutComponents): ICascaderToken {
  const {
    pattern: { background },
    spec: colorsSpec,
  } = colors;
  const {
    spec: { height, borderRadius },
  } = size;
  const { spec: spacingSpec } = spacing;
  const {
    spec: { fontWeight },
  } = typography;
  const maxSizeCount = 6.5;
  return {
    menuMarginVertical: spacingSpec.s2,
    menuMarginRight: spacingSpec.s2,
    borderRadius: borderRadius.s1,
    offset: {
      s: 4,
      m: 4,
      l: 6,
      xl: 6,
    },
    maxHeight: {
      s: height.s * maxSizeCount,
      m: height.m * maxSizeCount,
      l: height.l * maxSizeCount,
      xl: height.xl * maxSizeCount,
    },
    background: background.higher,
    item: {
      marginRight: spacingSpec.s2,
      paddingHorizontal: spacingSpec.s5,
      height: {
        ...height,
      },
      fontLevel: {
        s: 's1',
        m: 's1',
        l: 's2',
        xl: 's2',
      },
      iconMargin: '0 4px 0 12px',
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
      checkboxMarginRight: 8,
      multipleSelectFontWeight: fontWeight.semibold,
    },
  };
}
