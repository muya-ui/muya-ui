import React from 'react';

import { Option, Select } from '@muya-ui/core';

export default function WidthDemo() {
  return (
    <>
      <Select defaultValue="one" width="50%">
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="three">选项三</Option>
      </Select>
      <Select defaultValue="one" width={200}>
        <Option value="one">选项一</Option>
      </Select>
    </>
  );
}

export const meta = {
  title: '自定义宽度',
  desc: '支持百分比宽度和固定宽度两种',
};
