import { useCallback, useState } from 'react';

export function useForceUpdate() {
  const [, setState] = useState(0);

  return useCallback(() => {
    setState(prev => prev + 1);
  }, []);
}

export default useForceUpdate;
