import { findClosest, formatValue, offsetCss, validNum } from './utils';

test('测试 findClosest', () => {
  const r1 = findClosest(10, [0, 5, 9, 12], 1, true);
  expect(r1).toBe(9);
  const r2 = findClosest(10, [0, 5, 12, 9], 3, false);
  expect(r2).toBe(12);

  const r3 = findClosest(100, [0, 5, 12, 9], 3, false);
  expect(r3).toBe(100);
});

test('validNum', () => {
  expect(validNum(10, 20, 12)).toBe(12);
  expect(validNum(30, 20, 12)).toBe(20);
  expect(validNum(13, 20, 12)).toBe(13);
});

test('测试 offsetCss', () => {
  const r1 = offsetCss(false, 10, 100, 0);
  expect(r1).toEqual({
    left: '10%',
  });
  const r2 = offsetCss(true, 10, 100, 0);
  expect(r2).toEqual({
    top: '10%',
  });
  const r3 = offsetCss(false, 10, 100, 0, 10);
  expect(r3).toEqual({
    left: '10%',
    width: '10%',
  });
  const r4 = offsetCss(true, 10, 100, 0, 10);
  expect(r4).toEqual({
    top: '10%',
    height: '10%',
  });
  const r5 = offsetCss(true, 10, 100, 10, 10);
  expect(r5).toEqual({
    top: '0%',
    height: '10%',
  });
});

test('formatValueByStep 一般情况', () => {
  expect(formatValue(10.100000000001, 2)).toBe(10.1);
});
