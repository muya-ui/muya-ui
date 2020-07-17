import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { cleanup } from '@testing-library/react';

import CascaderPanel from './CascaderPanel';
import { ICascaderExpandTrigger, ICascaderPlacement } from './types';

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
        ],
      },
      {
        label: '绍兴',
        value: 'shaoxing',
      },
      {
        label: '金华',
        value: 'jinhua',
      },
      {
        label: '台州',
        value: 'taizhou',
      },
      {
        label: '温州',
        value: 'wenzhou',
      },
      {
        label: '宁波',
        value: 'ningbo',
      },
      {
        label: '嘉兴',
        value: 'jiaxing',
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
  {
    label: '江苏',
    value: 'js',
    children: [
      {
        label: '南京',
        value: 'nanjing',
      },
      {
        label: '苏州',
        value: 'suzhou',
      },
    ],
  },
  {
    label: '安徽',
    value: 'ah',
    children: [
      {
        label: '合肥',
        value: 'hefei',
      },
    ],
  },
  {
    label: '四川',
    value: 'sc',
    disabled: true,
    children: [
      {
        label: '成都',
        value: 'chengdu',
      },
    ],
  },
  {
    label: '香港',
    value: 'xg',
    loading: true,
  },
];

const panelDefaultProps = {
  options,
  checkedKeys: { checked: [], halfChecked: [] },
  loadingKeys: [],
  loadedKeys: [],
  multiple: false,
  activeValue: ['bj', 'haidian'],
  fieldNames: { label: 'label', value: 'value', children: 'children', isLeaf: 'isLeaf' },
  expandTrigger: 'click' as ICascaderExpandTrigger,
  visible: true,
  placement: 'top-start' as ICascaderPlacement,
  menuReverse: false,
  onLoad: async () => {},
  onSelect: () => {},
  onDeselect: () => {},
};

describe('CascaderPanel', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  afterEach(() => {
    cleanup();
  });

  test('测试 CascaderPanel 正常 render', () => {
    const wrapper = renderer
      .create(
        <>
          <CascaderPanel
            {...panelDefaultProps}
            menusWidth={[100, 120, 140]}
            placement="bottom-start"
            styles={{
              menu: 'custom-menu',
            }}
          />
          <CascaderPanel {...panelDefaultProps} menuReverse />
          <CascaderPanel {...panelDefaultProps} multiple />
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
