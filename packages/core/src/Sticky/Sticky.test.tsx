import React, { createRef } from 'react';
import renderer from 'react-test-renderer';

import Sticky from './Sticky';
import { act, renderHook } from '@testing-library/react-hooks';
import useSticky from './useSticky';
import { getScroller, getElementTop } from './utils';
import { StyledContainer, StyledSticky } from './styled';

const getDivAndRef = () => {
  const ref = createRef<HTMLDivElement>();
  (ref as any).current = {
    getBoundingClientRect: jest.fn(() => ({ top: 10 })),
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  return {
    div,
    ref,
  };
};

beforeAll(() => {
  // @ts-ignore
  window.getComputedStyle = jest.fn(x => ({
    overflowY: 'scroll',
  }));
  // @ts-ignore
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    get() {
      return this.parentNode;
    },
  });
});

test('测试 Sticky 正常渲染', () => {
  const tree = renderer.create(<Sticky>测试</Sticky>).toJSON();
  act(() => {
    window.dispatchEvent(new CustomEvent('scroll', { detail: 10 }));
  });
  expect(tree).toMatchSnapshot();
});

test('测试 window 滚动', async () => {
  const ref = createRef<HTMLDivElement>();
  (ref as any).current = {
    getBoundingClientRect: jest.fn(() => ({ top: 10 })),
    offsetHeight: 10,
  };
  const { result } = renderHook(() =>
    useSticky(
      {
        offsetTop: 20,
      },
      ref,
    ),
  );
  act(() => {
    window.dispatchEvent(new CustomEvent('scroll', { detail: 10 }));
  });
  expect(result.current.style!.top).toBe('20px');
  expect(result.current.fixed).toBe(true);
  act(() => {
    (ref as any).current = {
      getBoundingClientRect: jest.fn(() => ({ top: 30 })),
    };
    window.dispatchEvent(new CustomEvent('scroll', { detail: 10 }));
  });
  expect(result.current.fixed).toBe(false);
});

test('测试 target 滚动', async () => {
  const { div, ref } = getDivAndRef();
  div.scrollTop = 20;
  const { result } = renderHook(() =>
    useSticky(
      {
        offsetTop: 20,
        target: () => div,
      },
      ref,
    ),
  );
  act(() => {
    div.dispatchEvent(new CustomEvent('scroll', { detail: 10 }));
  });
  expect(result.current.style!.top).toBe('20px');
  expect(result.current.fixed).toBe(true);
  act(() => {
    (ref as any).current = {
      getBoundingClientRect: jest.fn(() => ({ top: 40 })),
    };
    div.dispatchEvent(new CustomEvent('scroll', { detail: 40 }));
  });
  expect(result.current.style!.transform).toBe('translate3d(0, 20px, 0)');

  const { div: div1 } = getDivAndRef();
  div1.scrollTop = 0;
  const { unmount } = renderHook(() =>
    useSticky(
      {
        offsetTop: 20,
        target: () => div1,
      },
      ref,
    ),
  );
  act(() => {
    div1.dispatchEvent(new CustomEvent('scroll', { detail: 10 }));
    window.dispatchEvent(new CustomEvent('scroll', { detail: 10 }));
  });
  unmount();
});

test('getScroller', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  expect(getScroller(div)).toBeInstanceOf(HTMLDivElement);
  expect(getScroller(document.body)).toBeInstanceOf(HTMLBodyElement);
});

test('getElementTop', () => {
  expect(getElementTop(window)).toBe(0);
  const div = document.createElement('div');
  expect(getElementTop(div, document.body)).toBe(0);
});

test('Styled', () => {
  const wrapper1 = renderer.create(<StyledContainer $height={10} />).toJSON();
  expect(wrapper1).toMatchSnapshot();
  const wrapper2 = renderer.create(<StyledSticky $fixed />).toJSON();
  expect(wrapper2).toMatchSnapshot();
});

test('current undefined', async () => {
  const ref = createRef<HTMLDivElement>();
  (ref as any).current = null;
  const { result } = renderHook(() =>
    useSticky(
      {
        offsetTop: 20,
      },
      ref,
    ),
  );
  const div = document.createElement('div');
  document.body.appendChild(div);
  const { result: result1 } = renderHook(() =>
    useSticky(
      {
        offsetTop: 20,
        target: () => div,
      },
      ref,
    ),
  );
  expect(result.current.fixed).toBe(false);
  expect(result1.current.fixed).toBe(false);
});
