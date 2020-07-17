import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): [T, () => void] {
  const lastTimer = useRef(-1);
  const clear = useCallback(() => {
    window.clearTimeout(lastTimer.current);
  }, []);
  const newFn = useCallback(
    (...args: any[]) => {
      clear();
      lastTimer.current = window.setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [clear, delay, fn],
  );

  return [newFn as T, clear];
}

export default useDebounce;
