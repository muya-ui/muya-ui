import { forwardRef, memo, RefForwardingComponent } from 'react';

export default function memoForwardRef<N, P>(comp: RefForwardingComponent<N, P>) {
  return memo(forwardRef<N, P>(comp));
}
