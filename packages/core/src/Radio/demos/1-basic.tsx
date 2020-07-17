import React, { ChangeEvent } from 'react';

import { Radio } from '@muya-ui/core';

export default function BasicDemo() {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange Event: ', e.target.checked);
  };
  return (
    <>
      <Radio
        onChange={onChange}
        styles={{
          wrapper: 'radio-demo-wrapper',
        }}
      >
        Option 1
      </Radio>
      <Radio checked>Default Checked</Radio>
    </>
  );
}

export const meta = {
  title: '基本',
  desc: '基础用法',
};
