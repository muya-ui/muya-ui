import { ISliderToken, IThemeWithoutComponents } from '../../interfaces';

export default function createSliderToken({ colors }: IThemeWithoutComponents): ISliderToken {
  return {
    circleSize: 12,
    circleColor: colors.spec.light,
    circleBorderWidth: 1,
    circleBorderColor: colors.spec.brand,
    circleBorderHoverColor: colors.spec.brand,
    circleActiveSize: 16,
    circleActiveBorderSize: 4,
    circleActiveBoxShadow: 'none',
    circleActiveBorderColor: colors.spec.lightBrand2,
    trackHeight: 6,
    trackBgColor: colors.spec.neutral8.normal,
    trackHoverBgColor: colors.spec.neutral8.normal,
    trackActiveBgColor: colors.spec.brand,
    rootPadding: 4,
    markRowGutter: 8,
    markPointSize: 6,
    markPointBorderSize: 1,
    markPointBorderColor: colors.spec.brand,
  };
}
