import mockHook from './mockHook';

test('mock hook', () => {
  const obj = {
    default() {
      return {
        a: 111,
      };
    },
  };
  const newDefault = mockHook(obj);
  expect(obj.default()).toEqual({
    a: 111,
  });
  newDefault.returns({
    a: 12,
    b: 11,
  });
  expect(obj.default()).toEqual({
    a: 12,
    b: 11,
  });

  newDefault.restore();
  expect(obj.default()).toEqual({
    a: 111,
  });
});
