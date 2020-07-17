import React, { useState } from 'react';

import { Cascader, ICascaderOptionType, ICascaderValueType, InlineButton } from '@muya-ui/core';

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

export default function CustomDisplayDemo() {
  const [text, setText] = useState('未选择');
  const onChange = (
    value: ICascaderValueType[] | ICascaderValueType[][],
    selectedOptions: ICascaderOptionType[] = [],
  ) => {
    const len = selectedOptions.length;
    if (len > 0) {
      const last = selectedOptions[len - 1];
      setText(`${last.label || last.value}`);
    } else {
      setText('');
    }
  };
  return (
    <span>
      {text}
      &nbsp;
      <Cascader options={options} onChange={onChange}>
        <InlineButton className="link">[切换城市]</InlineButton>
      </Cascader>
    </span>
  );
}

export const meta = {
  title: '自定义显示',
  desc: '使用 `onChange` 实现切换按钮和结果分开。',
};
