import React from 'react';

import { ISelectValueType, Option, Select } from '@muya-ui/core';

function onChange(value: ISelectValueType) {
  console.log('selected: ', value);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(value: string) {
  console.log('search: ', value);
}

export default function SearchDemo() {
  return (
    <Select
      showSearch
      placeholder="Please select"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
    >
      <Option value="one" label="One"></Option>
      <Option value="two" label="Two"></Option>
      <Option value="three" label="Three"></Option>
    </Select>
  );
}

export const meta = {
  title: '带搜索框',
  desc: '展开后可对选项进行搜索',
};
