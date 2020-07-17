import React, { useState } from 'react';

import { AutoComplete, IAutoCompleteDataSourceItem, ISelectOptionState } from '@muya-ui/core';

export default function BackfillDemo() {
  const [dataSource, setDataSource] = useState<IAutoCompleteDataSourceItem[]>([]);

  const onSelect = (value: ISelectOptionState) => {
    console.log('onSelect: ', value);
  };

  const onSearch = (searchText: string) => {
    setDataSource(!searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]);
  };

  return <AutoComplete dataSource={dataSource} onSelect={onSelect} onSearch={onSearch} backfill />;
}

export const meta = {
  title: '选中回填',
  desc: '选中后将值回填到输入框',
};
