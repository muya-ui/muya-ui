import colorUtils from './color';

test('格式化颜色', () => {
  expect(colorUtils.parseToRgb('#FFFFFF')).toEqual({
    red: 255,
    green: 255,
    blue: 255,
  });
  expect(colorUtils.parseToRgb('#FFF')).toEqual({
    red: 255,
    green: 255,
    blue: 255,
  });
  expect(colorUtils.parseToRgb('rgb(255,255,255)')).toEqual({
    red: 255,
    green: 255,
    blue: 255,
  });
  expect(colorUtils.parseToRgb('rgba(255,255,255, 0.1)')).toEqual({
    red: 255,
    green: 255,
    blue: 255,
    alpha: 0.1,
  });

  expect(() => {
    colorUtils.parseToRgb('ssdf');
  }).toThrow();
});

test('透明化颜色', () => {
  expect(colorUtils.transparentize(0.1, '#FFF')).toBe('rgba(255,255,255,0.1)');
  const str = colorUtils.transparentize(0.2, 'rgba(0,0,0,0.1)');
  const result = colorUtils.parseToRgb(str);
  expect(result.alpha! - 0.02 < 0.001).toBe(true);
});
