import React, { useState } from 'react';

import { ISelectValueType, Option, Row, Select, Typography } from '@muya-ui/core';

export default function ControlledDemo() {
  const [singleValue, setSingleValue] = useState<ISelectValueType>('');
  const [multipleValue, setMultipleValue] = useState<ISelectValueType>([]);
  const onSingleChange = (value: ISelectValueType) => {
    console.log('selected: ', value);
    setSingleValue(value);
  };
  const onMultipleChange = (value: ISelectValueType) => {
    console.log('selected: ', value);
    setMultipleValue(value);
  };
  return (
    <>
      <Row>
        <Typography.Title level={5}>单选受控：</Typography.Title>
      </Row>
      <Row>
        <Select value={singleValue} onChange={onSingleChange} allowClear>
          <Option value="one">选项一</Option>
          <Option value="two">选项二</Option>
          <Option value="three">选项三</Option>
        </Select>
      </Row>
      <Row>
        <Typography.Title level={5}>多选受控：</Typography.Title>
      </Row>
      <Row>
        <Select mode="multiple" value={multipleValue} onChange={onMultipleChange} allowClear>
          <Option value="篮球" label="篮球🏀" />
          <Option value="排球" label="排球🏐" />
          <Option value="足球" label="⚽足球️" />
          <Option value="乒乓球" label="乒乓球🏓" />
          <Option value="网球" label="网球🎾" />
        </Select>
      </Row>
    </>
  );
}

export const meta = {
  title: '受控',
  desc: '通过 `value` 和 `onChange` 实现受控，可与 `Form` 组件集成。',
};
