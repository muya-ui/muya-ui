import React from 'react';

import { Cascader } from '@muya-ui/core';

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

export default function ControlDemo() {
  return <Cascader options={options} defaultValue={['bj', 'chaoyang']} />;
}

export const meta = {
  title: '默认选中',
  desc: '可使用 `value` 和 `defaultValue` 实现默认选中，区别为组件是否受控',
};
