import React from 'react';

import { SearchIcon, SentIcon } from '@muya-ui/theme-light';
import { RangeInput } from '@muya-ui/core';

export default function RangeDemo() {
  return (
    <>
      <RangeInput
        placeholder={['start', 'end']}
        allowClear
        clearReplace
        defaultValue={['ss', 'ss']}
        middleNode={['to']}
        prefixNode={[<SearchIcon key="search" />, <SentIcon key="sent" />, '张']}
        onPressEnter={e => {
          console.log(e);
        }}
        suffixNode={['张']}
      />
    </>
  );
}

export const meta = {
  title: '区间输入框',
  desc: '区间输入框',
};
