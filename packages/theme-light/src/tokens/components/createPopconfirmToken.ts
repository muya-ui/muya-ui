import { IPopconfirmToken, IThemeWithoutComponents } from '../../interfaces';

export default function createPopconfirmToken({
  spacing,
}: IThemeWithoutComponents): IPopconfirmToken {
  return {
    width: '200px',
    paddingLeftWithType: 38,
    translateX: -spacing.spec.s4,
  };
}
