import React from 'react';

import { AutoComplete } from '@muya-ui/core';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

export default function IgnoreCaseDemo() {
  return (
    <AutoComplete
      width={200}
      dataSource={dataSource}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) =>
        `${option.value}`.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
}

export const meta = {
  title: '不区分大小写',
  desc: '不区分大小写的 AutoComplete。',
};
