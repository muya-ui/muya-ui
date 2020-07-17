import addPx from './addPx';

test('addPx to different data', () => {
  expect(addPx()).toBe(''); // undefined
  expect(addPx(0)).toBe('0px'); // 0
  expect(addPx('')).toBe(''); // ''
  expect(addPx(48)).toBe('48px'); // normal number
  expect(addPx('25%')).toBe('25%'); // normal string
});
