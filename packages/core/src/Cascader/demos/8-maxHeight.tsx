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
  },
];

export default function MaxHeightDemo() {
  return <Cascader options={options} />;
}

export const meta = {
  title: '下拉框最大高度',
  desc: '与下拉选择器保持一致：最大显示高度为 6.5 项，第 7 条截断一半，同时出现滚动条。',
};
