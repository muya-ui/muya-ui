import { addNum, isValidProps, isNotCompleteNumber } from './utils';

describe('InputNumber utils', () => {
  it('should addNum current', function() {
    expect(addNum(0.1, 0.2)).toBe(0.3);
    expect(addNum(1, 1)).toBe(2);
  });
  it('should isValidProps success', function() {
    expect(isValidProps(undefined)).toBe(false);
    expect(isValidProps(null)).toBe(false);
    expect(isValidProps(1)).toBe(true);
  });
  it('should isNotCompleteNumber success', function() {
    expect(isNotCompleteNumber(NaN)).toBe(true);
    expect(isNotCompleteNumber('d')).toBe(true);
    expect(isNotCompleteNumber('')).toBe(true);
    expect(isNotCompleteNumber(null)).toBe(true);
    expect(isNotCompleteNumber(1)).toBe(false);
  });
});
