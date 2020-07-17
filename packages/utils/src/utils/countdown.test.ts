import countdown from './countdown';

test('countdown', () => {
  const result = countdown(12323);
  expect(result.S).toBe(323);
  expect(result.s).toBe(12);

  const result1 = countdown(12323, 'S');
  expect(result1.S).toBe(12323);
  expect(result1.s).toBe(0);
});
