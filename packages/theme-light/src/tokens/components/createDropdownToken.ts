import { IDropdownToken, IThemeWithoutComponents } from '../../interfaces';

export default function createDropdownToken({ spacing }: IThemeWithoutComponents): IDropdownToken {
  const { spec } = spacing;
  return {
    offset: {
      s: spec.s2,
      m: spec.s3,
      l: spec.s3,
      xl: spec.s3,
    },
  };
}
