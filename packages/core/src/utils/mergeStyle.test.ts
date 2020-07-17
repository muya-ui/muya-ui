import mergeStyle from './mergeStyle';

test('mergeStyle', async () => {
  expect(mergeStyle(undefined, undefined, undefined)).toBe(undefined);

  expect(
    mergeStyle(
      undefined,
      {
        width: 10,
      },
      undefined,
    ),
  ).toEqual({
    width: 10,
  });

  expect(
    mergeStyle(
      undefined,
      {
        width: 10,
      },
      {
        width: 20,
      },
    ),
  ).toEqual({
    width: 20,
  });

  expect(
    mergeStyle(
      {
        height: 10,
      },
      {
        width: 10,
      },
      {
        width: 20,
      },
    ),
  ).toEqual({
    height: 10,
    width: 20,
  });
});
