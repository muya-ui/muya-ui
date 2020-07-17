import { useState, useCallback, useMemo, CSSProperties, RefObject } from 'react';
import { getScroller, isHidden, getScrollTop, getElementTop } from './utils';
import { IStickyProps, ScrollElement } from './types';
import { useEffectOnce, useEventCallback } from '@muya-ui/utils';

export default function useSticky(props: IStickyProps, divEl: RefObject<HTMLDivElement>) {
  const { offsetTop, target, onStatusChange } = props;
  const [fixed, setFixed] = useState(false);
  const [transform, setTransform] = useState(0);
  const [scrollTick, setScrollTick] = useState(false);
  const [targetScrollTick, setTargetScrollTick] = useState(false);

  const handleChange = useCallback(
    (status: boolean) => {
      if (onStatusChange && fixed !== status) {
        onStatusChange(status);
      }
    },
    [fixed, onStatusChange],
  );

  const calculate = useCallback(
    (top: number, target: HTMLElement, current: HTMLElement) => {
      const transform = target.getBoundingClientRect().top;
      const distance = transform - current.getBoundingClientRect().top;
      const originalPosition = Math.abs(distance - getScrollTop(target));
      const scrollTop = getScrollTop(target);
      if (scrollTop === 0) {
        setFixed(false);
        handleChange(false);
        return;
      }
      if (originalPosition - scrollTop <= top) {
        setTransform(transform);
      } else {
        setTransform(transform + originalPosition - scrollTop - top);
      }
      setFixed(true);
      handleChange(true);
    },
    [handleChange],
  );

  const onScroll = useEventCallback(() => {
    setScrollTick(false);
    const current = divEl.current;
    if (!current) return;
    if (isHidden(current)) {
      return;
    }
    const top = Number(offsetTop);
    let scrollTop = getScrollTop(window);
    const topToPageTop = getElementTop(current);
    if (target) {
      if (!fixed) {
        return;
      }
      calculate(top, target(), current);
      return;
    }
    if (scrollTop + top > topToPageTop) {
      setFixed(true);
      handleChange(true);
      setTransform(0);
    } else {
      setFixed(false);
      handleChange(false);
    }
  }, [divEl, target, fixed, offsetTop]);

  const handleScroll = useCallback(() => {
    !scrollTick && requestAnimationFrame(onScroll);
    setScrollTick(true);
  }, [onScroll, scrollTick]);

  const onTargetScroll = useCallback(() => {
    setTargetScrollTick(false);
    const current = divEl.current;
    if (!current || !target) return;
    if (isHidden(current)) {
      return;
    }

    const top = Number(offsetTop);
    calculate(top, target(), current);
  }, [divEl, target, offsetTop, calculate]);

  const handleTargetScroll = useCallback(() => {
    !targetScrollTick && requestAnimationFrame(onTargetScroll);
    setTargetScrollTick(true);
  }, [onTargetScroll, targetScrollTick]);

  useEffectOnce(() => {
    const current = divEl.current;
    let scroller: ScrollElement = window;

    if (current) {
      scroller = getScroller(current);
      if (target) {
        window.addEventListener('scroll', handleScroll);
        target().addEventListener('scroll', handleTargetScroll, true);
      } else {
        scroller.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      if (target) {
        window.removeEventListener('scroll', handleScroll);
        target().removeEventListener('scroll', handleTargetScroll, true);
      }
      scroller.removeEventListener('scroll', handleScroll);
    };
  });

  const style = useMemo(() => {
    if (!fixed) {
      return;
    }
    const style: CSSProperties = {};
    if (Number(offsetTop)) {
      style.top = `${offsetTop}px`;
    }
    if (transform) {
      style.transform = `translate3d(0, ${transform}px, 0)`;
      style.WebkitTransform = `translate3d(0, ${transform}px, 0)`;
      style.willChange = 'transform';
    }

    return style;
  }, [fixed, offsetTop, transform]);

  return {
    style,
    fixed,
    divEl,
  };
}
