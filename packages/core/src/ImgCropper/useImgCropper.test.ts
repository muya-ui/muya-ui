import { createRef } from 'react';
import sinon from 'sinon';

import { wait } from '@muya-ui/utils';
import { act, renderHook } from '@testing-library/react-hooks';

import useImgCropper from './useImgCropper';
import * as utils from './utils';

function mockRef<T>(mockEl: any) {
  const ref = createRef<T>();
  (ref as any).current = mockEl;
  return ref;
}
const imgRef = mockRef<HTMLDivElement>({
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    };
  },
});
const maskRef = mockRef<HTMLDivElement>({
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: 80,
      height: 80,
    };
  },
});
const imgLoaded = sinon.stub(wait, 'imgLoaded');
const img = new Image();
imgLoaded.resolves(img);

test('测试 useImgCropper 没有加载图片的情况', () => {
  const { result } = renderHook(() => useImgCropper({}, maskRef, imgRef));
  // 正常这么调用会改状态，没有act包裹会报错
  result.current.handleWheel({ deltaY: 0 } as any);
});

test('测试 useImgCropper 正常逻辑', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useImgCropper(
      {
        src: 'ss',
        backDelay: 1000,
      },
      maskRef,
      imgRef,
    ),
  );

  await waitForNextUpdate();
  expect(result.current.imgSrc).toBe('ss');
  act(() => {
    result.current.handleMouseEnter();
  });
  expect(result.current.enter).toBe(true);
  act(() => {
    result.current.zoom({ deltaY: 0 });
    result.current.zoom({ deltaY: 4 });
  });

  expect(result.current.finalScale > 1).toBe(true);
  act(() => {
    result.current.zoom({ deltaY: -5 });
    result.current.zoom({ deltaY: -6 });
  });
  expect(result.current.finalScale < 1).toBe(true);

  // moving 为 false，状态不会变，不会报错
  result.current.move({ clientX: 1, clientY: 1 });
  act(() => {
    result.current.moveStart({ clientX: 1, clientY: 1 });
  });
  act(() => {
    result.current.move({ clientX: 2, clientY: 2 });
  });
  act(() => {
    result.current.moveEnd();
  });
  expect(result.current.finalTranslate).toEqual([1, 1]);
});

test('测试 useImgCropper 回到正确的位置', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useImgCropper(
      {
        src: 'ss',
        backDelay: 1000,
      },
      maskRef,
      imgRef,
    ),
  );

  await waitForNextUpdate();
  const getNewTranslate = sinon.stub(utils, 'getNewTranslate');
  getNewTranslate.returns([1, 2]);
  act(() => {
    result.current.backToRightTransform();
  });
  expect(result.current.finalTranslate).toEqual([1, 2]);
  act(() => {
    result.current.handleSliderChange(0.4);
  });
  act(() => {
    result.current.backToRightTransform();
  });
  expect(result.current.finalScale).toBe(1);
  act(() => {
    result.current.handleSliderChange(10);
  });
  act(() => {
    result.current.backToRightTransform();
  });
  expect(result.current.finalScale).toBe(4);
});

test('测试 useImgCropper getImg', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useImgCropper(
      {
        src: 'ss',
        backDelay: 1000,
      },
      maskRef,
      imgRef,
    ),
  );

  await waitForNextUpdate();
  const cropImg = sinon.stub(utils, 'cropImg');
  const canvas: any = {};
  cropImg.returns(canvas);
  const c = result.current.getImg(1);
  expect(canvas).toBe(c);
});

test('测试 useImgCropper rotate zoom', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useImgCropper(
      {
        src: 'ss',
        backDelay: 1000,
        scaleStep: 1,
      },
      maskRef,
      imgRef,
    ),
  );

  await waitForNextUpdate();
  act(() => {
    result.current.rotateImg();
  });
  expect(result.current.finalRotate).toBe(-90);
  act(() => {
    result.current.handleZoom();
  });
  expect(result.current.finalScale).toBe(2);
  act(() => {
    result.current.handleZoomOut();
  });
  expect(result.current.finalScale).toBe(1);
});

test('测试 useImgCropper rerender', async () => {
  const { result, waitForNextUpdate, rerender } = renderHook((src: string = 'ss') =>
    useImgCropper(
      {
        src,
        backDelay: 1000,
        scaleStep: 1,
      },
      maskRef,
      imgRef,
    ),
  );

  await waitForNextUpdate();
  rerender('sdf');
  await waitForNextUpdate();
  expect(result.current.imgSrc).toBe('sdf');
});
