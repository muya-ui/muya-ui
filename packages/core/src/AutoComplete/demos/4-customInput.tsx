import React, { useState } from 'react';

import {
  AutoComplete,
  IAutoCompleteDataSourceItem,
  Input,
  ISelectOptionState,
} from '@muya-ui/core';

export default function CustomInputDemo() {
  const [dataSource, setDataSource] = useState<IAutoCompleteDataSourceItem[]>([]);

  const onSelect = (value: ISelectOptionState) => {
    console.log('onSelect: ', value);
  };

  const onSearch = (searchText: string) => {
    setDataSource(!searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]);
  };

  return (
    <AutoComplete dataSource={dataSource} onSelect={onSelect} onSearch={onSearch}>
      <Input placeholder="简单的多行输入框" multiline />
    </AutoComplete>
  );
}

export const meta = {
  title: '自定义输入组件',
  desc: '自定义输入组件，目前只能是 muya-ui 提供的 `Input`、`RangeInput`、 `Textarea` 组件。',
};
