import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useRangeInput from './useRangeInput';

test('useRangeInput', () => {
  const { result, rerender } = renderHook(
    (disabled: boolean) =>
      useRangeInput({
        disabled,
      }),
    {
      initialProps: false,
    },
  );

  expect(result.current.finalValue).toEqual(['', '']);
  const blur = sinon.spy();
  (result.current.leftInputRef as any).current = { blur };
  (result.current.rightInputRef as any).current = { blur };
  rerender(true);
  expect(() => {
    sinon.assert.calledTwice(blur);
  }).not.toThrow();
});

test('useRangeInput focus', () => {
  const { result, rerender } = renderHook((fn: () => void) =>
    useRangeInput({
      onFocus: fn,
    }),
  );

  const event = {};
  act(() => {
    result.current.handleFocus(event as React.FocusEvent<HTMLInputElement>);
  });
  const onFocus = sinon.spy();
  rerender(onFocus);
  act(() => {
    result.current.handleFocus(event as React.FocusEvent<HTMLInputElement>);
  });
  expect(result.current.focus).toBe(true);
  expect(() => {
    sinon.assert.calledOnce(onFocus);
  }).not.toThrow();
});

test('useRangeInput focus disabled', () => {
  const onFocus = sinon.spy();
  const { result } = renderHook(() =>
    useRangeInput({
      onFocus,
      disabled: true,
    }),
  );
  const event: any = {
    stopPropagation: sinon.spy(),
  };
  act(() => {
    result.current.handleFocus(event as React.FocusEvent<HTMLInputElement>);
  });
  expect(() => {
    sinon.assert.notCalled(onFocus);
  }).not.toThrow();
});

test('useRangeInput blur', () => {
  const { result, rerender } = renderHook((fn: () => void) =>
    useRangeInput({
      onBlur: fn,
    }),
  );

  const onBlur = sinon.spy();
  const event = {};

  act(() => {
    result.current.handleBlur(event as React.FocusEvent<HTMLInputElement>);
  });
  rerender(onBlur);
  act(() => {
    result.current.handleBlur(event as React.FocusEvent<HTMLInputElement>);
  });
  expect(() => {
    sinon.assert.calledOnce(onBlur);
  }).not.toThrow();
});

test('useRangeInput blur disabled', () => {
  const onBlur = sinon.spy();
  const { result } = renderHook(() =>
    useRangeInput({
      onBlur,
      disabled: true,
    }),
  );
  const event: any = {
    stopPropagation: sinon.spy(),
  };

  act(() => {
    result.current.handleBlur(event as React.FocusEvent<HTMLInputElement>);
  });
  expect(() => {
    sinon.assert.notCalled(onBlur);
  }).not.toThrow();
});

test('useRangeInput handleClick', () => {
  const focus = sinon.spy();
  const { result, rerender } = renderHook((fn: () => void) =>
    useRangeInput({
      onClick: fn,
    }),
  );
  const event: any = {
    currentTarget: 1,
    target: 1,
  };

  act(() => {
    result.current.handleClick(event as React.MouseEvent<HTMLDivElement>);
    (result.current.leftInputRef as any).current = { focus };
    result.current.handleClick(event as React.MouseEvent<HTMLDivElement>);
  });

  const onClick = sinon.spy();
  rerender(onClick);

  act(() => {
    result.current.handleClick(event as React.MouseEvent<HTMLDivElement>);
    (result.current.leftInputRef as any).current = { focus };
    result.current.handleClick(event as React.MouseEvent<HTMLDivElement>);
  });
  expect(() => {
    sinon.assert.calledTwice(onClick);
    sinon.assert.called(focus);
  }).not.toThrow();
});

test('useRangeInput handleClear handleKeyDown', () => {
  const onClear = sinon.spy();
  const onPressEnter = sinon.spy();

  const focus = sinon.spy();
  const { result } = renderHook(() =>
    useRangeInput({
      onClear,
      onPressEnter,
      focusWhenClear: true,
    }),
  );

  act(() => {
    const event: any = {
      stopPropagation: sinon.spy(),
    };
    (result.current.leftInputRef as any).current = { focus };
    result.current.handleClear(event as React.MouseEvent<HTMLDivElement>);
  });

  act(() => {
    const event: any = {
      keyCode: 13,
    };
    result.current.handleKeyDown(event as React.KeyboardEvent<HTMLInputElement>);
  });

  expect(() => {
    sinon.assert.called(onClear);
    sinon.assert.called(onPressEnter);
    sinon.assert.called(focus);
  }).not.toThrow();
});

interface IProps {
  value?: [string, string];
  onChange?: () => void;
}
test('useRangeInput setInputValue', () => {
  const onChange = sinon.spy();
  const { result, rerender } = renderHook((props: IProps) => useRangeInput(props), {
    initialProps: {
      value: ['ss', 'sss'],
      onChange,
    },
  });
  const event: any = {
    target: {
      value: 'aa',
    },
  };

  act(() => {
    result.current.handleLeftChange(event as React.ChangeEvent<HTMLInputElement>);
    result.current.handleRightChange(event as React.ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.finalValue).toEqual(['ss', 'sss']);

  expect(() => {
    sinon.assert.calledTwice(onChange);
  }).not.toThrow();

  act(() => {
    const event = { stopPropagation() {} };
    result.current.handleClear(event as React.MouseEvent<HTMLElement>);
  });
  // 受控不改变
  expect(result.current.finalValue).toEqual(['ss', 'sss']);

  rerender({
    onChange,
  });

  act(() => {
    const event = { stopPropagation() {} };
    result.current.handleClear(event as React.MouseEvent<HTMLElement>);
  });
  // 不受控改变
  expect(result.current.finalValue).toEqual(['', '']);
});
