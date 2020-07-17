import React, { useState } from 'react';

import { AutoComplete, AutoCompleteItem, Option } from '@muya-ui/core';

interface IDataSourceItem {
  primary: string;
  secondary: string;
}

export default function SecondaryFieldDemo() {
  const [dataSource, setDataSource] = useState<IDataSourceItem[]>([]);

  const handleSearch = (searchText: string) => {
    setDataSource([
      { primary: searchText, secondary: `共 ${Math.ceil(Math.random() * 100)} 条记录` },
      { primary: searchText.repeat(2), secondary: `共 ${Math.ceil(Math.random() * 100)} 条记录` },
      { primary: searchText.repeat(3), secondary: `共 ${Math.ceil(Math.random() * 100)} 条记录` },
    ]);
  };

  return (
    <AutoComplete onSearch={handleSearch}>
      {dataSource.map(item => (
        <Option key={item.primary} value={item.primary} label={item.primary}>
          <AutoCompleteItem primary={item.primary} secondary={item.secondary} />
        </Option>
      ))}
    </AutoComplete>
  );
}

export const meta = {
  title: '第二字段',
  desc: '可以通过 `Option` 作为 `AutoComplete` 的 `children` 来实现第二字段。',
};
