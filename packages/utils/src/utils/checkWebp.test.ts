import checkWebp, { setCanWebp, setHasCheck } from './checkWebp';

test('测试通过加装图片来获取结果的情况', async () => {
  const win: any = window as any;
  win.navigator = {
    userAgent: 'asdfasdfasdfasdf',
  };
  let img: any;
  win.Image = function() {
    img = this;
    img.height = 1;
  };
  setHasCheck(false);
  setCanWebp(false);
  const [p] = await Promise.all([checkWebp(), Promise.resolve(img.onerror())]);
  expect(p).toBe(false);

  setHasCheck(false);
  setCanWebp(false);
  const [p1] = await Promise.all([checkWebp(), Promise.resolve(img.onload())]);
  expect(p1).toBe(true);

  const p3 = await checkWebp(
    true,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  );
  expect(p3).toBe(true);

  const p4 = await checkWebp();
  expect(p4).toBe(true);
});
