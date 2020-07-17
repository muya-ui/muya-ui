import { getImgStyle, getNewTranslate, getRangeOffset, rotateIsOdd } from './utils';

test('rotateIsOdd', () => {
  expect(rotateIsOdd(-90)).toBe(true);
  expect(rotateIsOdd(-180)).toBe(false);
  expect(rotateIsOdd(-270)).toBe(true);
  expect(rotateIsOdd(-360)).toBe(false);
});

test('getImgStyle', () => {
  expect(getImgStyle([100, 100], 0)).toEqual({});
  const img1 = {
    naturalWidth: 120,
    naturalHeight: 100,
  };
  expect(getImgStyle([100, 100], 0, img1 as HTMLImageElement)).toEqual({
    height: 100,
    width: 120,
    left: -10,
    top: 0,
  });
  const img2 = {
    naturalWidth: 100,
    naturalHeight: 100,
  };
  expect(getImgStyle([100, 50], 0, img2 as HTMLImageElement)).toEqual({
    width: 100,
    height: 100,
    top: -25,
    left: 0,
  });
});

test('getRangeOffset', () => {
  expect(getRangeOffset([0, 100], [10, 20])).toBe(0);
  expect(getRangeOffset([0, 100], [30, 120])).toBe(-20);
  expect(getRangeOffset([0, 100], [-10, 95])).toBe(10);
  expect(getRangeOffset([0, 90], [-20, 100])).toBe(20);
});

test('getNewTranslate', () => {
  expect(
    getNewTranslate(
      { top: 0, bottom: 100, left: 0, right: 100 },
      { top: -10, bottom: 100, left: -10, right: 100 },
      [0, 0],
    ),
  ).toBe(undefined);
  expect(
    getNewTranslate(
      { top: 0, bottom: 100, left: 0, right: 100 },
      { top: -10, bottom: 90, left: -10, right: 100 },
      [0, 0],
    ),
  ).toEqual([0, 10]);
});
