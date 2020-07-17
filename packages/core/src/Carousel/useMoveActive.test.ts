import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useMoveActive from './useMoveActive';

test('测试 useMoveActive returnDirectly === true', async () => {
  const onChange = sinon.spy();
  const { result } = renderHook(() => useMoveActive(true));
  result.current.shouldActive(onChange)();
  expect(result.current.moveActive).toBe(true);
  expect(() => {
    sinon.assert.calledOnce(onChange);
  }).not.toThrow();
});

test('测试 useMoveActive returnDirectly === false', async () => {
  const onChange = sinon.spy();
  const { result } = renderHook(() => useMoveActive(false));

  expect(result.current.moveActive).toBe(true);
  act(() => {
    result.current.shouldActive(onChange)();
  });
  expect(result.current.moveActive).toBe(false);
  act(() => {
    result.current.shouldActive(onChange)();
  });
  expect(() => {
    sinon.assert.calledOnce(onChange);
  }).not.toThrow();
});
