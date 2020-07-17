import { IScrollViewToken, IThemeWithoutComponents } from '../../interfaces';
import colorUtils from '../../utils/color';

export default function createScrollViewToken({
  opacity,
  size,
  colors,
  spacing,
}: IThemeWithoutComponents): IScrollViewToken {
  return {
    scrollBar: {
      size: {
        s: 4,
        m: 4,
        l: 10,
        xl: 10,
      },
      borderRadius: size.spec.borderRadius.s5,
      background: colorUtils.transparentize(opacity.spec.s7, colors.spec.neutral1.normal),
      hoverBackground: colorUtils.transparentize(opacity.spec.s6, colors.spec.neutral1.normal),
    },
    padding: spacing.spec.s2,
  };
}
