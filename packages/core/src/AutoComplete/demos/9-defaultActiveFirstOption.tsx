import React, { useState } from 'react';

import { AutoComplete, IAutoCompleteDataSourceItem, ISelectOptionState } from '@muya-ui/core';

export default function DefaultActiveFirstOptionDemo() {
  const [value, setValue] = useState('');
  const [dataSource, setDataSource] = useState<IAutoCompleteDataSourceItem[]>([]);

  const onSelect = (value: ISelectOptionState) => {
    console.log('onSelect: ', value);
  };

  const onSearch = (searchText: string) => {
    setDataSource(!searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]);
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <AutoComplete
      value={value}
      dataSource={dataSource}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      defaultActiveFirstOption={false}
    />
  );
}

export const meta = {
  title: '默认不选中第一条',
  desc:
    'AutoComplete 默认会选中第一个搜索结果，如果需要禁用该交互，那么可以将 `defaultActiveFirstOption` 设为 `false`。',
};
