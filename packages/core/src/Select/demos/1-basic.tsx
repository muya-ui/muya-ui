import React from 'react';

import { ISelectValueType, Option, Select } from '@muya-ui/core';

const onChange = (value: ISelectValueType) => {
  console.log('selected: ', value);
};

export default function BasicDemo() {
  return (
    <>
      <Select allowClear defaultValue="one" onChange={onChange}>
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="three">选项三</Option>
      </Select>
      <Select defaultValue="one" disabled>
        <Option value="one">选项一</Option>
      </Select>
    </>
  );
}

export const meta = {
  title: '基本',
  desc: '最简单的选择器。',
};
