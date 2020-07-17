import { IThemeWithoutComponents, ITooltipToken } from '../../interfaces';
import { colorUtils } from '../../utils';

export default function createTooltipToken({
  colors,
  opacity,
  size,
}: IThemeWithoutComponents): ITooltipToken {
  return {
    bgColor: colorUtils.transparentize(opacity.spec.s1, colors.spec.neutral1.normal),
    color: colors.spec.light,
    padding: {
      s: [6, 12, 6, 12],
      m: [6, 16, 6, 16],
      l: [6, 16, 6, 16],
      xl: [6, 16, 6, 16],
    },
    arrowSize: {
      s: {
        width: 8,
        height: 4,
      },
      m: {
        width: 12,
        height: 6,
      },
      l: {
        width: 12,
        height: 6,
      },
      xl: {
        width: 12,
        height: 6,
      },
    },
    fontLevel: {
      s: 's1',
      m: 's2',
      l: 's2',
      xl: 's2',
    },
    maxWidth: 260,
    borderRadius: size.spec.borderRadius.s1,
  };
}
