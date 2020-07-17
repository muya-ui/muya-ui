import * as sinon from 'sinon';

import { wait } from '@muya-ui/utils';

import ImgPool, { cleanSrc, extractFromSrc, isKss } from './ImgPool';

test('测试 cleanSrc', () => {
  const src1 = 'asdf@!sdf';
  expect(cleanSrc(src1)).toBe('asdf');

  const src2 = 'aa?x-oss-process=image/resize,m_fill,w_800,h_600/format,webp';
  expect(cleanSrc(src2)).toBe('aa');

  const src3 = 'sss@base@tag.sdfksldkd';
  expect(cleanSrc(src3, 'kss')).toBe('sss');
});

test('测试 extractFromSrc', () => {
  const src1 =
    '0x1440.jpg?x-oss-process=image/resize,w_800/watermark,image_bG9nb1,color_FFFFFF,size_15,align_1,interval_3,type_ZmFuZ3poZW5naGVpdGk=,x_10,y_5,text_QOmZiOi-iQ==';
  expect(extractFromSrc(src1, '/watermark,[^/]*')).toBe(
    '/watermark,image_bG9nb1,color_FFFFFF,size_15,align_1,interval_3,type_ZmFuZ3poZW5naGVpdGk=,x_10,y_5,text_QOmZiOi-iQ==',
  );
});

test('测试 isKss', () => {
  expect(isKss('kss.ksyun.com/sss')).toBe(true);
  expect(isKss('kss.ksssdfyun.com/sss')).toBe(false);
});

test('测试 ImgPool.waitReady', async () => {
  const pool = new ImgPool();
  pool.waitReady().then(() => {
    // console.log('first ready');
  });
  pool.setup({ throttleTime: 5, suffixs: { webp: true } });
  await pool.waitReady();
  expect(pool.poolStatus).toBe('ready');
});

test('测试 ImgPool.reset', async () => {
  const pool = new ImgPool();

  await pool.reset({
    throttleTime: 5,
    suffixs: { webp: true },
  });
});

test('测试 ImgPool.throttleCheck', async () => {
  const pool = new ImgPool();
  pool.setup({ throttleTime: 5, suffixs: { webp: true } });
  await pool.waitReady();
  const check = sinon.stub(pool, 'check');
  check.onCall(0).rejects();
  check.resolves();
  await pool.throttleCheck({ type: 'scroll' });
  await wait.time(6);
  await Promise.all([
    pool.throttleCheck({ type: 'scroll' }),
    pool.throttleCheck({ type: 'scroll' }),
  ]);
  await wait.time(2);
  await pool.throttleCheck({ type: 'scroll' });
});

test('测试 ImgPool.check', async () => {
  const pool = new ImgPool();
  pool.setup({ throttleTime: 5, suffixs: { webp: true } });
  await pool.check({ type: 'scroll' });
  const checkFn1 = sinon.stub();
  checkFn1.resolves();
  pool.scrollCheckFns.add(checkFn1);
  await pool.check({ type: 'scroll' });
  const checkFn2 = sinon.stub();
  checkFn2.resolves();
  pool.resizeCheckFns.add(checkFn2);
  await pool.check({ type: 'resize' });
});

test('测试 ImgPool.rectIntersect', async () => {
  const pool = new ImgPool();
  const win = window as any;
  win.innerWidth = 100;
  win.innerHeight = 100;
  await pool.setup({
    suffixs: { webp: true },
    checkRegion: {
      top: -300,
      bottom: 300,
      left: 0,
      right: 0,
    },
  });
  const rect = {};
  const getBoundingClientRect = () => rect;
  const el = { getBoundingClientRect };
  const result = pool.rectIntersect(el as HTMLElement);
  expect(result.rect).toBe(rect);
  expect(result.intersect).toBe(false);
});

test('测试 ImgPool.getSuffixs', async () => {
  const pool = new ImgPool();
  pool.destroy();
  await pool.setup({
    suffixs: { webp: true },
  });
  const res1 = pool.getSuffixs(
    {},
    {
      width: 100,
      height: 100,
    },
  );
  expect(res1).toEqual({
    width: 100,
    height: 100,
    webp: true,
    resizeMode: 'fill',
    ratio: 1,
  });
  await pool.setup({
    suffixs: { webp: true, width: 10, height: 10 },
  });
  const res2 = pool.getSuffixs(
    {},
    {
      width: 0,
      height: 0,
    },
  );
  expect(res2).toEqual({
    width: 10,
    height: 10,
    webp: true,
    resizeMode: 'fill',
    ratio: 1,
  });
});
