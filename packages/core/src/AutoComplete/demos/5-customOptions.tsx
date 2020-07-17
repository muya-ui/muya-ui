import React, { ReactElement, useState } from 'react';

import { AutoComplete, Option } from '@muya-ui/core';

export default function CustomOptionsDemo() {
  const [value, setValue] = useState('');

  const handleSearch = (value: string) => {
    setValue(value);
  };

  let children: ReactElement[] | null = null;
  if (value) {
    children = ['gmail.com', '163.com', 'qq.com'].map(domain => {
      const email = `${value}@${domain}`;
      return (
        <Option key={email} value={email} label={email}>
          <span>
            <span style={{ color: '#1A7AF8' }}>{value}</span>@{domain}
          </span>
        </Option>
      );
    });
  }

  return <AutoComplete onSearch={handleSearch}>{children as ReactElement[]}</AutoComplete>;
}

export const meta = {
  title: '自定义选项',
  desc: '可以直接传 `Option` 作为 `AutoComplete` 的 `children`，而非使用 `dataSource`。',
};
