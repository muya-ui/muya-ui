import { renderHook } from '@testing-library/react-hooks';

import usePrevious from './usePrevious';

test('usePrevious', async () => {
  const { result, rerender } = renderHook(({ initialValue }) => usePrevious(initialValue), {
    initialProps: { initialValue: 0 },
  });
  rerender({ initialValue: 10 });
  expect(result.current).toBe(0);
  rerender({ initialValue: 20 });
  expect(result.current).toBe(10);
});
