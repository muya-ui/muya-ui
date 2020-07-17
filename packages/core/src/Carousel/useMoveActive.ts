import { useState, useCallback } from 'react';

export default function useMoveActive(returnDirectly: boolean) {
  const [moveActive, setMoveActive] = useState(true);
  const shouldActive = useCallback(
    <T extends (...args: any[]) => void>(fn: T) => {
      const newFn = (...args: any[]) => {
        if (returnDirectly) {
          fn(...args);
          return;
        }
        if (!moveActive) {
          return;
        }
        setMoveActive(false);
        fn(...args);
      };
      return newFn as T;
    },
    [moveActive, returnDirectly],
  );
  return { moveActive, shouldActive, setMoveActive };
}
