import { renderHook } from '@testing-library/react-hooks';

import useMountedRef from './useMountedRef';

describe('useMountedRef', () => {
  test('returns a ref with current value as true when the component is mounted', () => {
    const { result } = renderHook(() => useMountedRef());
    expect(result.current.current).toBe(true);
  });

  test('returns a ref with current value as false when the component is un-mounted', async () => {
    const { result, unmount } = renderHook(() => useMountedRef());
    expect(result.current.current).toBe(true);
    unmount();
    expect(result.current.current).toBe(false);
  });
});
