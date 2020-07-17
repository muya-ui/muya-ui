import React from 'react';
import mockConsole from 'test/utils/mockConsole';

import { renderHook } from '@testing-library/react-hooks';

import { IMenuMode, IMenuProps } from './types';
import { useMenu } from './useMenu';

const defaultProps = {
  mode: 'vertical' as IMenuMode,
  selectable: true,
  multiple: false,
  accordion: false,
  children: <></>,
};

const rootMenuRef = React.createRef<HTMLDivElement>();

describe('useTree', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('open 非受控逻辑', () => {
    const onOpenChange = jest.fn();
    const { result } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        defaultOpenKeys: [],
        onOpenChange,
      },
    });
    result.current.handleOpenChange({
      key: 'sub1',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onOpenChange).toBeCalledTimes(1);
    result.current.handleOpenChange({
      key: 'sub2',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub1', 'sub2']);
    expect(onOpenChange).toBeCalledTimes(2);
    result.current.handleOpenChange({
      key: 'sub2',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub1', 'sub2']);
    expect(onOpenChange).toBeCalledTimes(2);
    result.current.handleOpenChange({
      key: 'sub1',
      item: React.createRef(),
      open: false,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub2']);
    expect(onOpenChange).toBeCalledTimes(3);
  });

  test('open 受控逻辑', () => {
    const onOpenChange = jest.fn();
    const { result, rerender } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        openKeys: [],
        onOpenChange,
      },
    });
    result.current.handleOpenChange({
      key: 'sub1',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(onOpenChange).toBeCalledTimes(1);
    rerender({
      ...defaultProps,
      openKeys: ['sub1'],
      onOpenChange,
    });
    expect(result.current.openKeys).toStrictEqual(['sub1']);
  });

  test('手风琴模式', () => {
    const { result } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        defaultOpenKeys: [],
        accordion: true,
      },
    });
    result.current.handleOpenChange({
      key: 'sub1',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    result.current.handleOpenChange({
      key: 'sub2',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: true,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub2']);
    result.current.handleOpenChange({
      key: 'sub2-1',
      item: React.createRef(),
      open: true,
      parentIsRootMenu: false,
      trigger: 'click',
    });
    expect(result.current.openKeys).toStrictEqual(['sub2', 'sub2-1']);
  });

  test('单选非受控逻辑', () => {
    const onItemSelect = jest.fn();
    const onItemDeselect = jest.fn();
    const onOpenChange = jest.fn();
    const { result } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        defaultSelectedKeys: [],
        defaultOpenKeys: ['sub1'],
        onItemSelect,
        onItemDeselect,
        onOpenChange,
      },
    });
    result.current.handleItemSelect({
      key: 'item1',
      keyPath: ['sub1', 'item1'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: [],
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1']);
    expect(result.current.openKeys).toStrictEqual([]);
    expect(onItemSelect).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalledTimes(1);
    result.current.handleItemDeselect({
      key: 'item1',
      keyPath: ['sub1', 'item1'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: ['item1'],
    });
    expect(result.current.selectedKeys).toStrictEqual([]);
    expect(result.current.openKeys).toStrictEqual([]);
    expect(onItemDeselect).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalledTimes(1);
  });

  test('单选非受控逻辑，inline Mode', () => {
    const onItemSelect = jest.fn();
    const onOpenChange = jest.fn();
    const { result } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        defaultSelectedKeys: ['item1'],
        defaultOpenKeys: ['sub1'],
        mode: 'inline',
        onItemSelect,
        onOpenChange,
      },
    });
    result.current.handleItemSelect({
      key: 'item2',
      keyPath: ['sub1', 'item2'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: [],
    });
    expect(result.current.selectedKeys).toStrictEqual(['item2']);
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onItemSelect).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalledTimes(0);
  });

  test('多选逻辑', () => {
    const onItemSelect = jest.fn();
    const onItemDeselect = jest.fn();
    const onOpenChange = jest.fn();
    const { result } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        defaultSelectedKeys: ['item1'],
        defaultOpenKeys: ['sub1'],
        multiple: true,
        onItemSelect,
        onItemDeselect,
        onOpenChange,
      },
    });
    result.current.handleItemSelect({
      key: 'item2',
      keyPath: ['sub1', 'item2'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: ['item1'],
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1', 'item2']);
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onItemSelect).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalledTimes(0);
    result.current.handleItemDeselect({
      key: 'item1',
      keyPath: ['sub1', 'item1'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: ['item1', 'item2'],
    });
    expect(result.current.selectedKeys).toStrictEqual(['item2']);
    expect(onItemDeselect).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalledTimes(0);
    result.current.handleItemSelect({
      key: 'item3',
      keyPath: ['sub1', 'item3'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: ['item2'],
    });
    result.current.handleItemSelect({
      key: 'item1',
      keyPath: ['sub1', 'item1'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: ['item2', 'item3'],
    });
    expect(result.current.selectedKeys).toStrictEqual(['item2', 'item3', 'item1']);
    expect(onItemSelect).toBeCalledTimes(3);
    expect(onOpenChange).toBeCalledTimes(0);
  });

  test('受控逻辑', () => {
    const onItemSelect = jest.fn();
    const { result, rerender } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        multiple: true,
        selectedKeys: ['item1'],
        defaultOpenKeys: ['sub1'],
        onItemSelect,
      },
    });
    result.current.handleItemSelect({
      key: 'item2',
      keyPath: ['sub1', 'item2'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: [],
    });
    rerender({
      ...defaultProps,
      multiple: true,
      selectedKeys: ['item1', 'item2'],
      defaultOpenKeys: ['sub1'],
      onItemSelect,
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1', 'item2']);
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onItemSelect).toBeCalledTimes(1);
    result.current.handleItemSelect({
      key: 'item1',
      keyPath: ['sub1', 'item1'],
      item: React.createRef(),
      nativeEvent: {} as React.MouseEvent,
      selectedKeys: ['item1', 'item2'],
    });
    rerender({
      ...defaultProps,
      multiple: true,
      selectedKeys: ['item2'],
      defaultOpenKeys: ['sub1'],
      onItemSelect,
    });
    expect(result.current.selectedKeys).toStrictEqual(['item2']);
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onItemSelect).toBeCalledTimes(2);
  });

  test('inlineCollapsed 受控逻辑', () => {
    const onOpenChange = jest.fn();
    const { result, rerender } = renderHook((props: IMenuProps) => useMenu(props, rootMenuRef), {
      initialProps: {
        ...defaultProps,
        defaultSelectedKeys: ['item1'],
        defaultOpenKeys: ['sub1'],
        mode: 'inline',
        inlineCollapsed: false,
        onOpenChange,
      },
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1']);
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onOpenChange).toBeCalledTimes(1);
    rerender({
      ...defaultProps,
      defaultSelectedKeys: ['item1'],
      defaultOpenKeys: ['sub1'],
      mode: 'inline',
      inlineCollapsed: true,
      onOpenChange,
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1']);
    expect(result.current.openKeys).toStrictEqual([]);
    expect(onOpenChange).toBeCalledTimes(2);
    rerender({
      ...defaultProps,
      defaultSelectedKeys: ['item1'],
      openKeys: ['sub1'],
      mode: 'inline',
      inlineCollapsed: false,
      onOpenChange,
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1']);
    expect(result.current.openKeys).toStrictEqual(['sub1']);
    expect(onOpenChange).toBeCalledTimes(3);
    rerender({
      ...defaultProps,
      defaultSelectedKeys: ['item1'],
      openKeys: [],
      mode: 'inline',
      inlineCollapsed: true,
      onOpenChange,
    });
    expect(result.current.selectedKeys).toStrictEqual(['item1']);
    expect(result.current.openKeys).toStrictEqual([]);
    expect(onOpenChange).toBeCalledTimes(4);
  });
});
