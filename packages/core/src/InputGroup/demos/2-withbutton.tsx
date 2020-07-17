import React from 'react';

import { InputGroup, Input, Button, Select, Option } from '@muya-ui/core';
import { SearchIcon } from '@muya-ui/theme-light';

export default function WithButton() {
  return (
    <>
      <InputGroup>
        <Input defaultValue="0571" />
        <Button type="primary" suffixNode={<SearchIcon />}>
          搜索
        </Button>
      </InputGroup>
      <br />
      <InputGroup>
        <Button suffixNode="🤣">你好呀</Button>
        <Select defaultValue="Zhejiang">
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
        </Select>
        <Input defaultValue="Xihu District, Hangzhou" />
        <Button suffixNode="🔍">搜索</Button>
      </InputGroup>
      <br />
    </>
  );
}

export const meta = {
  title: '与按钮组合使用',
  desc: '将按钮与输入框并列即可',
};
