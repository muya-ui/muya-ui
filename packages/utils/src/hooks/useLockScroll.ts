import { useEffect } from 'react';

import getScrollBarSize from '../utils/getScrollBarSize';
import isOverflowing from '../utils/isOverflowing';

/**
 *
 * @param {boolean} lock 是否锁定滚动条🔒
 * @param {HTMLElement} [container] 滚动条的容器元素
 *
 */
export function useLockScroll(lock: boolean, container?: HTMLElement) {
  useEffect(() => {
    const currentContainer = container || document.body;
    const overflowing = isOverflowing(currentContainer);
    const scrollBarSize = getScrollBarSize(currentContainer);
    const { paddingRight } = window.getComputedStyle(currentContainer);
    const paddingRightNum = paddingRight ? parseInt(paddingRight, 10) : 0;

    // container style属性原来的值，清除effect时会用到
    const {
      paddingRight: originalPaddingRight,
      overflow: originalOverflow,
    } = currentContainer.style;

    /**
     * 隐藏container的滚动条
     * 1. container处于overflow状态
     * 2. lock为true
     */
    if (!(lock && overflowing)) return;

    currentContainer.style.paddingRight = `${paddingRightNum + scrollBarSize}px`;
    currentContainer.style.overflow = 'hidden';
    return () => {
      currentContainer.style.overflow = originalOverflow;
      currentContainer.style.paddingRight = originalPaddingRight;
    };
  }, [lock, container]);
}

export default useLockScroll;
