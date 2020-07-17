import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import wait from '../utils/wait';
import useAfterEffect from './useAfterEffect';

test('测试 useAfterEffect 正常执行', async () => {
  const fn = sinon.spy();
  const { result } = renderHook(() => useAfterEffect(fn, 10));
  await wait.time(20);
  expect(() => {
    sinon.assert.calledOnce(fn);
  }).not.toThrow();
  act(() => {
    result.current.onDisable();
  });
  expect(result.current.active).toBe(false);
  act(() => {
    result.current.onActive();
  });
  expect(result.current.active).toBe(true);
});

test('测试 useAfterEffect not called', async () => {
  const fn = sinon.spy();
  const { result } = renderHook(() => useAfterEffect(fn, 10));
  act(() => {
    result.current.onDisable();
  });
  await wait.time(20);
  expect(() => {
    sinon.assert.notCalled(fn);
  }).not.toThrow();
});
