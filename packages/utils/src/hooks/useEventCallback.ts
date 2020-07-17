import React, { useCallback, useRef } from 'react';
import warning from 'warning';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export function useEventCallback(fn: Function, dependencies: Array<any> = []) {
  const ref = useRef<Function>(() => {
    warning(false, '[useEventCallback]: Cannot call an event handler while rendering.');
  });

  useEnhancedEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(
    (...args) => {
      const fn = ref.current;
      return fn(...args);
    },
    [ref],
  );
}

export default useEventCallback;
