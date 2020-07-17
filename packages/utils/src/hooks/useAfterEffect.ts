import { useEffect, useRef, useState } from 'react';

export function useAfterEffect(fn: () => void, delay: number, defaultDisabled?: boolean) {
  const timerRef = useRef(0);
  const [active, setActive] = useState(!defaultDisabled);
  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  useEffect(() => {
    clear();
    if (active && delay > 0) {
      timerRef.current = setTimeout(fn, delay);
    }
    return clear;
  });
  const onDisable = () => {
    clear();
    setActive(false);
  };
  const onActive = () => {
    clear();
    setActive(true);
  };

  return {
    onDisable,
    onActive,
    active,
  };
}

export default useAfterEffect;
