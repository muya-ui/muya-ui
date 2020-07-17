import { ISwitchToken, IThemeWithoutComponents } from '../../interfaces';

export default function createSwitchToken({
  colors,
  size,
  typography,
}: IThemeWithoutComponents): ISwitchToken {
  const { spec: colorsSpec } = colors;
  const {
    spec: { fontSize },
  } = typography;
  return {
    // shape
    height: {
      s: 20,
      m: 20,
      l: 24,
      xl: 24,
    },
    minWidth: {
      s: 42,
      m: 42,
      l: 48,
      xl: 48,
    },
    borderRadius: size.spec.borderRadius.s5,
    // font
    fontSize: {
      s: fontSize.s1,
      m: fontSize.s1,
      l: fontSize.s2,
      xl: fontSize.s2,
    },
    // bg
    background: {
      checked: colorsSpec.brand,
      unChecked: colorsSpec.neutral5.normal,
    },
    // circle
    circleBackground: colorsSpec.light,
    // Children
    childrenMarginLeft: {
      checked: 8,
      unChecked: 24,
    },
    childrenMarginRight: {
      checked: 24,
      unChecked: 8,
    },
    activeBoxShadow: 'none',
  };
}
