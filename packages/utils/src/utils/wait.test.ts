import multiRun from './multiRun';
import wait from './wait';

test('测试wait.time', async () => {
  await multiRun(
    '11111111111'.split(''),
    async () => {
      const start = performance.now();
      await wait.time(10);
      const cost = performance.now() - start;
      // 有些奇怪，这里的 cost >= 10 的断言有可能会是 false，加大并行量的以后确实出现了一次9.6几的情况
      // @TODO 可以用 chrome 调试工具看一下这里的执行情况，这个值是不可靠的，
      expect(cost >= 9).toBe(true);
    },
    10,
  );
});

test('测试wait.imgLoaded', async () => {
  let img: any;
  const win = window as any;
  win.Image = function() {
    img = this;
    img.height = 1;
  };
  const [res] = await Promise.all([wait.imgLoaded('sssssss', 'ss'), Promise.resolve(img.onload())]);
  expect(res).toBe(img);

  await expect(
    Promise.all([wait.imgLoaded('sssssss'), Promise.resolve(img.onerror(new Error('ss')))]),
  ).rejects.toThrow();
});
