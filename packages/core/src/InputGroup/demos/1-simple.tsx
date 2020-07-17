import React, { useState } from 'react';

import {
  InputGroup,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Cascader,
  RangeInput,
  Option,
  AutoComplete,
  RadioGroup,
} from '@muya-ui/core';
import { IComponentSizeSpec } from '@muya-ui/theme-light';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default function Simple() {
  const [dataSource, setDataSource] = useState<string[]>([]);
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  const radioOptions = ['s', 'm', 'l', 'xl'];
  const handleChange = (value: string) => {
    setDataSource(
      !value || value.indexOf('@') >= 0
        ? []
        : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`],
    );
  };
  return (
    <>
      <RadioGroup
        style={{ marginBottom: '10px' }}
        value={size}
        onChange={v => setSize(v as IComponentSizeSpec)}
        options={radioOptions}
      />
      <InputGroup size={size}>
        <Input width={100} defaultValue="0521" />
        <Input defaultValue="97582319" />
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <Select width={100} defaultValue="Zhejiang">
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
        </Select>
        <Input defaultValue="Xihu District, Hangzhou" />
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <Select width={100} defaultValue="Option1">
          <Option value="Option1">Option1</Option>
          <Option value="Option2">Option2</Option>
        </Select>
        <Input defaultValue="input content" />
        <InputNumber defaultValue={10} />
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <DatePicker style={{ width: '100px' }} placeholder="选择日期" />
        <Input defaultValue="input content" />
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <Select width={150} defaultValue="Option1-1" mode="multiple">
          <Option value="Option1-1">Option1-1</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
        <Select defaultValue="Option2-2">
          <Option value="Option2-1">Option2-1</Option>
          <Option value="Option2-2">Option2-2</Option>
        </Select>
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <Select width={100} defaultValue="1">
          <Option value="1">Between</Option>
          <Option value="2">Except</Option>
        </Select>
        <RangeInput placeholder={['Minimum', 'Maximum']} middleNode="~"></RangeInput>
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <Select width={100} defaultValue="Sign Up">
          <Option value="Sign Up">Sign Up</Option>
          <Option value="Sign In">Sign In</Option>
        </Select>
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 200 }}
          onChange={handleChange}
          placeholder="Email"
        />
      </InputGroup>
      <br />
      <InputGroup size={size}>
        <Select width={100} defaultValue="Home">
          <Option value="Home">Home</Option>
          <Option value="Company">Company</Option>
        </Select>
        <Cascader options={options} placeholder="Select Address" />
      </InputGroup>
    </>
  );
}

export const meta = {
  title: '简单使用',
  desc:
    '将Input类型组件或者按钮直接放入`InputGroup`中即可，可以通过`size`属性控制内部内部元素的尺寸',
};
