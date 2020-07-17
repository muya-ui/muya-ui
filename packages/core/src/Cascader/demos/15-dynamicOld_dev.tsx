import React, { useState } from 'react';

import { Cascader, ICascaderOptionType, ICascaderValueType } from '@muya-ui/core';

const options = [
  {
    value: '浙江',
    label: '浙江',
    isLeaf: false,
  },
  {
    value: '江苏',
    label: '江苏',
    isLeaf: false,
  },
];

export default function DynamicDemo() {
  const [optionsState, setOptionsState] = useState(options);
  const onChange = (
    value: ICascaderValueType[] | ICascaderValueType[][],
    selectedOptions: ICascaderOptionType[],
  ) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions: ICascaderOptionType[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} 动态 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} 动态 2`,
          value: 'dynamic2',
        },
      ];

      setOptionsState([...optionsState]);
    }, 1000);
  };
  return <Cascader options={optionsState} onChange={onChange} loadData={loadData} changeOnSelect />;
}

export const meta = {
  title: '动态加载选项（旧）',
  desc: '使用 `loadData` 实现动态加载选项。',
};
