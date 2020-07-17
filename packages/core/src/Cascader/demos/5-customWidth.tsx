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

export default function CustomWidthDemo() {
  return <Cascader inputWidth={100} options={options} menusWidth={80} />;
}

export const meta = {
  title: '可配置宽度',
  desc: `选择器的宽度可配置，在表单中与上下输入框保持一致，在容器中不超出容器的内容区域，文字过多时截断。

下拉面板宽度可配置（每级宽度都保持一致），选项内容过长时可做截断。`,
};
