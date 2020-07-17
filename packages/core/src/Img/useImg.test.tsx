import { createRef } from 'react';
import sinon from 'sinon';

import { wait as utilsWait } from '@muya-ui/utils';
import { act, renderHook } from '@testing-library/react-hooks';

import ImgPool from './ImgPool';
import { IImgNode } from './types';
import useImg from './useImg';

test('测试 useImg 正常执行', async () => {
  const el = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const waitImgLoaded = sinon.stub(utilsWait, 'imgLoaded');
  waitImgLoaded.resolves();
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = el;
  const onLoaded = sinon.spy();
  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {
          lazy: 'off',
          resize: 'on',
        },
        imgRef,
        onLoaded,
      },
      imgPool,
    ),
  );
  await waitForNextUpdate();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('loaded');
  expect(imgState.imgSrc).toBe('ssss?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp');
  expect(() => {
    sinon.assert.calledOnce(waitImgLoaded);
    sinon.assert.calledOnce(onLoaded);
    sinon.assert.calledWith(
      onLoaded,
      sinon.match(e => {
        // console.log(e);
        return e.loadStatus === 'loaded' && e.originSrc === 'ssss';
      }),
    );
  }).not.toThrow();
  waitImgLoaded.restore();
});

test('测试 useImg src 为空', async () => {
  const el = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = el;
  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: '',
        suffixs: {},
        options: {
          lazy: 'off',
          wait: 'off',
        },
        imgRef,
      },
      imgPool,
    ),
  );
  await waitForNextUpdate();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('blank');
  expect(imgState.imgSrc).toBe('');
});

test('测试 useImg src 加载图片出错', async () => {
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const waitImgLoaded = sinon.stub(utilsWait, 'imgLoaded');
  waitImgLoaded.rejects('errr');

  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };

  const onError = sinon.spy();
  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {
          lazy: 'off',
          wait: 'on',
        },
        imgRef,
        onError,
      },
      imgPool,
    ),
  );
  await waitForNextUpdate();
  expect(() => {
    sinon.assert.calledOnce(waitImgLoaded);
    sinon.assert.calledOnce(onError);
  }).not.toThrow();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('error');
  waitImgLoaded.restore();
});

test('测试 useImg src 懒加载正常逻辑 mounted 在视口中', async () => {
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const rectIntersect = sinon.stub(imgPool, 'rectIntersect');
  const rect2 = { width: 50, height: 50 };
  rectIntersect.returns({
    rect: rect2 as ClientRect,
    intersect: true,
  });
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {};

  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {
          wait: 'off',
        },
        imgRef,
      },
      imgPool,
    ),
  );
  await waitForNextUpdate();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('loaded');
  expect(imgState.imgSrc).toBe('ssss?x-oss-process=image/resize,m_fill,w_50,h_50/format,webp');
  rectIntersect.restore();
});

test('测试 useImg src 懒加载 滚动检测', async () => {
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const rectIntersect = sinon.stub(imgPool, 'rectIntersect');
  const rect1 = {};
  const rect2 = { width: 50, height: 50 };
  rectIntersect.returns({
    rect: rect1 as ClientRect,
    intersect: false,
  });
  rectIntersect.onCall(1).returns({
    rect: rect2 as ClientRect,
    intersect: true,
  });
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {};

  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {
          wait: 'off',
        },
        imgRef,
      },
      imgPool,
    ),
  );
  act(() => {
    result.current.scrollCheckFn();
    result.current.scrollCheckFn();
  });
  await waitForNextUpdate();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('loaded');
  expect(imgState.imgSrc).toBe('ssss?x-oss-process=image/resize,m_fill,w_50,h_50/format,webp');
  rectIntersect.restore();
});

test('测试 useImg src 懒加载 窗口变化检测', async () => {
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const rectIntersect = sinon.stub(imgPool, 'rectIntersect');
  const rect1 = {};
  const rect2 = { width: 50, height: 50 };
  rectIntersect.returns({
    rect: rect1 as ClientRect,
    intersect: false,
  });
  rectIntersect.onCall(1).returns({
    rect: rect2 as ClientRect,
    intersect: true,
  });
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {};

  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {
          wait: 'off',
        },
        imgRef,
      },
      imgPool,
    ),
  );
  act(() => {
    result.current.resizeCheckFn();
    result.current.resizeCheckFn();
  });
  await waitForNextUpdate();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('loaded');
  expect(imgState.imgSrc).toBe('ssss?x-oss-process=image/resize,m_fill,w_50,h_50/format,webp');
  rectIntersect.restore();
});

