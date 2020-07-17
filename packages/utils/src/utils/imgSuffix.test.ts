import imgSuffix, { aliSuffixCore, IImgSuffix } from './imgSuffix';

test('阿里云OSS后缀核心函数测试', () => {
  const str = aliSuffixCore({
    resize: {
      m: 'fill',
      w: 0,
      h: 280,
    },
    format: {
      webp: '',
    },
  });
  expect(str).toBe('?x-oss-process=image/resize,m_fill,w_0,h_280/format,webp');
});

test('获取后缀', () => {
  const c1: IImgSuffix = {
    resizeMode: 'lfit',
    ratio: 1.2,
    width: 100,
    height: 80,
  };
  expect(imgSuffix(c1)).toBe('?x-oss-process=image/resize,m_lfit,w_120,h_96');
  expect(imgSuffix(c1, 'kss')).toBe('@base@tag=imgScale&m=0&w=120&h=96');

  const c2: IImgSuffix = {
    resizeMode: 'mfit',
    ratio: 1.2,
    width: 100,
    height: 80,
  };
  expect(imgSuffix(c2)).toBe('?x-oss-process=image/resize,m_mfit,w_120,h_96');
  expect(imgSuffix(c2, 'kss')).toBe('@base@tag=imgScale&m=1&w=120&h=96');

  const c3: IImgSuffix = {
    resizeMode: 'fill',
    ratio: 1.2,
    width: 100,
    height: 80,
  };
  expect(imgSuffix(c3)).toBe('?x-oss-process=image/resize,m_fill,w_120,h_96');
  expect(imgSuffix(c3, 'kss')).toBe('@base@tag=imgScale&m=1&c=1&w=120&h=96');

  const c4: IImgSuffix = {
    ratio: 1.2,
    width: 100,
    height: 80,
  };
  expect(imgSuffix(c4, 'kss')).toBe('@base@tag=imgScale&w=120&h=96');

  const c5: IImgSuffix = {
    format: 'jpg',
  };
  expect(imgSuffix(c5)).toBe('?x-oss-process=image/format,jpg');
  expect(imgSuffix(c5, 'kss')).toBe('@base@tag=imgScale&F=jpg');

  const c6: IImgSuffix = {
    resizeMode: 'fill',
    ratio: 1.2,
    width: 'auto',
    height: 80,
  };
  expect(imgSuffix(c6)).toBe('?x-oss-process=image/resize,m_fill,h_96');
  expect(imgSuffix(c6, 'kss')).toBe('@base@tag=imgScale&m=1&c=1&h=96');

  const c7: IImgSuffix = {
    webp: true,
  };
  expect(imgSuffix(c7)).toBe('?x-oss-process=image/format,webp');
  expect(imgSuffix(c7, 'kss')).toBe('@base@tag=imgScale&F=webp');

  const c8: IImgSuffix = {
    q: 80,
  };
  expect(imgSuffix(c8)).toBe('?x-oss-process=image/quality,q_80');
  expect(imgSuffix(c8, 'kss')).toBe('@base@tag=imgScale&q=80');

  const c9: IImgSuffix = {
    q: 80,
    Q: 90,
  };
  expect(imgSuffix(c9)).toBe('?x-oss-process=image/quality,Q_90');

  const c10: IImgSuffix = {
    blur: { r: 10, s: 5 },
  };
  expect(imgSuffix(c10)).toBe('?x-oss-process=image/blur,r_10,s_5');

  const c11: IImgSuffix = {
    external: '111',
  };
  expect(imgSuffix(c11)).toBe('?x-oss-process=image/111');
  expect(imgSuffix(c11, 'kss')).toBe('@base@tag=imgScale111');
  const c12: IImgSuffix = {
    width: 'auto',
    height: 'auto',
  };
  expect(imgSuffix(c12)).toBe('');
  expect(imgSuffix(c12, 'kss')).toBe('');
});
