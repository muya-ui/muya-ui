import React from 'react';

import { Option, Select } from '@muya-ui/core';

export default function NoOptionDemo() {
  return (
    <>
      <Select defaultValue="four">
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
        <Option value="three">选项三</Option>
      </Select>
      <Select defaultValue={{ label: '选项四', value: 'four' }}>
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
        <Option value="three">选项三</Option>
      </Select>
    </>
  );
}

export const meta = {
  title: '选项不存在',
  desc:
    '某些情况下，可能存在传入的 `value` 对应的选项不存在的情况，此类情况下会将 `value` 作为选项显示。如果此时开启了 `labelInValue` 那么会取 `value.label`。',
};
