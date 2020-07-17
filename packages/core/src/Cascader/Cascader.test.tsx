import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { cleanup } from '@testing-library/react';

import Cascader from './Cascader';

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
        disabled: true,
      },
    ],
  },
];

describe('Cascader', () => {
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

  test('测试 Cascader 正常 render', () => {
    const wrapper = renderer
      .create(
        <>
          <Cascader id="test" triggerId="trigger1" inputWidth="80%" options={options} />
          <Cascader triggerId="trigger2" options={options} disabled />
          <Cascader triggerId="trigger3" options={options} disabled>
            <span>[切换城市]</span>
          </Cascader>
          <Cascader
            id="test"
            triggerId="trigger4"
            defaultValue={[['fj', 'quanzhou']]}
            options={options}
            multiple
          />
          <Cascader
            id="test"
            triggerId="trigger5"
            styles={{ inputWrapper: 'custom-input-wrapper' }}
            defaultValue={[['fj', 'quanzhou'], ['bj', 'chaoyang']]}
            options={options}
            multiple
            collapseTags
          />
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
