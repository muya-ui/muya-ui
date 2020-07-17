import { transformImgs } from './utils';

describe('transformImgs', () => {
  test('空情况', () => {
    const result = transformImgs([]);
    expect(result.imgs).toHaveLength(0);
  });
  test('字符串数组', () => {
    const result = transformImgs(['ss']);
    expect(result.imgs).toHaveLength(1);
    expect(result.isItems).toBe(false);
  });
  test('复杂数组数组', () => {
    const result = transformImgs([
      {
        imgSrc: 'ss',
      },
    ]);
    expect(result.imgs).toHaveLength(1);
    expect(result.isItems).toBe(true);
  });
});
