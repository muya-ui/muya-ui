import { IProgressToken, IThemeWithoutComponents } from '../../interfaces';
import { colorUtils } from '../../utils';

export default function createProgressToken({
  colors,
  size,
  opacity,
}: IThemeWithoutComponents): IProgressToken {
  return {
    defaultFontSize: 80,
    defaultBgColor: colorUtils.transparentize(opacity.spec.s9, colors.spec.neutral1.normal),
    height: 6,
    borderRadius: size.spec.borderRadius.s5,
  };
}
