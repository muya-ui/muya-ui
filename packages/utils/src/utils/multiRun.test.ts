import multiRun from './multiRun';

test('multi-run测试', async () => {
  const arr = [1, 1, 1, 4, 4, 4, 10, 10, 10];

  await multiRun(
    arr,
    item => {
      // console.log(item);
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(item);
        }, item * 10),
      );
    },
    3,
  );
});

test('multi-run测试正确性', async () => {
  const a1: any = {};
  const a2: any = {};
  const a3: any = {};
  const a4: any = {};
  const a5: any = {};
  const a6: any = {};

  const now = Date.now();
  await multiRun(
    [a1, a2, a3, a4, a5, a6],
    item => {
      item.time = Date.now() - now;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(item);
        }, 20);
      });
    },
    2,
  );
  // console.log(a1, a2, a3, a4, a5, a6);
  expect(a3.time - a1.time > 12).toBe(true);
  expect(a4.time - a2.time > 12).toBe(true);
  expect(a6.time - a3.time > 12).toBe(true);
});
test('multi-run测试throw error', async () => {
  await expect(
    multiRun(
      [1, 2, 3, 4],
      item => {
        if (item > 3) {
          return Promise.reject(new TypeError('sss'));
        } else {
          return Promise.resolve(1);
        }
      },
      2,
    ),
  ).rejects.toThrow();
});
