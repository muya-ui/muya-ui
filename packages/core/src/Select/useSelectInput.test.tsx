/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import React, { ReactElement } from 'react';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import { muyaThemeLight } from '@muya-ui/theme-light';
import { renderHook } from '@testing-library/react-hooks';

import { Option } from './index';
import {
  ISelectDeselectTriggerEvent,
  ISelectInputProps,
  ISelectMode,
  ISelectMultiValueType,
} from './types';
import useSelectInput from './useSelectInput';
import { getOptionsFromChildren } from './utils';

const children: ReactElement[] = [];
for (let i = 10; i < 36; i++) {
  const key = i.toString(36) + i;
  children.push(
    <Option key={key} value={key}>
      {key}
    </Option>,
  );
}

const options = getOptionsFromChildren(children);

const onClear = sinon.spy();
const onSelect = sinon.spy();
const onDeselect = sinon.spy();
const onInputChange = sinon.spy();
const onAddTag = sinon.spy();

const defaultProps = {
  theme: muyaThemeLight,
  allOptions: options,
  mode: 'default' as ISelectMode,
  allowClear: true,
  placeholder: '请选择',
  maxVerticalTagCount: 2.5,
  showSearch: false,
  inputValue: '',
  popupVisible: false,
  value: [] as ISelectMultiValueType,
  isMultiple: false,
  hasValue: false,
  isSearchMode: false,
  labelInValue: false,
  backfill: false,
  hideExpandIcon: false,
  defaultActiveFirstOption: false,
  onClear,
  onSelect,
  onDeselect,
  onInputChange,
  onAddTag,
} as ISelectInputProps;

describe('useSelectInput', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('method:getDefaultModeLabel', () => {
    const { result, unmount, rerender } = renderHook(props => useSelectInput(props), {
      initialProps: {
        ...defaultProps,
      },
    });
    // 默认
    expect(result.current.getDefaultModeLabel()).toEqual('');
    rerender({
      ...defaultProps,
      value: ['c12'],
    });
    // 从 option 中取
    expect(result.current.getDefaultModeLabel()).toEqual('c12');
    rerender({
      ...defaultProps,
      value: ['c13'],
    });
    // 从 labelInValue 中取
    expect(result.current.getDefaultModeLabel()).toEqual('c13');
    rerender({
      ...defaultProps,
      labelInValue: true,
      value: [{ value: 'c13', label: 'muya' }],
    });
    // 取不到
    expect(result.current.getDefaultModeLabel()).toEqual('muya');
    unmount();
  });

  test('method:optionByValue', () => {
    const { result, unmount } = renderHook(props => useSelectInput(props), {
      initialProps: {
        ...defaultProps,
      },
    });
    expect(result.current.optionByValue('d13')).toEqual(options['d13']);
    expect(result.current.optionByValue({ value: 'e14' })).toEqual(options['e14']);
    expect(result.current.optionByValue('d14')).toEqual({ value: 'd14' });
    expect(result.current.optionByValue({ value: 'e15', label: 'e15' })).toEqual({
      value: 'e15',
      label: 'e15',
    });
    unmount();
  });

  test('method:labelByValue', () => {
    const { result, unmount } = renderHook(props => useSelectInput(props), {
      initialProps: {
        ...defaultProps,
      },
    });
    expect(result.current.labelByValue('d13')).toEqual('d13');
    expect(result.current.labelByValue({ value: 'e14' })).toEqual('e14');
    expect(result.current.labelByValue({ value: 'none', label: 'muya' })).toEqual('muya');
    expect(result.current.labelByValue({ value: 'none' })).toEqual('none');
    unmount();
  });

  test('method:handleRemoveTag', () => {
    const onDeselect = sinon.spy();
    const { result, unmount } = renderHook(props => useSelectInput(props), {
      initialProps: {
        ...defaultProps,
        value: ['c12', 'd13'],
        onDeselect,
      },
    });
    const event = {} as ISelectDeselectTriggerEvent;
    result.current.handleRemoveTag('d13', 1, event);
    expect(() => {
      sinon.assert.calledWith(onDeselect, options['d13'], 1, event);
    }).not.toThrow();
    unmount();
  });

  test('method:handleInput', () => {
    const onSearch = sinon.spy();
    const onInput = sinon.spy();
    const { result, unmount } = renderHook(props => useSelectInput(props), {
      initialProps: {
        ...defaultProps,
        mode: 'tags' as ISelectMode,
        maxTagTextLength: 5,
        value: ['c12', 'd13'],
        isSearchMode: true,
        onSearch,
        onInput,
      },
    });
    const event = {} as React.FormEvent<HTMLInputElement>;
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    event.target = { value: '12345' } as HTMLInputElement;
    result.current.handleInput(event);
    expect(() => {
      sinon.assert.calledOnce(onSearch);
      sinon.assert.calledOnce(onInput);
    }).not.toThrow();
    unmount();
  });
});
