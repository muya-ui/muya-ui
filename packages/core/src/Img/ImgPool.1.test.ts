import * as sinon from 'sinon';

import * as muyaCore from '@muya-ui/utils';

import ImgPool from './ImgPool';

jest.mock('@muya-ui/utils');

test('测试 ImgPool.setup', async () => {
  const pool = new ImgPool();
  (muyaCore.checkWebp as jest.Mock).mockResolvedValue(true); // eslint-disable-line

  const addEventListener = sinon.spy(window, 'addEventListener');
  const removeEventListener = sinon.spy(window, 'removeEventListener');
  await pool.setup();

  const el = { getBoundingClientRect: () => {} };
  pool.getRect(el as HTMLElement);

  sinon.assert.calledTwice(addEventListener);
  // sinon.assert.calledWith(addEventListener, sinon.match((value) => {
  //   return !!value;
  // }));
  expect(pool.settings.suffixs!.webp).toBe(true);
  await pool.reset({
    suffixs: {
      format: 'jpg',
    },
  });
  expect(pool.settings.suffixs!.format).toBe('jpg');
  sinon.assert.calledTwice(removeEventListener);
  await pool.reset({
    suffixs: {
      webp: false,
    },
  });
  expect(pool.settings.suffixs!.webp).toBe(false);
  const throttleCheck = sinon.stub(pool, 'throttleCheck');
  throttleCheck.resolves();
  window.dispatchEvent(new Event('scroll'));
  window.dispatchEvent(new Event('resize'));
  sinon.assert.calledTwice(throttleCheck);

  addEventListener.restore();
  removeEventListener.restore();
  jest.unmock('@muya-ui/utils');

  (muyaCore.imgSuffix as jest.Mock).mockReturnValue('123');
  const src1 = pool.getImgSrc('//kss.ksyun.com/sdfs.jpg@base@tag', { webp: true }, { oss: 'auto' });
  expect(src1).toBe('//kss.ksyun.com/sdfs.jpg123');
  const src2 = pool.getImgSrc(
    '//k112ss.ksyun.com/sdfs.jpg@base@tag',
    { webp: true },
    { oss: 'auto' },
  );
  expect(src2).toBe('//k112ss.ksyun.com/sdfs.jpg123');
  const src3 = pool.getImgSrc(
    '//k112ss.ksyun.com/sdfs.jpg@base@tag',
    { webp: true },
    { oss: 'ali' },
  );
  expect(src3).toBe('//k112ss.ksyun.com/sdfs.jpg123');
  const src4 = pool.getImgSrc(
    '//k112ss.ksyun.com/sdfs.jpg@base@tag',
    { webp: true },
    { oss: 'ali', clean: 'off' },
  );
  expect(src4).toBe('//k112ss.ksyun.com/sdfs.jpg@base@tag123');
  const src5 = pool.getImgSrc(
    '//k112ss.ksyun.com/sdfs.jpg@base@tag',
    { webp: true },
    { suffix: 'off' },
  );
  expect(src5).toBe('//k112ss.ksyun.com/sdfs.jpg@base@tag');

  const src6 = pool.getImgSrc(
    '//k112ss.ksyun.com/sdfs.jpg@base@tag',
    { webp: true },
    { clean: '@base' },
  );
  expect(src6).toBe('//k112ss.ksyun.com/sdfs.jpg123');
  expect(pool.name).toBe('default');
});
