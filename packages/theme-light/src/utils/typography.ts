import { IFontSizeSpec, ITypographySpec } from '../interfaces';

function getFontSpec(spec: ITypographySpec, size: number): IFontSizeSpec | undefined {
  const { fontSize } = spec;
  for (const key of Object.keys(fontSize)) {
    if (fontSize[key as IFontSizeSpec] === size) {
      return key as IFontSizeSpec;
    }
  }
}

function getLineHeightByFontSize(spec: ITypographySpec, size: number): number {
  const { global, lineHeight } = spec;
  const fontLevel = getFontSpec(spec, size);
  if (typeof fontLevel !== 'undefined') {
    return lineHeight[fontLevel as IFontSizeSpec];
  }
  return size * global.lineHeight;
}

const typographyUtils = {
  getFontSpec,
  getLineHeightByFontSize,
};

export default typographyUtils;
