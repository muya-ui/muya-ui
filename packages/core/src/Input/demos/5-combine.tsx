import React, { useState } from 'react';

import { Input } from '@muya-ui/core';

export default function CombileDemo() {
  const [value, setValue] = useState('清除我试试');
  return (
    <>
      <Input
        placeholder="带有字数限制的输入框"
        value={value}
        onChange={e => setValue(e.target.value)}
        limit={10}
        allowClear
        status="success"
      />
    </>
  );
}

export const meta = {
  title: '功能组合',
  desc: '输入框清除功能、字数限制功能、反馈状态是可以组合使用的，可以根据场景自行组合',
};
