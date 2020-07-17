import React, { useState } from 'react';

import { AutoComplete, IAutoCompleteDataSourceItem, ISelectOptionState, Row } from '@muya-ui/core';

export default function BasicDemo() {
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
    <>
      <Row>
        <AutoComplete
          dataSource={dataSource}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="非受控模式"
        />
      </Row>
      <Row>
        <AutoComplete
          value={value}
          dataSource={dataSource}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          placeholder="受控模式"
        />
      </Row>
    </>
  );
}

export const meta = {
  title: '基本使用',
  desc: '基本使用。通过 dataSource 设置自动完成的数据源。',
};
