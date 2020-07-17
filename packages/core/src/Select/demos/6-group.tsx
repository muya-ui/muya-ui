import React from 'react';

import {
  ISelectValueType,
  Option,
  OptionDivider,
  OptionGroup,
  Row,
  Select,
  Typography,
} from '@muya-ui/core';

const handleChange = (value: ISelectValueType) => {
  console.log('selected: ', value);
};

export default function GroupDemo() {
  return (
    <>
      <Row>
        <Typography.Title level={5}>标题分组：</Typography.Title>
      </Row>
      <Row>
        <Select defaultValue="one" onChange={handleChange}>
          <OptionGroup label="分组一">
            <Option value="one">选项一</Option>
            <Option value="two">选项二</Option>
            <Option value="three">选项三</Option>
          </OptionGroup>
          <OptionGroup label="分组二">
            <Option value="four">选项四</Option>
            <Option value="five">选项五</Option>
            <Option value="six">选项六</Option>
            <Option value="seven">选项七</Option>
          </OptionGroup>
        </Select>
      </Row>
      <Row>
        <Typography.Title level={5}>分割线分组：</Typography.Title>
      </Row>
      <Row>
        <Select defaultValue="one" onChange={handleChange}>
          <Option value="one">选项一</Option>
          <Option value="two">选项二</Option>
          <Option value="three">选项三</Option>
          <OptionDivider></OptionDivider>
          <Option value="four">选项四</Option>
          <Option value="five">选项五</Option>
          <Option value="six">选项六</Option>
        </Select>
      </Row>
    </>
  );
}

export const meta = {
  title: '分组',
  desc: '用 `OptionGroup` 进行选项分组',
};
