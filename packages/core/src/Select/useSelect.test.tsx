import React, { ReactElement } from 'react';
import mockConsole from 'test/utils/mockConsole';

import { muyaThemeLight } from '@muya-ui/theme-light';
import { renderHook } from '@testing-library/react-hooks';

import { ITagInputAddEvent } from '../Input';
import { Option } from './index';
import {
  IFilterFunc,
  ISelectDeselectTriggerEvent,
  ISelectMode,
  ISelectOptionState,
  ISelectProps,
  ISelectSelectTriggerEvent,
  ISelectValueType,
} from './types';
import useSelect from './useSelect';
import { getOptionsFromChildren } from './utils';
import { KeyCode } from '../utils/keyCode';

const children: ReactElement[] = [];
for (let i = 10; i < 36; i++) {
  const key = i.toString(36) + i;
  if (i === 15) {
    children.push(
      <Option key={key} value={key} disabled>
        {key}
      </Option>,
    );
  } else {
    children.push(
      <Option key={key} value={key}>
        {key}
      </Option>,
    );
  }
}

const options = getOptionsFromChildren(children);
const nodeRef = React.createRef<HTMLDivElement>();
const inputRef = React.createRef<HTMLInputElement>();
const menuRef = React.createRef<HTMLDivElement>();
const firstSelectedItemRef = React.createRef<HTMLDivElement>();

