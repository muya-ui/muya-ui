import sinon from 'sinon';

import { renderHook } from '@testing-library/react-hooks';

import wait from '../utils/wait';
import useThrottle from './useThrottle';

test('测试 useThrottle 正常执行', async () => {
  const fn = sinon.spy();
  const { result } = renderHook(() => useThrottle(fn, 10));
  result.current();
  result.current();
  await wait.time(10);
  result.current();
  expect(() => {
    sinon.assert.calledOnce(fn);
  }).not.toThrow();
});
