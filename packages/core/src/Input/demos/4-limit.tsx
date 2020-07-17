import React, { useState } from 'react';

import { Input } from '@muya-ui/core';

export default function LimitDemo() {
  const [value, setValue] = useState('我是超出长度的超长内容超长内容');
  return (
    <>
      <Input
        placeholder="带有字数限制的输入框"
        limit={10}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}

export const meta = {
  title: '字数限制',
  desc: '设置`limit`为大于零的数字，即可展示字数限制',
};
