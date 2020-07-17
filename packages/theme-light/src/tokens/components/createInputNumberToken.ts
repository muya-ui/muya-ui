import { IInputNumberToken, IThemeWithoutComponents } from '../../interfaces';

export default function createInputNumberToken({
  size,
  colors,
}: IThemeWithoutComponents): IInputNumberToken {
  return {
    arrowBorderColor: colors.spec.neutral7.click,
    arrowClickBgColor: colors.spec.neutral9.normal,
    arrowSuffixNodeWrapperBorder: `1px solid ${colors.spec.neutral7.click}`,
    arrowIconSize: {
      s: 8,
      m: 8,
      l: 10,
      xl: 10,
    },
    width: {
      ...size.spec.width,
    },
    iconMargin: '2px 0',
  };
}
