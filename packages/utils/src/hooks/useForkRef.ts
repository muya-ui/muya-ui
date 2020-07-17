import React from 'react';

export type IForkRef<T> = React.RefObject<T> | ((instance: T | null) => void) | null | undefined;

export function setRef<T>(ref: IForkRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as any).current = value;
  }
}

export function forkRef<T>(refA: IForkRef<T>, refB: IForkRef<T>) {
  return (refValue: T) => {
    setRef(refA, refValue);
    setRef(refB, refValue);
  };
}

export function useForkRef<T extends any>(refA: IForkRef<T>, refB: IForkRef<T>, more?: Partial<T>) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: T) => {
      const finalRef = refValue;
      if (more && finalRef) {
        Object.keys(more).forEach(k => {
          finalRef[k] = more[k];
        });
      }
      setRef(refA, finalRef);
      setRef(refB, finalRef);
    };
  }, [more, refA, refB]);
}

export default useForkRef;
