import { IFontSizeSpec, ISpacing } from '../interfaces';

function getTextIconSpacingForFont(
  spacingToken: ISpacing,
  fontSpec: IFontSizeSpec,
  double: boolean = false,
): number {
  const {
    pattern: { textIcon },
  } = spacingToken;
  if (double) {
    return textIcon[fontSpec] * 2;
  }
  return textIcon[fontSpec];
}

const spacingUtils = {
  getTextIconSpacingForFont,
};

export default spacingUtils;
