import * as sinon from 'sinon';

import { renderHook } from '@testing-library/react-hooks';

import useLockScroll from './useLockScroll';

test('should hide scrollbar', () => {
  const { rerender, unmount } = renderHook((lock: boolean) => useLockScroll(lock));

  rerender();

  expect(document.body.style.overflow).toBeFalsy();
  sinon.stub(document.body, 'clientHeight').get(() => 10);
  (window as any).innerHeight = 4;
  rerender(true);

  expect(document.body.style.overflow).toBe('hidden');

  unmount();

  expect(document.body.style.overflow).toBeFalsy();
});
