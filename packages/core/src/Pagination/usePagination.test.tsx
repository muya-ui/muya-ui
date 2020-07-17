import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import usePagination from './usePagination';

test('prevents out-of-range initial page', () => {
  const hook = renderHook(() =>
    usePagination({
      current: 20, // << higher than numberOfPages
      midSideWidth: 2,
      pageSize: 10,
      totalRecords: 100,
    }),
  );
  expect(hook.result.current.finalCurrent).toBe(10);

  const leftHook = renderHook(() =>
    usePagination({
      current: 0, // << lower than numberOfPages
      midSideWidth: 2,
      pageSize: 10,
      totalRecords: 100,
    }),
  );
  expect(leftHook.result.current.finalCurrent).toBe(1);
});

test('自定义 pageSizeOptions', () => {
  const { result } = renderHook(() =>
    usePagination({
      pageSizeOptions: [10],
    }),
  );
  expect(result.current.pageSizeOptions).toEqual([10]);
});

test('current 受控但值超出范围', () => {
  const { result } = renderHook(() =>
    usePagination({
      defaultCurrent: -10,
    }),
  );
  expect(result.current.finalCurrent).toEqual(1);
});

test('page size 变化处理函数', () => {
  const onPageSizeChange = sinon.spy();
  const { result } = renderHook(() =>
    usePagination({
      onPageSizeChange,
      defaultCurrent: -10,
    }),
  );
  act(() => {
    result.current.handlePageSizeChange(30);
  });
  expect(result.current.finalPageSize).toBe(30);
  expect(() => {
    sinon.assert.calledWith(onPageSizeChange, 30);
  }).not.toThrow();
});

test('左右翻页', () => {
  const { result } = renderHook((props: any) =>
    usePagination({
      totalRecords: 200,
    }),
  );
  act(() => {
    result.current.handleNext();
  });
  expect(result.current.finalCurrent).toBe(2);
  act(() => {
    result.current.handlePrev();
  });
  expect(result.current.finalCurrent).toBe(1);
});

test('current 受控时，simpleQuickJumperValue 使用受控的值', () => {
  const { result, rerender } = renderHook(
    (props: any) =>
      usePagination({
        current: props.current,
        totalRecords: 200,
      }),
    {
      initialProps: {
        current: 10,
      },
    },
  );
  rerender({ current: 20 });

  expect(result.current.simpleQuickJumperValue).toBe('20');
});

test('current 受控且 focus 时，simpleQuickJumperValue 使用 state 的值', () => {
  const { result } = renderHook(
    (props: any) =>
      usePagination({
        current: props.current,
        totalRecords: 200,
      }),
    {
      initialProps: {
        current: 10,
      },
    },
  );
  act(() => {
    result.current.handleSimpleQuickJumperInputFocus({} as any);
    result.current.handleSimpleQuickJumperInputChange({
      target: {
        value: '12',
      },
    } as any);
  });
  expect(result.current.simpleQuickJumperValue).toBe('12');

  act(() => {
    result.current.handleSimpleQuickJumperInputBlur();
  });
  expect(result.current.simpleQuickJumperValue).toBe('10');
});

test('simpleQuickJumper blur 时 值不合法', async () => {
  const { result } = renderHook(
    (props: any) =>
      usePagination({
        current: props.current,
        totalRecords: 200,
      }),
    {
      initialProps: {
        current: 10,
      },
    },
  );
  act(() => {
    result.current.handleSimpleQuickJumperInputFocus({} as any);
    result.current.handleSimpleQuickJumperInputChange({
      target: {
        value: 'ssssdf',
      },
    } as any);
  });
  expect(result.current.simpleQuickJumperValue).toBe('ssssdf');
  act(() => {
    result.current.handleSimpleQuickJumperInputBlur();
  });
  expect(result.current.simpleQuickJumperValue).toBe('10');
});
