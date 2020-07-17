import { calculatePage, computeVisiblePieces, getValidPageValue } from './utils';

describe('computeVisiblePieces', () => {
  test('极限情况，currentPage 为最后几页的时候', () => {
    const result = computeVisiblePieces(99, 100, 2, 5);
    expect(result[2].pageNumber).toBe(96);

    const result1 = computeVisiblePieces(97, 100, 2, 5);
    expect(result1[2].pageNumber).toBe(95);
  });

  test('处于中间位置', () => {
    const result = computeVisiblePieces(50, 100, 2, 5);
    expect(result).toHaveLength(9);
    expect(result[1].goto).toBe('prev');
    expect(result[7].goto).toBe('next');
  });

  test('处于开始', () => {
    const result = computeVisiblePieces(1, 100, 2, 5);
    expect(result).toHaveLength(7);
  });
});

test('calculatePage', () => {
  expect(calculatePage(0, 10)).toBe(1);
  expect(calculatePage(20, 10)).toBe(2);
});

test('getValidPageValue', () => {
  expect(getValidPageValue(2, 10)).toBe(2);
  expect(getValidPageValue(-1, 10)).toBe(1);
  expect(getValidPageValue(11, 10)).toBe(10);
});
