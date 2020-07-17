import { typographySpec } from '../tokens/typography';
import typographyUtils from './typography';

test('测试根据字号获取行高', () => {
  const { getLineHeightByFontSize } = typographyUtils;
  const { fontSize, lineHeight, global } = typographySpec;
  expect(getLineHeightByFontSize(typographySpec, fontSize.s1)).toBe(lineHeight.s1);
  expect(getLineHeightByFontSize(typographySpec, fontSize.s4)).toBe(lineHeight.s4);
  expect(getLineHeightByFontSize(typographySpec, fontSize.s7)).toBe(lineHeight.s7);
  expect(getLineHeightByFontSize(typographySpec, 13)).toBe(13 * global.lineHeight);
});

test('测试获取文字级别', () => {
  const { getFontSpec } = typographyUtils;
  const { fontSize } = typographySpec;
  expect(getFontSpec(typographySpec, fontSize.s1)).toBe('s1');
  expect(getFontSpec(typographySpec, fontSize.s4)).toBe('s4');
  expect(getFontSpec(typographySpec, fontSize.s7)).toBe('s7');
  expect(getFontSpec(typographySpec, 13)).toBe(undefined);
});
