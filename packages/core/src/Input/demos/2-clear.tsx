import React, { useState } from 'react';

import { Input } from '@muya-ui/core';

export default function ClearDemo() {
  const [value, setValue] = useState('清除我试试');
  return (
    <>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="带有清除功能输入框"
        allowClear
      />
    </>
  );
}

export const meta = {
  title: '带清除功能',
  desc: 'hover、focus 并且输入框有内容时，才会出现清除按钮',
};
