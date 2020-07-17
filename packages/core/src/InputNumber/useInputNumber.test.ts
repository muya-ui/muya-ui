import React from 'react';
import useInputNumber from './useInputNumber';
import { act, renderHook } from '@testing-library/react-hooks';

test('set initValue over max or blow min', () => {
  const { result } = renderHook(() =>
    useInputNumber(
      {
        focus: () => {},
        min: 5,
        max: 10,
        defaultValue: 11,
      },
      false,
    ),
  );
  expect(result.current.inputValue).toBe('10');
  const { result: r1 } = renderHook(() =>
    useInputNumber(
      {
        focus: () => {},
        min: 5,
        max: 10,
        value: 4,
      },
      true,
    ),
  );
  expect(r1.current.inputValue).toBe('5');
});

test('no max and min', () => {
  const fn = jest.fn();
  const { result } = renderHook(() =>
    useInputNumber(
      {
        onChange: fn,
        focus: () => {},
      },
      false,
    ),
  );
  act(() => {
    const e = {
      target: {
        value: '5',
      },
    };
    result.current.handleChange(e as React.ChangeEvent<HTMLInputElement>);
  });
  expect(result.current.inputValue).toBe('5');
});

test('中文输入法', () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const { result } = renderHook(() =>
    useInputNumber(
      {
        focus: () => {},
        onCompositionEnd: fn2,
        onCompositionStart: fn1,
      },
      false,
    ),
  );
  act(() => {
    result.current.handleComposition(true, {} as React.CompositionEvent<HTMLInputElement>);
  });
  expect(fn1).toBeCalled();
  act(() => {
    result.current.handleComposition(false, {} as React.CompositionEvent<HTMLInputElement>);
  });
  expect(fn2).toBeCalled();
});

test('showValue', () => {
  const fn = jest.fn();
  const { result } = renderHook(() =>
    useInputNumber(
      {
        focus: () => {},
        onChange: fn,
      },
      false,
    ),
  );
  act(() => {
    result.current.handleFocus({} as React.FocusEvent<HTMLInputElement>);
    const e = {
      target: {
        value: '1.0',
      },
    };
    result.current.handleChange(e as React.ChangeEvent<HTMLInputElement>);
  });
  expect(result.current.inputValue).toBe('1.0');
  expect(fn.mock.calls[0][0]).toBe('1.0');
});
