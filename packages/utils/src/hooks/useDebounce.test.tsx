import sinon from 'sinon';

import { wait } from '@muya-ui/utils';
import { renderHook } from '@testing-library/react-hooks';

import useDebounce from './useDebounce';

test('测试 useDebounce 正常执行', async () => {
  const fn = sinon.spy();
  const { result } = renderHook(() => useDebounce(fn, 10));
  result.current[0]();
  await wait.time(5);
  result.current[0]();
  await wait.time(5);
  result.current[0]();
  await wait.time(15);
  result.current[0]();
});
