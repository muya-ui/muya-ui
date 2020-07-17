import { useCallback, useRef } from 'react';

export function useThrottle<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const lastExecTime = useRef(Date.now());
  const newFn = useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastExecTime.current < delay) {
        return;
      }
      lastExecTime.current = now;
      fn(...args);
    },
    [delay, fn],
  );

  return newFn as T;
}

export default useThrottle;
