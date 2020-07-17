import mergeStyleItem from './mergeStyleItem';

test('mergeStyleItem', () => {
  const r1 = mergeStyleItem(
    {},
    {
      className: 'xx',
    },
  );
  expect(r1.className).toBe('xx');
  expect(r1.style).toBe(undefined);

  const r2 = mergeStyleItem(
    {
      className: 'ss',
    },
    {
      className: 'xx',
    },
  );
  expect(r2.className).toBe('ss xx');

  const r3 = mergeStyleItem(
    {},
    {
      className: 'xx',
      style: {
        width: 10,
      },
    },
  );
  expect(r3.style).toEqual({
    width: 10,
  });
  const r4 = mergeStyleItem(
    {
      style: {
        width: 10,
      },
    },
    {
      className: 'xx',
      style: {
        width: 20,
      },
    },
  );
  expect(r4.style).toEqual({
    width: 10,
  });
});
