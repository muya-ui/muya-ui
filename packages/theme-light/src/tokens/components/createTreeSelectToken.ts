import { IThemeWithoutComponents, ITreeSelectToken } from '../../interfaces';

export default function createTreeSelectToken({
  spacing,
}: IThemeWithoutComponents): ITreeSelectToken {
  const { spec: spacingSpec } = spacing;
  return {
    offset: {
      s: spacingSpec.s2,
      m: spacingSpec.s2,
      l: spacingSpec.s3,
      xl: spacingSpec.s3,
    },
    popupPadding: 4,
    treeHeight: 200,
    selectedIconMarginLeft: spacingSpec.s4,
    selectedIconColor: 'inherit',
  };
}
