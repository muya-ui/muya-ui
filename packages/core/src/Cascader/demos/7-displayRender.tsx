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

export default function DisplayRenderDemo() {
  const displayRender = (labels: React.ReactText[]) => {
    if (labels.length > 0) {
      return labels[labels.length - 1] as string;
    }
    return '';
  };
  return <Cascader options={options} displayRender={displayRender} />;
}

export const meta = {
  title: '仅显示子选项',
  desc: '级联选择器的选项默认显示为全部，也可以通过 `displayRender` 可支持仅显示子选项',
};
