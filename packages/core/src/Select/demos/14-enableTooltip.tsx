import React from 'react';

import { Option, Select, EllipsisContent } from '@muya-ui/core';

const options = [
  { value: 'one', label: '选项一选项一选项一选项一选项一选项一选项一' },
  { value: 'two', label: '选项二选项二选项二选项二选项二选项二选项二' },
  { value: 'three', label: '选项三选项三选项三选项三选项三选项三选项三' },
];

export default function enableTooltipDemo() {
  return (
    <Select defaultValue="one">
      {options.map(option => (
        <Option key={option.value} value={option.value} label={option.label}>
          <EllipsisContent lineHeight="32px">{option.label}</EllipsisContent>
        </Option>
      ))}
    </Select>
  );
}

export const meta = {
  title: '文本溢出展示 Tooltip',
  desc: '文本溢出默认只会省略文本，可以设置 `enableTooltip` 开启 `Tooltip`',
};
