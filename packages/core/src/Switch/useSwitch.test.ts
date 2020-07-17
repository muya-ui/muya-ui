import React, { createRef } from 'react';
import mockConsole from 'test/utils/mockConsole';

import { muyaThemeLight } from '@muya-ui/theme-light';
import { renderHook } from '@testing-library/react-hooks';

import { KeyCode } from '../utils/keyCode';
import useSwitch from './useSwitch';

const nodeRef = createRef<HTMLDivElement>();

describe('useSwitch', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });
  test('method:onKeyDown', () => {
    const { result, unmount, rerender } = renderHook(props => useSwitch(props, nodeRef), {
      initialProps: {
        theme: muyaThemeLight,
        defaultChecked: false,
        disabled: false,
      },
    });
    const event = {} as React.KeyboardEvent;
    event.keyCode = KeyCode.RIGHT;
    result.current.onKeyDown(event);
    expect(result.current.checkedState).toBe(true);
    event.keyCode = KeyCode.LEFT;
    result.current.onKeyDown(event);
    expect(result.current.checkedState).toBe(false);
    rerender({
      theme: muyaThemeLight,
      defaultChecked: false,
      disabled: true,
    });
    result.current.onKeyDown(event);
    unmount();
  });
  test('method:onMouseUp', () => {
    const onMouseUp = jest.fn(() => {});
    const { result, unmount } = renderHook(props => useSwitch(props, nodeRef), {
      initialProps: {
        theme: muyaThemeLight,
        defaultChecked: false,
        onMouseUp,
      },
    });
    const event = {} as React.MouseEvent;
    result.current.onMouseUp(event);
    expect(onMouseUp).toBeCalledTimes(1);
    unmount();
  });
  test('method:onClick', () => {
    const onChange = jest.fn(() => {});
    const onClick = jest.fn(() => {});
    const stopPropagation = jest.fn(() => {});
    const { result, unmount, rerender } = renderHook(props => useSwitch(props, nodeRef), {
      initialProps: {
        theme: muyaThemeLight,
        checked: false,
        disabled: true,
        onClick,
        onChange,
      },
    });
    const event = {} as React.MouseEvent;
    event.stopPropagation = stopPropagation;
    result.current.onClick(event);
    expect(onClick).toBeCalledTimes(0);
    expect(onChange).toBeCalledTimes(0);
    expect(stopPropagation).toBeCalledTimes(1);
    rerender({
      theme: muyaThemeLight,
      checked: false,
      disabled: false,
      onClick,
      onChange,
    });
    result.current.onClick(event);
    expect(onClick).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(true, event);
    expect(result.current.checkedState).toBe(false);
    unmount();
  });
});
