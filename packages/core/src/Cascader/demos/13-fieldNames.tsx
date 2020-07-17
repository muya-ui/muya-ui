import React from 'react';

import { Cascader } from '@muya-ui/core';

const options = [
  {
    name: '福建',
    area: 'fj',
    cities: [
      {
        name: '福州',
        area: 'fuzhou',
        cities: [
          {
            name: '马尾',
            area: 'mawei',
          },
        ],
      },
      {
        name: '泉州',
        area: 'quanzhou',
      },
    ],
  },
  {
    name: '浙江',
    area: 'zj',
    cities: [
      {
        name: '杭州',
        area: 'hangzhou',
        cities: [
          {
            name: '余杭',
            area: 'yuhang',
          },
          {
            name: '江干',
            area: 'jianggan',
          },
        ],
      },
    ],
  },
  {
    name: '北京',
    area: 'bj',
    cities: [
      {
        name: '朝阳区',
        area: 'chaoyang',
      },
      {
        name: '海淀区',
        area: 'haidian',
      },
    ],
  },
];

export default function BasicDemo() {
  return (
    <Cascader options={options} fieldNames={{ label: 'name', value: 'area', children: 'cities' }} />
  );
}

export const meta = {
  title: '自定义字段名',
  desc: '可以通过 `fieldNames` 自定义 options 中 `label`、`value`、`children` 的键名。',
};
