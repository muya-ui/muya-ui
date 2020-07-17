import React from 'react';

import { Button, TimePicker } from '@muya-ui/core';

const options = [{ label: '此刻' }];
export default function BasicDemo() {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <>
      <TimePicker placeholder="选择时间" disabled={disabled} options={options} />
      <Button style={{ marginLeft: 10 }} onClick={() => setDisabled(!disabled)}>
        {disabled ? '取消禁用' : '禁用'}
      </Button>
    </>
  );
}

export const meta = {
  title: '基础用法',
  desc: '基础用法',
};
