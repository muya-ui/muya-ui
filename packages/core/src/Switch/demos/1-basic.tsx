import React from 'react';

import { Row, Switch, Typography } from '@muya-ui/core';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

export default function BasicDemo() {
  return (
    <>
      <Row>
        <Typography.Title level={5}>可操作-开启：</Typography.Title>
        <Switch defaultChecked autoFocus onChange={onChange} />
      </Row>
      <Row>
        <Typography.Title level={5}>已禁用-开启：</Typography.Title>
        <Switch defaultChecked onChange={onChange} disabled />
      </Row>
      <Row>
        <Typography.Title level={5}>可操作-关闭：</Typography.Title>
        <Switch defaultChecked={false} onChange={onChange} />
      </Row>
      <Row>
        <Typography.Title level={5}>已禁用-关闭：</Typography.Title>
        <Switch defaultChecked={false} onChange={onChange} disabled />
      </Row>
    </>
  );
}

export const meta = {
  title: '基本',
  desc: '最简单的用法。',
};
