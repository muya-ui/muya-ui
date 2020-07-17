import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { ICascaderExpandTrigger, ICascaderPlacement } from './types';
import useCascaderPanel from './useCascaderPanel';

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
  checkedKeys: { checked: [], halfChecked: [] },
  multiple: false,
  activeValue: [],
  options,
  fieldNames: { label: 'label', value: 'value', children: 'children' },
  expandTrigger: 'click' as ICascaderExpandTrigger,
  visible: true,
  placement: 'bottom-start' as ICascaderPlacement,
  menuReverse: false,
  onSelect: jest.fn(),
  onDeselect: jest.fn(),
};

describe('useCascaderPanel', () => {
  const activeOptionsRef = {
    current: [],
  } as React.MutableRefObject<HTMLElement[]>;
  test('method:isActiveOption', () => {
    const { result, unmount } = renderHook(props => useCascaderPanel(props, activeOptionsRef), {
      initialProps: {
        ...defaultProps,
        activeValue: ['bj', 'haidian'],
      },
    });
    const { isActiveOption } = result.current;
    expect(isActiveOption(options[2], 0)).toBe(true);
    expect(isActiveOption(options[2].children[0], 1)).toBe(false);
    expect(isActiveOption(options[2].children[1], 1)).toBe(true);
    unmount();
  });
  test('method:showOptions', () => {
    const { result, unmount } = renderHook(props => useCascaderPanel(props, activeOptionsRef), {
      initialProps: {
        ...defaultProps,
        activeValue: ['bj', 'haidian'],
      },
    });
    const { showOptions } = result.current;
    expect(showOptions).toEqual([options, options[2].children]);
    unmount();
  });
});
