import handleNumber from './handleNumber';

describe('handleNumber', () => {
  it('should getCurrentValidValue', function() {
    const { getCurrentValidValue, getValidValue } = handleNumber({
      max: 10,
      min: 1,
      precision: 1,
      inputValue: '2',
    });
    expect(getCurrentValidValue('11')).toBe(10);
    expect(getCurrentValidValue('-1')).toBe(1);
    expect(getCurrentValidValue('1.2333')).toBe(1.2);
    expect(getCurrentValidValue('1.')).toBe(1);
    expect(getCurrentValidValue('')).toBe('');
    expect(getCurrentValidValue('dddd')).toBe(2);
    expect(getValidValue('dddd')).toBe('');
  });
  it('should not use error precision', function() {
    const { getCurrentValidValue } = handleNumber({
      max: 10,
      min: 1,
      precision: -1,
      inputValue: '2',
      value: 5,
    });
    expect(getCurrentValidValue('11')).toBe(10);
  });
});
