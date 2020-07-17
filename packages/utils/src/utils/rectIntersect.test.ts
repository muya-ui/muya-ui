import { initRectIntersectContainer, setRectIntersectContainer } from './rectIntersect';

test('测试 DOMRect 正常情况', async () => {
  const c1 = initRectIntersectContainer(
    {
      top: -0.3,
      bottom: 0.3,
      left: 0,
      right: 0,
    },
    {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    },
  );
  expect(c1).toEqual({
    bottom: 130,
    left: 0,
    right: 100,
    top: -30,
  });
  const c2 = initRectIntersectContainer(
    {
      top: -100,
      bottom: 0,
      left: 0,
      right: 0,
    },
    {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    },
  );
  expect(c2).toEqual({
    bottom: 100,
    left: 0,
    right: 100,
    top: -100,
  });
  const c3 = initRectIntersectContainer(
    {
      top: -100,
      bottom: 0,
      left: 0,
      right: 0,
    },
    {
      width: 100,
      height: 100,
      top: 100,
      left: 100,
    },
  );
  expect(c3).toEqual({
    bottom: 200,
    left: 100,
    right: 200,
    top: 0,
  });

  const rectIntersect = setRectIntersectContainer(
    {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    },
  );

  const r1 = {
    top: 0,
    bottom: 90,
    left: 0,
    right: 90,
  };
  expect(rectIntersect(r1)).toBe(true);

  const r2 = {
    top: -10,
    bottom: 90,
    left: 0,
    right: 90,
  };
  expect(rectIntersect(r2)).toBe(true);

  const r3 = {
    top: -10,
    bottom: -1,
    left: 0,
    right: 90,
  };
  expect(rectIntersect(r3)).toBe(false);

  const r4 = {
    top: 0,
    bottom: 90,
    left: -10,
    right: -1,
  };
  expect(rectIntersect(r4)).toBe(false);

  const r5 = {
    top: 0,
    bottom: 90,
    left: 109,
    right: 110,
  };
  expect(rectIntersect(r5)).toBe(false);
});

// test('测试 setRectIntersectContainer', async () => {
//   const win = window as any;
//   win.innerWidth = 100;
//   win.innerHeight = 100;
//   const rectIntersect = setRectIntersectContainer({
//     top: -300,
//     bottom: 300,
//     left: 0,
//     right: 0,
//   });
//   // console.log(rectIntersect);

// });
