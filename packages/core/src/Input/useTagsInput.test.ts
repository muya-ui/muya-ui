import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { KeyCode } from '../utils/keyCode';
import useTagsInput from './useTagsInput';

const contentRef = React.createRef<HTMLDivElement>();
const sizerRef = React.createRef<HTMLDivElement>();
const inputRef = React.createRef<HTMLInputElement>();

describe('useTagsInput', () => {
  test('focus', () => {
    const onFocus = sinon.spy();
    const { result } = renderHook(props => useTagsInput(props, contentRef, sizerRef, inputRef), {
      initialProps: {
        onFocus,
      },
    });
    const event = {};
    act(() => {
      result.current.handleFocus(event as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.focus).toBe(true);
    expect(() => {
      sinon.assert.calledOnce(onFocus);
    }).not.toThrow();
  });

  test('focus disabled', () => {
    const onFocus = sinon.spy();
    const stopPropagation = sinon.spy();
    const { result } = renderHook(props => useTagsInput(props, contentRef, sizerRef, inputRef), {
      initialProps: {
        disabled: true,
        onFocus,
      },
    });
    const event: any = {
      stopPropagation,
    };
    act(() => {
      result.current.handleFocus(event as React.FocusEvent<HTMLInputElement>);
    });
    expect(() => {
      sinon.assert.calledOnce(stopPropagation);
      sinon.assert.notCalled(onFocus);
    }).not.toThrow();
  });

  test('blur', () => {
    const { result, rerender } = renderHook((fn: () => void) =>
      useTagsInput(
        {
          onBlur: fn,
        },
        contentRef,
        sizerRef,
        inputRef,
      ),
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

  test('blur disabled', () => {
    const onBlur = sinon.spy();
    const { result } = renderHook(() =>
      useTagsInput(
        {
          onBlur,
          disabled: true,
        },
        contentRef,
        sizerRef,
        inputRef,
      ),
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

  test('handleClick', () => {
    const onClick = sinon.spy();
    const stopPropagation = sinon.spy();
    const { result } = renderHook(() =>
      useTagsInput(
        {
          disabled: false,
          onClick,
        },
        contentRef,
        sizerRef,
        inputRef,
      ),
    );
    const event: any = {
      stopPropagation,
      currentTarget: 1,
      target: 1,
    };

    act(() => {
      result.current.handleClick(event as React.MouseEvent<HTMLDivElement>);
    });

    expect(() => {
      sinon.assert.calledOnce(stopPropagation);
      sinon.assert.calledOnce(onClick);
    }).not.toThrow();
  });

  test('handleClear', () => {
    const onClear = sinon.spy();
    const onChange = sinon.spy();
    const onInputChange = sinon.spy();
    const { result } = renderHook(() =>
      useTagsInput(
        {
          defaultValue: ['ss', 'sss'],
          defaultInputValue: 'ss',
          onClear,
          onChange,
          onInputChange,
        },
        contentRef,
        sizerRef,
        inputRef,
      ),
    );

    act(() => {
      result.current.handleClear({
        stopPropagation: () => {},
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.inputValue).toBe('');
    expect(result.current.value).toEqual([]);

    expect(() => {
      sinon.assert.calledOnce(onClear);
      sinon.assert.calledOnce(onChange);
      sinon.assert.calledOnce(onInputChange);
    }).not.toThrow();
  });

  test('handleClear 受控', () => {
    const { result } = renderHook(() =>
      useTagsInput(
        {
          value: ['ss', 'sss'],
          inputValue: 'ss',
        },
        contentRef,
        sizerRef,
        inputRef,
      ),
    );

    act(() => {
      result.current.handleClear({
        stopPropagation: () => {},
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.inputValue).toBe('ss');
    expect(result.current.value).toEqual(['ss', 'sss']);
  });

  test('handleInput', () => {
    const onInput = sinon.spy();
    const { result } = renderHook(() =>
      useTagsInput(
        {
          maxTagTextLength: 5,
          onInput,
        },
        contentRef,
        sizerRef,
        inputRef,
      ),
    );
    const event = {} as React.FormEvent<HTMLInputElement>;
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    event.target = { value: '12345' } as HTMLInputElement;
    act(() => {
      result.current.handleInput(event);
    });
    expect(result.current.inputValue).toBe('12345');
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    event.target = { value: '123456' } as HTMLInputElement;
    act(() => {
      result.current.handleInput(event);
    });
    expect(result.current.inputValue).toBe('12345');
  });

  test('handleInputKeyDown', () => {
    const onInputKeyDown = sinon.spy();
    const onChange = sinon.spy();
    const onRemoveTag = sinon.spy();
    const onAddTag = sinon.spy();
    const { result, rerender } = renderHook(
      props => useTagsInput(props, contentRef, sizerRef, inputRef),
      {
        initialProps: {
          inputValue: '1',
          defaultValue: ['tag1', 'tag2'],
          allowAdd: false,
          onInputKeyDown,
          onChange,
          onRemoveTag,
          onAddTag,
        },
      },
    );
    const event = {} as React.KeyboardEvent<HTMLInputElement>;
    event.keyCode = KeyCode.BACKSPACE;
    act(() => {
      result.current.handleInputKeyDown(event);
    });
    expect(() => {
      sinon.assert.notCalled(onInputKeyDown);
    }).not.toThrow();
    rerender({
      inputValue: '',
      defaultValue: ['tag1', 'tag2'],
      allowAdd: false,
      onInputKeyDown,
      onChange,
      onRemoveTag,
      onAddTag,
    });
    act(() => {
      result.current.handleInputKeyDown(event);
    });
    expect(result.current.value).toEqual(['tag1']);
    expect(() => {
      sinon.assert.calledOnce(onChange);
      sinon.assert.calledOnce(onRemoveTag);
    }).not.toThrow();
    rerender({
      inputValue: 'tag3',
      defaultValue: ['tag1'],
      allowAdd: true,
      onInputKeyDown,
      onChange,
      onRemoveTag,
      onAddTag,
    });
    event.keyCode = KeyCode.ENTER;
    act(() => {
      result.current.handleInputKeyDown(event);
    });
    expect(result.current.value).toEqual(['tag1', 'tag3']);
    expect(() => {
      sinon.assert.calledTwice(onChange);
      sinon.assert.calledOnce(onAddTag);
    }).not.toThrow();
  });
});
