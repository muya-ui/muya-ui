import React, { useState } from 'react';

import { ISelectValueType, Option, Select } from '@muya-ui/core';

import { ISelectMultiValueType } from '../types';

const data = [
  { id: 1, name: '现代简约' },
  { id: 2, name: '新中式' },
  { id: 3, name: '北欧' },
  { id: 4, name: '欧式' },
  { id: 5, name: '田园' },
  { id: 6, name: '地中海' },
  { id: 7, name: '简欧' },
  { id: 8, name: '日式' },
  { id: 9, name: '美式' },
  { id: 10, name: '混搭' },
  { id: 11, name: '简美' },
  { id: 12, name: '后现代' },
  { id: 13, name: '工装' },
];

export default function MultipleDemo() {
  const [value, setValue] = useState<ISelectMultiValueType>([]);
  const onChange = (value: ISelectValueType) => {
    console.log('selected:', value);
    setValue(value as ISelectMultiValueType);
  };
  return (
    <Select
      mode="multiple"
      placeholder="Please select"
      value={value}
      onChange={onChange}
      allowClear
    >
      {data.map(item => (
        <Option key={`${item.id}`} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
}

export const meta = {
  title: '多选',
  desc: '多选，从已有条目中选择',
};
