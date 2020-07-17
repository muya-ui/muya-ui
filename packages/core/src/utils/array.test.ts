import { arrayAdd, arrayDel } from './array';

test('arrayAdd', () => {
  expect(arrayAdd([1, 2, 3], 3)).toEqual([1, 2, 3]);
  expect(arrayAdd([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
});

test('arrayDel', () => {
  expect(arrayDel([1, 2, 3], 3)).toEqual([1, 2]);
  expect(arrayDel([1, 2, 3], 4)).toEqual([1, 2, 3]);
});
