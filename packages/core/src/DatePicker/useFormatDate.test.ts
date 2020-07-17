import dayjs from 'dayjs';

import { renderHook } from '@testing-library/react-hooks';

import useFormatDate from './useFormatDate';

test('测试 useFormatDate 默认逻辑', () => {
  const { result } = renderHook(() => useFormatDate('month'));

  expect(result.current()).toBe('');
  expect(result.current(dayjs(''))).toBe('');
  expect(result.current(dayjs('2020.01.01'))).toBe('2020-01');
});

test('测试 useFormatDate format YYYY/MM/DD', () => {
  const { result } = renderHook(() => useFormatDate('month', 'YYYY/MM/DD'));

  expect(result.current()).toBe('');
  expect(result.current(dayjs('2020.01.01'))).toBe('2020/01/01');
});

test('测试 useFormatDate format () => string', () => {
  const { result } = renderHook(() => useFormatDate('month', date => '1111'));

  expect(result.current()).toBe('');
  expect(result.current(dayjs('2020.01.01'))).toBe('1111');
});
