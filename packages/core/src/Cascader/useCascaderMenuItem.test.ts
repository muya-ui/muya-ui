import React from 'react';
import mockConsole from 'test/utils/mockConsole';

import { renderHook } from '@testing-library/react-hooks';

import { ICascaderPlacement, ICascaderExpandTrigger } from './types';
import useCascaderMenuItem from './useCascaderMenuItem';
import { wait } from '@muya-ui/utils';

const option = {
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
    },
  ],
};

const defaultProps = {
  menuIndex: 0,
  option,
  loading: false,
  loaded: false,
  active: true,
  activeOptionsRef: React.createRef<HTMLDivElement[]>(),
  className: '',
  expandTrigger: 'hover' as ICascaderExpandTrigger,
  checkedKeys: {
    checked: [],
    halfChecked: [],
  },
  fieldNames: {
    value: 'value',
    label: 'label',
    children: 'children',
    isLeaf: 'isLeaf',
  },
  multiple: false,
  onLoad: async () => {},
  onSelect: () => {},
  onDeselect: () => {},
  placement: 'top-start' as ICascaderPlacement,
};

describe('useCascaderMenuItem', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });
  test('handleSelect', () => {
    const handleSelect = jest.fn();
    // @ts-ignore
    const { result, unmount } = renderHook(props => useCascaderMenuItem(props), {
      initialProps: {
        ...defaultProps,
        onSelect: handleSelect,
      },
    });
    result.current.handleSelect();
    expect(handleSelect).toBeCalledTimes(1);
    unmount();
  });
  test('handleCheck', () => {
    const handleSelect = jest.fn();
    const handleDeselect = jest.fn();
    // @ts-ignore
    const { result, unmount } = renderHook(props => useCascaderMenuItem(props), {
      initialProps: {
        ...defaultProps,
        multiple: true,
        onSelect: handleSelect,
        onDeselect: handleDeselect,
      },
    });
    result.current.handleCheck({
      target: {
        checked: true,
      },
    });
    expect(handleSelect).toBeCalledTimes(1);
    result.current.handleCheck({
      target: {
        checked: false,
      },
    });
    expect(handleDeselect).toBeCalledTimes(1);
    unmount();
  });
  test('handleMouseEvent', async () => {
    const handleSelect = jest.fn();
    const persist = jest.fn();
    // @ts-ignore
    const { result, unmount, rerender } = renderHook(props => useCascaderMenuItem(props), {
      initialProps: {
        ...defaultProps,
        option: {
          label: '福建',
          value: 'fj',
          isLeaf: true,
        },
        onSelect: handleSelect,
      },
    });
    result.current.handleMouseEvent();
    expect(handleSelect).toBeCalledTimes(0);
    rerender({
      ...defaultProps,
      option: {
        label: '福建',
        value: 'fj',
        isLeaf: false,
      },
      onSelect: handleSelect,
    });
    result.current.handleMouseEvent({
      persist,
    });
    await wait.time(200);
    expect(persist).toBeCalledTimes(1);
    expect(handleSelect).toBeCalledTimes(1);
    unmount();
  });
});