describe('useSelect', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });
  test('method:filteredOptions', () => {
    const { result, unmount, rerender } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          filterOption: false as boolean | IFilterFunc,
          children,
        },
      },
    );
    expect(result.current.options).toEqual(options);
    rerender({
      filterOption: true,
      children,
    });
    expect(result.current.options).toEqual(options);
    result.current.handleInputChange('a');
    expect(result.current.filteredOptions).toEqual({
      a10: options['a10'],
    });
    rerender({
      filterOption: (inputValue: string, option: ISelectOptionState) => {
        const { label = '', value } = option;
        if (
          `${label}`.indexOf(inputValue) >= 0 ||
          `${value}`.indexOf(inputValue) >= 0 ||
          value === 'c12'
        ) {
          return true;
        }
        return false;
      },
      children,
    });
    expect(result.current.filteredOptions).toEqual({
      a10: options['a10'],
      c12: options['c12'],
    });
    unmount();
  });

  test('method:optionSelectedIndex', () => {
    const { result, unmount, rerender } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          value: ['c12'] as ISelectValueType,
          theme: muyaThemeLight,
          labelInValue: false,
          children,
        },
      },
    );
    expect(result.current.optionSelectedIndex(options['c12'])).toBe(0);
    rerender({
      value: [{ value: 'c12' }, { value: 'd13' }],
      theme: muyaThemeLight,
      labelInValue: true,
      children,
    });
    expect(result.current.optionSelectedIndex(options['d13'])).toBe(1);
    expect(result.current.optionSelectedIndex(options['e14'])).toBe(-1);
    unmount();
  });

  test('method:handleInputKeyDown 单选上下移动及 disabled、enter', () => {
    const { result, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          defaultValue: ['c12'] as ISelectValueType,
          theme: muyaThemeLight,
          labelInValue: false,
          children,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const event = {
      keyCode: KeyCode.ENTER,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.KeyboardEvent;
    result.current.handleInputKeyDown(event);
    event.keyCode = KeyCode.DOWN;
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('d13');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('e14');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('g16');
    event.keyCode = KeyCode.UP;
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('e14');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('d13');
    event.keyCode = KeyCode.ENTER;
    result.current.handleInputKeyDown(event);
    expect(result.current.valueState).toEqual(['d13']);
    result.current.handleInputKeyDown(event);
    result.current.handleInputKeyDown(event);
    expect(result.current.valueState).toEqual(['d13']);
    result.current.handleInputKeyDown(event);
    expect(result.current.popupVisibleState).toEqual(true);
    event.keyCode = KeyCode.ESC;
    result.current.handleInputKeyDown(event);
    expect(result.current.popupVisibleState).toEqual(false);
    unmount();
  });

  test('method:handleInputKeyDown 多选上下移动及 disabled、enter', () => {
    const { result, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          defaultValue: ['c12'] as ISelectValueType,
          theme: muyaThemeLight,
          mode: 'multiple' as ISelectMode,
          labelInValue: false,
          children,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const event = {
      keyCode: KeyCode.ENTER,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.KeyboardEvent;
    result.current.handleInputKeyDown(event);
    event.keyCode = KeyCode.DOWN;
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('d13');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('e14');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('g16');
    event.keyCode = KeyCode.UP;
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('e14');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('d13');
    event.keyCode = KeyCode.ENTER;
    result.current.handleInputKeyDown(event);
    expect(result.current.valueState).toEqual(['c12', 'd13']);
    event.keyCode = KeyCode.DOWN;
    result.current.handleInputKeyDown(event);
    event.keyCode = KeyCode.ENTER;
    result.current.handleInputKeyDown(event);
    expect(result.current.valueState).toEqual(['c12', 'd13', 'e14']);
    result.current.handleInputKeyDown(event);
    expect(result.current.valueState).toEqual(['c12', 'd13']);
    expect(result.current.popupVisibleState).toEqual(true);
    event.keyCode = KeyCode.ESC;
    result.current.handleInputKeyDown(event);
    expect(result.current.popupVisibleState).toEqual(false);
    event.keyCode = KeyCode.LEFT;
    result.current.handleInputKeyDown(event);
    expect(result.current.popupVisibleState).toEqual(false);
    unmount();
  });

  test('method:handleInputKeyDown 向上边界移动', () => {
    const { result, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          value: ['a10'] as ISelectValueType,
          theme: muyaThemeLight,
          labelInValue: false,
          children,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const event = {
      keyCode: KeyCode.UP,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.KeyboardEvent;
    result.current.handlePopupVisibleChange(true);
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('z35');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('y34');
    unmount();
  });

  test('method:handleInputKeyDown 向下边界移动', () => {
    const { result, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          value: ['z35'] as ISelectValueType,
          theme: muyaThemeLight,
          labelInValue: false,
          children,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const event = {
      keyCode: KeyCode.DOWN,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.KeyboardEvent;
    result.current.handlePopupVisibleChange(true);
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('a10');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('b11');
    unmount();
  });

  test('method:handleInputKeyDown 未选中', () => {
    const { result, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          value: [] as ISelectValueType,
          theme: muyaThemeLight,
          labelInValue: false,
          children,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const event = {
      keyCode: KeyCode.DOWN,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.KeyboardEvent;
    result.current.handlePopupVisibleChange(true);
    expect(result.current.activeKey).toBe('');
    result.current.handleInputKeyDown(event);
    expect(result.current.activeKey).toBe('a10');
    unmount();
  });

  test('method:handleOptionMouseEnter', () => {
    const { result, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          value: ['a10'] as ISelectValueType,
          theme: muyaThemeLight,
          labelInValue: false,
          children,
        },
      },
    );
    result.current.handleOptionMouseEnter({} as React.MouseEvent);
    expect(result.current.activeKey).toBe('');
    const outerMouseEnter = jest.fn();
    result.current.handleOptionMouseEnter({} as React.MouseEvent, outerMouseEnter);
    expect(result.current.activeKey).toBe('');
    expect(outerMouseEnter).toBeCalledTimes(1);
    unmount();
  });

  test('method:onExited', () => {
    const { result, unmount, rerender } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          mode: 'default' as ISelectMode,
          showSearch: true,
          backfill: true,
          labelInValue: false,
          inputValue: '',
          value: ['c12'],
          children,
        },
      },
    );
    result.current.handlePopupExited();
    expect(result.current.inputValue).toBe('c12');
    rerender({
      mode: 'default' as ISelectMode,
      showSearch: true,
      backfill: true,
      labelInValue: true,
      inputValue: '',
      value: ['c12'],
      children,
    });
    result.current.handlePopupExited();
    expect(result.current.inputValue).toBe('');
    rerender({
      mode: 'default' as ISelectMode,
      showSearch: true,
      backfill: true,
      labelInValue: false,
      inputValue: '',
      value: [],
      children,
    });
    result.current.handlePopupExited();
    expect(result.current.inputValue).toBe('');
    rerender({
      mode: 'default' as ISelectMode,
      showSearch: true,
      backfill: false,
      labelInValue: false,
      inputValue: '',
      value: [],
      children,
    });
    result.current.handlePopupExited();
    expect(result.current.inputValue).toBe('');
    unmount();
  });

  test('method:onPopupVisibleChange', () => {
    const { result, rerender, unmount } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        initialProps: {
          value: [] as ISelectValueType,
          onPopupVisibleChange: () => {},
          children,
        } as ISelectProps,
      },
    );
    result.current.handlePopupVisibleChange(true);
    expect(result.current.popupVisibleState).toBe(true);
    rerender({
      value: [] as ISelectValueType,
      popupVisible: true,
      onPopupVisibleChange: () => {},
      children,
    });
    unmount();
  });

  test('method:handleSelect', () => {
    const stopPropagation = jest.fn(() => {});
    const onSelect = jest.fn(() => {});
    const onChange = jest.fn(() => {});
    const { result, unmount, rerender } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          defaultValue: [] as ISelectValueType,
          labelInValue: false,
          mode: 'default' as ISelectMode,
          maxTagCount: 10,
          onChange,
          onSelect,
          children,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const event = {} as ISelectSelectTriggerEvent;
    event.stopPropagation = stopPropagation;
    result.current.handleSelect({ value: 'c12', disabled: true }, true, event);
    expect(stopPropagation).toBeCalledTimes(1);
    expect(onSelect).toBeCalledTimes(0);
    result.current.handleSelect({ value: 'd13' }, true, event);
    expect(stopPropagation).toBeCalledTimes(1);
    expect(onSelect).toBeCalledTimes(1);
    result.current.handleClear({} as React.MouseEvent);
    rerender({
      defaultValue: [] as ISelectValueType,
      labelInValue: false,
      mode: 'multiple',
      maxTagCount: 10,
      onSelect,
      onChange,
      children,
    });
    result.current.handleSelect({ value: 'c12' }, true, event);
    expect(stopPropagation).toBeCalledTimes(1);
    expect(onSelect).toBeCalledTimes(2);
    expect(result.current.valueState).toEqual(['c12']);
    result.current.handleClear({} as React.MouseEvent);
    rerender({
      defaultValue: [] as ISelectValueType,
      labelInValue: true,
      mode: 'multiple',
      maxTagCount: 10,
      onSelect,
      onChange,
      children,
    });
    result.current.handleSelect({ value: 'd13' }, true, event);
    expect(stopPropagation).toBeCalledTimes(1);
    expect(onSelect).toBeCalledTimes(3);
    expect(result.current.valueState).toEqual([
      {
        label: undefined,
        value: 'd13',
      },
    ]);
    result.current.handleClear({} as React.MouseEvent);
    rerender({
      defaultValue: [] as ISelectValueType,
      labelInValue: true,
      mode: 'default',
      maxTagCount: 10,
      onSelect,
      onChange,
      children,
    });
    result.current.handleSelect({ value: 'e14' }, false, event);
    expect(onSelect).toBeCalledTimes(4);
    expect(result.current.valueState).toEqual([
      {
        label: undefined,
        value: 'e14',
      },
    ]);
    result.current.handleClear({} as React.MouseEvent);
    unmount();
  });

  test('method:handleDeselect', () => {
    const stopPropagation = jest.fn(() => {});
    const onDeselect = jest.fn(() => {});
    const onChange = jest.fn(() => {});
    const { result, unmount, rerender } = renderHook(
      props => useSelect(props, nodeRef, inputRef, menuRef, firstSelectedItemRef),
      {
        initialProps: {
          defaultValue: [] as ISelectValueType,
          labelInValue: false,
          mode: 'multiple' as ISelectMode,
          onChange,
          onDeselect,
          children,
        },
      },
    );
    const event = {} as React.SyntheticEvent;
    event.stopPropagation = stopPropagation;
    result.current.handleSelect({ value: 'c12' }, false, event as ISelectSelectTriggerEvent);
    result.current.handleDeselect(
      { value: 'c12', disabled: true },
      0,
      event as ISelectDeselectTriggerEvent,
    );
    expect(onDeselect).toBeCalledTimes(0);
    result.current.handleDeselect({ value: 'c12' }, 0, event as ISelectDeselectTriggerEvent);
    expect(stopPropagation).toBeCalledTimes(1);
    expect(onDeselect).toBeCalledTimes(1);
    result.current.handleClear({} as React.MouseEvent);
    rerender({
      defaultValue: [] as ISelectValueType,
      labelInValue: true,
      mode: 'tags',
      onChange,
      onDeselect,
      children,
    });
    result.current.handleAddTag('aaa', event as ITagInputAddEvent);
    result.current.handleSelect({ value: 'aaa' }, true, event as ISelectSelectTriggerEvent);
    result.current.handleDeselect({ value: 'aaa' }, 0, event as ISelectDeselectTriggerEvent);
    expect(onDeselect).toBeCalledTimes(2);
    result.current.handleClear({} as React.MouseEvent);
    unmount();
  });
});
