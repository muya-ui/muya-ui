import { spacingPattern, spacingSpec } from '../tokens/spacing';
import spacingUtils from './spacing';

test('测试根据字号获取与 icon 的间距', () => {
  const token = {
    pattern: spacingPattern,
    spec: spacingSpec,
  };
  const { getTextIconSpacingForFont } = spacingUtils;
  expect(getTextIconSpacingForFont(token, 's1')).toBe(spacingPattern.textIcon.s1);
  expect(getTextIconSpacingForFont(token, 's4')).toBe(spacingPattern.textIcon.s4);
  expect(getTextIconSpacingForFont(token, 's7')).toBe(spacingPattern.textIcon.s7);
  expect(getTextIconSpacingForFont(token, 's1', true)).toBe(spacingPattern.textIcon.s1 * 2);
  expect(getTextIconSpacingForFont(token, 's3', true)).toBe(spacingPattern.textIcon.s3 * 2);
  expect(getTextIconSpacingForFont(token, 's6', true)).toBe(spacingPattern.textIcon.s6 * 2);
});
