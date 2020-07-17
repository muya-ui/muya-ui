import deepmerge from 'deepmerge';
import mockConsole from 'test/utils/mockConsole';

import { renderHook } from '@testing-library/react-hooks';

import { ITreeProps } from './types';
import { useTree } from './useTree';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: '普通条目#0#0#0', key: '0-0-0-0' },
          { title: '普通条目#0#0#1', key: '0-0-0-1' },
          { title: '普通条目#0#0#2', key: '0-0-0-2' },
        ],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [
          { title: '普通条目#0#1#0', key: '0-0-1-0' },
          { title: '普通条目#0#1#1', key: '0-0-1-1' },
          { title: '普通条目#0#1#2', key: '0-0-1-2' },
        ],
      },
      {
        title: '成组条目#0#2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '成组条目#1',
    key: '0-1',
    children: [
      { title: '普通条目#1#0#0', key: '0-1-0-0' },
      { title: '普通条目#1#0#1', key: '0-1-0-1' },
      { title: '普通条目#1#0#2', key: '0-1-0-2' },
    ],
  },
  {
    title: '成组条目#2',
    key: '0-2',
  },
];

const defaultProps = {
  data: treeData,
};

describe('useTree', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });
  afterAll(() => {
    mockConsole.restoreError();
  });
  test('getDerivedStateFromProps', async () => {
    const { result, rerender } = renderHook((props: ITreeProps) => useTree(props), {
      initialProps: {
        ...defaultProps,
        expandedKeys: [],
      },
    });
    // keyEntities
    expect(result.current.keyEntities['0-0'].level).toBe(0);
    const newTreeData = deepmerge([], treeData);
    newTreeData[0].key = 'muya';
    rerender({
      ...defaultProps,
      data: newTreeData,
      expandedKeys: [],
    });
    expect(result.current.keyEntities['muya'].level).toBe(0);
    // expandedKeys
    rerender({
      ...defaultProps,
      data: newTreeData,
      expandedKeys: ['0-0-0'],
    });
    expect(result.current.expandedKeys).toEqual(['0-0-0']);
    rerender({
      ...defaultProps,
      data: newTreeData,
      expandedKeys: ['0-0-0'],
      autoExpandParent: true,
    });
    expect(result.current.expandedKeys).toEqual(['0-0-0']);
    const newExpandedKeys = ['0-0-1'];
    rerender({
      ...defaultProps,
      data: newTreeData,
      expandedKeys: newExpandedKeys,
      autoExpandParent: true,
      defaultExpandAll: false,
    });
    expect(result.current.expandedKeys).toEqual(['0-0-1', 'muya']);
    rerender({
      ...defaultProps,
      data: newTreeData,
      expandedKeys: newExpandedKeys,
      autoExpandParent: true,
      defaultExpandAll: true,
    });
    expect(result.current.expandedKeys).toEqual(Object.keys(result.current.keyEntities));
    // selectedKeys
    rerender({
      ...defaultProps,
      data: newTreeData,
      selectable: true,
      selectedKeys: ['muya', '0-0-1'],
    });
    expect(result.current.selectedKeys).toEqual(['muya']);
    rerender({
      ...defaultProps,
      data: newTreeData,
      selectable: true,
      multiple: true,
      selectedKeys: ['muya', '0-0-1'],
    });
    expect(result.current.selectedKeys).toEqual(['muya', '0-0-1']);
    // checkedKeys
    rerender({
      ...defaultProps,
      data: newTreeData,
      checkable: true,
      checkedKeys: ['0-0-0'],
    });
    expect(result.current.checkedKeys).toEqual(['0-0-0']);
    const newCheckedKeys = ['0-0-1'];
    rerender({
      ...defaultProps,
      data: newTreeData,
      checkable: true,
      checkedKeys: newCheckedKeys,
    });
    expect(result.current.checkedKeys).toEqual(['0-0-1', '0-0-1-0', '0-0-1-1', '0-0-1-2']);
    rerender({
      ...defaultProps,
      data: treeData,
      checkable: true,
      checkedKeys: newCheckedKeys,
    });
    expect(result.current.checkedKeys).toEqual(['0-0-1', '0-0-1-0', '0-0-1-1', '0-0-1-2']);
    // loadedKeys
    rerender({
      ...defaultProps,
      data: newTreeData,
      loadedKeys: [],
    });
    expect(result.current.loadedKeys).toEqual([]);
  });
});