test('测试 useImg src 懒加载 窗口变化检测 始终检测', async () => {
  const imgPool = new ImgPool();
  imgPool.setup({
    suffixs: { webp: true },
  });
  const rectIntersect = sinon.stub(imgPool, 'rectIntersect');
  const rect1 = {};
  const rect2 = { width: 50, height: 50 };
  rectIntersect.returns({
    rect: rect1 as ClientRect,
    intersect: false,
  });
  rectIntersect.onCall(1).returns({
    rect: rect2 as ClientRect,
    intersect: true,
  });
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {};

  const { result, waitForNextUpdate } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {
          wait: 'off',
          resize: 'on',
        },
        imgRef,
      },
      imgPool,
    ),
  );
  act(() => {
    result.current.resizeCheckFn();
    result.current.resizeCheckFn();
  });
  await waitForNextUpdate();
  const { imgState } = result.current;
  expect(imgState.loadStatus).toBe('loaded');
  expect(imgState.imgSrc).toBe('ssss?x-oss-process=image/resize,m_fill,w_50,h_50/format,webp');

  rectIntersect.reset();
  rectIntersect.returns({
    rect: rect2 as ClientRect,
    intersect: true,
  });
  const rect3 = { width: 51, height: 50 };
  rectIntersect.onCall(1).returns({
    rect: rect3 as ClientRect,
    intersect: true,
  });

  act(() => {
    result.current.resizeCheckFn();
    result.current.resizeCheckFn();
  });
  await waitForNextUpdate();
  const { imgState: imgState1 } = result.current;
  expect(imgState1.loadStatus).toBe('loaded');
  expect(imgState1.imgSrc).toBe('ssss?x-oss-process=image/resize,m_fill,w_51,h_50/format,webp');

  rectIntersect.reset();
  const rect4 = { width: 53, height: 50 };
  rectIntersect.returns({
    rect: rect4 as ClientRect,
    intersect: false,
  });

  act(() => {
    result.current.resizeCheckFn();
  });
  rectIntersect.restore();
});

test('测试 useImg src waitPoolReady', async () => {
  const imgPool = new ImgPool();
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {};
  const rectIntersect = sinon.stub(imgPool, 'rectIntersect');
  const rect3 = { width: 51, height: 50 };
  rectIntersect.returns({
    rect: rect3 as ClientRect,
    intersect: false,
  });

  const imgPoolOnce = sinon.spy(imgPool, 'once');
  const { result } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {},
        imgRef,
      },
      imgPool,
    ),
  );
  const p1 = result.current.waitPoolReady();
  const p2 = result.current.waitPoolReady();

  expect(p1).toBe(p2);

  utilsWait.time(10).then(() => {
    imgPool.emit('pool_ready');
  });

  await Promise.all([p1, p2]);

  await result.current.waitPoolReady();

  expect(() => {
    sinon.assert.calledOnce(imgPoolOnce);
  }).not.toThrow();
});

test('测试 useImg src waitPoolReady 模拟没有ready 但是组件 unmount', async () => {
  const imgPool = new ImgPool();
  const imgRef = createRef<IImgNode>();
  (imgRef as any).current = {};
  const rectIntersect = sinon.stub(imgPool, 'rectIntersect');
  const rect3 = { width: 51, height: 50 };
  rectIntersect.returns({
    rect: rect3 as ClientRect,
    intersect: false,
  });
  const { result, unmount } = renderHook(() =>
    useImg(
      {
        src: 'ssss',
        suffixs: {},
        options: {},
        imgRef,
      },
      imgPool,
    ),
  );
  const p1 = result.current.waitPoolReady();
  const p2 = result.current.waitPoolReady();

  expect(p1).toBe(p2);

  utilsWait.time(10).then(() => {
    imgPool.emit('pool_ready');
  });
  unmount();
  expect(p1).resolves.toReturnTimes(0);
});
