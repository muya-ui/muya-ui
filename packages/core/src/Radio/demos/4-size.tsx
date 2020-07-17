import React from 'react';

import { RadioGroup, Typography } from '@muya-ui/core';

export default function SizeDemo() {
  const plainOptions: string[] = ['Apple', 'Banana', 'Orange'];
  return (
    <>
      <div className="doc-radio-group-item">
        <Typography.Text className="title">s/m:</Typography.Text>
        <RadioGroup defaultValue="Apple" options={plainOptions} size="m" />
      </div>
      <div className="doc-radio-group-item">
        <Typography.Text className="title">l:</Typography.Text>
        <RadioGroup defaultValue="Apple" options={plainOptions} size="l" />
      </div>
      <div className="doc-radio-group-item">
        <Typography.Text className="title">xl:</Typography.Text>
        <RadioGroup defaultValue="Apple" options={plainOptions} size="xl" />
      </div>
    </>
  );
}

export const meta = {
  title: '不同大小',
  desc: '可选 xl、l 、m(默认) 、s',
};
