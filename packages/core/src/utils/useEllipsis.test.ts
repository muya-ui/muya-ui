import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import useEllipsis from './useEllipsis';

test('useEllipsis should return ellipsis state', async () => {
  const ref: React.MutableRefObject<HTMLDivElement | null> = {
    current: null,
  };
  const ellipsisDiv = document.createElement('div');
  ellipsisDiv.style.width = '10px';
  ellipsisDiv.style.whiteSpace = 'nowrap';
  ellipsisDiv.style.textOverflow = 'ellipsis';
  ellipsisDiv.style.overflow = 'hidden';
  // ellipsisDiv.append('1');
  ellipsisDiv.append(
    'long long long long longlong long long long longlong long long long longlong long long long long',
  );
  document.body.append(ellipsisDiv);
  ref.current = ellipsisDiv;
  const { result, rerender } = renderHook(() => useEllipsis(ref));
  rerender();
  expect(result.current).toBe(false);
});
