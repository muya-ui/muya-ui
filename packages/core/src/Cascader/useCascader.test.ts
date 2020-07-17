import React from 'react';
import mockConsole from 'test/utils/mockConsole';

import { muyaThemeLight } from '@muya-ui/theme-light';
import { renderHook } from '@testing-library/react-hooks';

import { KeyCode } from '../utils/keyCode';
import { wait } from '@muya-ui/utils';
import { ICascaderOptionType, ICascaderPlacement, ICascaderValueType } from './types';
import useCascader from './useCascader';

const options = [
  {
    label: '福建',
    value: 'fj',
    children: [
      {
        label: '福州',
        value: 'fuzhou',
        children: [
          {
            label: '马尾',
            value: 'mawei',
          },
        ],
      },
      {
        label: '泉州',
        value: 'quanzhou',
        isLeaf: false,
      },
    ],
  },
  {
    label: '浙江',
    value: 'zj',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          {
            label: '余杭',
            value: 'yuhang',
          },
          {
            label: '江干',
            value: 'jianggan',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    label: '北京',
    value: 'bj',
    children: [
      {
        label: '朝阳区',
        value: 'chaoyang',
      },
      {
        label: '海淀区',
        value: 'haidian',
      },
    ],
  },
];

const defaultProps = {
  options,
  theme: muyaThemeLight,
  placement: 'top-start' as ICascaderPlacement,
  changeOnSelect: false,
};

describe('useCascader', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });
  const inputRef = React.createRef<HTMLInputElement>();

  test('单选、点击', () => {
    const { result, unmount, rerender } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        popupVisible: true,
      },
    });
    result.current.panelProps.onSelect(options[0], 0, { type: 'click' } as React.MouseEvent);
    expect(result.current.panelProps.activeValue).toEqual(['fj']);
    expect(result.current.inputProps.inputValue).toEqual('');
    rerender({
      ...defaultProps,
      popupVisible: true,
      changeOnSelect: true,
    });
    result.current.panelProps.onSelect(options[0].children[0], 1, {
      type: 'click',
    } as React.MouseEvent);
    expect(result.current.panelProps.activeValue).toEqual(['fj', 'fuzhou']);
    expect(result.current.inputProps.inputValue).toEqual('福建/福州');
    result.current.panelProps.onSelect(
      {
        label: '马尾',
        value: 'mawei',
      },
      2,
      { type: 'click' } as React.MouseEvent,
    );
    expect(result.current.panelProps.activeValue).toEqual(['fj', 'fuzhou', 'mawei']);
    expect(result.current.inputProps.inputValue).toEqual('福建/福州/马尾');
    result.current.panelProps.onSelect(
      {
        label: '江干',
        value: 'jianggan',
        disabled: true,
      },
      2,
      { type: 'click' } as React.MouseEvent,
    );
    expect(result.current.panelProps.activeValue).toEqual(['fj', 'fuzhou', 'mawei']);
    expect(result.current.inputProps.inputValue).toEqual('福建/福州/马尾');
    unmount();
  });

  test('单选、点击、loadData', async () => {
    const loadData = (activeOptions: ICascaderOptionType[]) =>
      new Promise<void>(resolve => {
        const targetOption = activeOptions[activeOptions.length - 1];
        setTimeout(() => {
          targetOption.children = [
            {
              label: `${targetOption.label} 动态 1`,
              value: 'dynamic1',
            },
            {
              label: `${targetOption.label} 动态 2`,
              value: 'dynamic2',
            },
          ];
          resolve();
        }, 100);
      });
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        popupVisible: true,
        options: [
          {
            value: 'zj',
            label: '浙江',
            isLeaf: false,
          },
          {
            value: 'js',
            label: '江苏',
            isLeaf: false,
          },
        ],
        changeOnSelect: true,
        loadData,
      },
    });
    await result.current.panelProps.onSelect(
      {
        label: '浙江',
        value: 'zj',
        isLeaf: false,
      },
      0,
      { type: 'click' } as React.MouseEvent,
    );
    expect(result.current.panelProps.activeValue).toEqual(['zj']);
    await result.current.panelProps.onSelect(
      {
        label: '浙江 动态 1',
        value: 'dynamic1',
      },
      1,
      {} as React.MouseEvent,
    );
    expect(result.current.panelProps.activeValue).toEqual(['zj', 'dynamic1']);
    unmount();
  });

  test('loadData 预加载 options', async () => {
    const loadData = (activeOptions: ICascaderOptionType[]) =>
      new Promise<void>(resolve => {
        const targetOption = activeOptions[activeOptions.length - 1];
        setTimeout(() => {
          targetOption.children = [
            {
              label: `${targetOption.label} 动态 1`,
              value: 'dynamic1',
            },
            {
              label: `${targetOption.label} 动态 2`,
              value: 'dynamic2',
            },
          ];
          resolve();
        }, 10);
      });
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        value: ['zj', 'dynamic2'],
        options: [
          {
            value: 'zj',
            label: '浙江',
            isLeaf: false,
          },
          {
            value: 'js',
            label: '江苏',
            isLeaf: false,
          },
        ],
        changeOnSelect: true,
        loadData,
      },
    });
    await wait.time(50);
    expect(result.current.panelProps.options[0].children).toEqual([
      {
        label: '浙江 动态 1',
        value: 'dynamic1',
      },
      {
        label: '浙江 动态 2',
        value: 'dynamic2',
      },
    ]);
    unmount();
  });

  test('多选、点击 checkbox', () => {
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        popupVisible: true,
        multiple: true,
      },
    });
    result.current.panelProps.onSelect(options[2], 0, { type: 'change' } as React.ChangeEvent);
    expect(result.current.panelProps.activeValue).toEqual(['bj']);
    expect(result.current.inputProps.inputValue).toEqual(['北京/朝阳区', '北京/海淀区']);
    expect(result.current.panelProps.checkedKeys.checked).toEqual(['bj', 'chaoyang', 'haidian']);
    result.current.panelProps.onDeselect(
      [
        {
          label: '朝阳区',
          value: 'chaoyang',
        },
      ],
      { type: 'change' } as React.MouseEvent,
    );
    expect(result.current.panelProps.activeValue).toEqual(['bj']);
    expect(result.current.inputProps.inputValue).toEqual(['北京/海淀区']);
    expect(result.current.panelProps.checkedKeys.checked).toEqual(['haidian']);
    expect(result.current.panelProps.checkedKeys.halfChecked).toEqual(['bj']);
    unmount();
  });

  test('单选、键盘', () => {
    const onKeyDown = jest.fn(() => {});
    const { result, rerender, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        onKeyDown: () => {},
        children: React.createElement('div', {
          onKeyDown,
        }),
      },
    });
    const event = {
      type: 'keydown',
      stopPropagation: () => {},
      preventDefault: () => {},
    } as React.KeyboardEvent<HTMLInputElement>;
    event.keyCode = KeyCode.ENTER;
    result.current.inputProps.onKeyDown!(event);
    expect(onKeyDown).toBeCalledTimes(1);
    rerender({
      ...defaultProps,
      onKeyDown: () => {},
      children: React.createElement('div'),
    });
    event.keyCode = KeyCode.F1;
    result.current.inputProps.onKeyDown!(event);
    event.keyCode = KeyCode.DOWN;
    result.current.inputProps.onKeyDown!(event);
    expect(result.current.inputProps.popupVisible).toBe(true);
    result.current.inputProps.onKeyDown!(event);
    expect(result.current.panelProps.activeValue).toEqual(['fj']);
    event.keyCode = KeyCode.ENTER;
    result.current.inputProps.onKeyDown!(event);
    event.keyCode = KeyCode.DOWN;
    result.current.inputProps.onKeyDown!(event);
    result.current.inputProps.onKeyDown!(event);
    event.keyCode = KeyCode.UP;
    result.current.inputProps.onKeyDown!(event);
    event.keyCode = KeyCode.RIGHT;
    result.current.inputProps.onKeyDown!(event);
    event.keyCode = KeyCode.LEFT;
    result.current.inputProps.onKeyDown!(event);
    event.keyCode = KeyCode.ESC;
    result.current.inputProps.onKeyDown!(event);
    expect(result.current.inputProps.popupVisible).toBe(false);
    unmount();
  });

  test('单选，清除', () => {
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        popupVisible: true,
        changeOnSelect: true,
      },
    });
    result.current.panelProps.onSelect(options[1], 0, { type: 'click' } as React.ChangeEvent);
    expect(result.current.inputProps.inputValue).toEqual('浙江');
    const event = {
      type: 'click',
    } as React.MouseEvent;
    result.current.inputProps.onClear!(event);
    expect(result.current.inputProps.inputValue).toEqual('');
    unmount();
  });

  test('多选，清除', () => {
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        checkStrictly: true,
        popupVisible: true,
        multiple: true,
      },
    });
    result.current.panelProps.onSelect(
      {
        label: '海淀区',
        value: 'haidian',
      },
      1,
      { type: 'change' } as React.ChangeEvent,
    );
    expect(result.current.inputProps.inputValue).toEqual(['北京/海淀区']);
    expect(result.current.panelProps.checkedKeys.checked).toEqual(['haidian']);
    const event = {
      type: 'click',
    } as React.MouseEvent;
    result.current.inputProps.onClear!(event);
    expect(result.current.inputProps.inputValue).toEqual([]);
    expect(result.current.panelProps.checkedKeys.checked).toEqual([]);
    unmount();
  });

  test('tag 删除，collapseTags：true', () => {
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        popupVisible: true,
        multiple: true,
        collapseTags: true,
      },
    });
    result.current.panelProps.onSelect(options[0], 0, { type: 'change' } as React.ChangeEvent);
    expect(result.current.inputProps.inputValue).toEqual(['福建/福州/马尾', '1+']);
    result.current.inputProps.onRemoveTag('', 1, { type: 'click' } as React.MouseEvent);
    expect(result.current.inputProps.inputValue).toEqual(['福建/福州/马尾']);
    unmount();
  });

  test('tag 删除，collapseTags：false', () => {
    const { result, unmount } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        popupVisible: true,
        multiple: true,
        collapseTags: false,
      },
    });
    result.current.panelProps.onSelect(options[2], 0, { type: 'change' } as React.ChangeEvent);
    expect(result.current.inputProps.inputValue).toEqual(['北京/朝阳区', '北京/海淀区']);
    result.current.inputProps.onRemoveTag('', 1, { type: 'click' } as React.MouseEvent);
    expect(result.current.inputProps.inputValue).toEqual(['北京/朝阳区']);
    unmount();
  });

  test('单选受控', () => {
    let value: ICascaderValueType[] = ['bj', 'chaoyang'];
    const handlePopupVisibleChange = jest.fn();
    const handleChange = jest.fn(newValue => {
      value = newValue;
    });
    const { result, unmount, rerender } = renderHook(props => useCascader(props, inputRef), {
      initialProps: {
        ...defaultProps,
        value,
        onChange: handleChange,
        popupVisible: true,
        getPopupContainer: () => document.body,
        onPopupVisibleChange: handlePopupVisibleChange,
      },
    });
    result.current.panelProps.onSelect(options[2].children[1], 1, {
      type: 'click',
    } as React.MouseEvent);
    expect(handleChange).toBeCalledWith(value, [options[2], options[2].children[1]]);
    expect(value).toEqual(['bj', 'haidian']);
    rerender({
      ...defaultProps,
      value,
      onChange: handleChange,
      popupVisible: false,
      getPopupContainer: () => document.body,
      onPopupVisibleChange: handlePopupVisibleChange,
    });
    expect(result.current.panelProps.activeValue).toEqual(['bj', 'haidian']);
    unmount();
  });
});
