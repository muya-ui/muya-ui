import React from 'react';

import { Row, Switch } from '@muya-ui/core';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

export default function LoadingDemo() {
  return (
    <>
      <Row>
        <Switch onChange={onChange} size="xl" loading />
      </Row>
      <Row>
        <Switch defaultChecked onChange={onChange} loading />
      </Row>
    </>
  );
}

export const meta = {
  title: '加载中',
  desc: '标识开关操作仍在执行中',
};
