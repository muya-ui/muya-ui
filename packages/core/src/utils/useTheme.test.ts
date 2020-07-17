import { renderHook } from '@testing-library/react-hooks';

import useTheme from './useTheme';

test('useTheme', async () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current).toHaveProperty('colors');
});
