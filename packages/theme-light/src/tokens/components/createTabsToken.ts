import { ITabsToken, IThemeWithoutComponents } from '../../interfaces';

export default function createTabsToken({ colors, size }: IThemeWithoutComponents): ITabsToken {
  const { spec: colorsSpec } = colors;
  return {
    height: {
      ...size.spec.height,
    },
    marginRight: {
      xl: 40,
      l: 32,
      m: 32,
      s: 24,
    },
    padding: {
      xl: '0 0 2px 0',
      l: '0 0 2px 0',
      m: '0 0 8px 0',
      s: '0 0 2px 0',
    },
    indicator: {
      activeColor: colorsSpec.brand,
      activeHeight: 2,
      bgColor: colorsSpec.neutral7.normal,
      bgHeight: 1,
    },
    iconSize: {
      xl: 12,
      l: 12,
      m: 8,
      s: 8,
    },
    card: {
      marginRight: 0,
      height: {
        s: 26,
        m: 30,
        l: 38,
        xl: 46,
      },
      padding: {
        xl: 24,
        l: 20,
        m: 14,
        s: 12,
      },
      dividerSize: {
        xl: 18,
        l: 16,
        m: 14,
        s: 12,
      },
      borderRadius: size.spec.borderRadius.s1,
      bgColor: colorsSpec.neutral9.normal,
      bgSelectedColor: colors.pattern.background.higher,
      bgHoverColor: colorsSpec.neutral9.hover,
    },
  };
}
