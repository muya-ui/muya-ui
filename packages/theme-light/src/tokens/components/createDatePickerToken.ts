import { IDatePickerToken, IThemeWithoutComponents } from '../../interfaces';

export default function createDatePickerToken({ size }: IThemeWithoutComponents): IDatePickerToken {
  return {
    panelBorderRadius: size.spec.borderRadius.s1,
  };
}
