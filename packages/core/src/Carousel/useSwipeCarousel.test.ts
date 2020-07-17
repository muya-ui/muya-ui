import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useSwipeCarousel from './useSwipeCarousel';

test('测试 useSwipeCarousel 自动播放 鼠标事件', async () => {
  const onMouseEnter = sinon.spy();
  const onMouseLeave = sinon.spy();
  const { result } = renderHook(() =>
    useSwipeCarousel({
      imgs: ['sss', 'sss'],
      onMouseEnter,
      onMouseLeave,
    }),
  );
  expect(result.current.autoplayActive).toBe(true);
  act(() => {
    result.current.handleMouseEnter({} as any);
  });
  expect(result.current.autoplayActive).toBe(false);
  act(() => {
    result.current.handleMouseLeave({} as any);
  });
  expect(result.current.autoplayActive).toBe(true);
});

test('测试 useSwipeCarousel handleTransitionEnd', async () => {
  const { result } = renderHook(() =>
    useSwipeCarousel({
      imgs: ['sss', 'sss'],
      arrowEnabled: 'transition-end',
    }),
  );
  act(() => {
    result.current.handleTransitionEnd();
  });
  expect(result.current.moveActive).toBe(true);
});

test('测试 useSwipeCarousel 移动', async () => {
  const onChange = sinon.spy();
  const { result } = renderHook(() =>
    useSwipeCarousel({
      imgs: ['sss', 'sss', 'sss'],
      onChange,
    }),
  );
  act(() => {
    result.current.handleNext();
  });
  expect(result.current.currentIndex).toBe(1);
  act(() => {
    result.current.handlePrev();
  });
  expect(result.current.currentIndex).toBe(0);
  act(() => {
    result.current.handleGoTo(2);
  });
  expect(result.current.currentIndex).toBe(2);

  act(() => {
    result.current.handleNext();
  });
  expect(result.current.currentIndex).toBe(0);
  act(() => {
    result.current.handlePrev();
  });
  expect(result.current.currentIndex).toBe(2);

  // 不会报错
  result.current.handleGoTo(12);
});
