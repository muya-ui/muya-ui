import React from 'react';

import { RadioGroup } from '@muya-ui/core';

export default function DisabledDemo() {
  const plainOptions: string[] = ['Apple', 'Banana', 'Orange'];
  return (
    <>
      <RadioGroup defaultValue="Orange" disabled options={plainOptions} />
    </>
  );
}

export const meta = {
  title: '不可用',
  desc: 'Radio 不可用',
};
