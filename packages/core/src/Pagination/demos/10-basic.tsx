import React from 'react';

import { Pagination } from '@muya-ui/core';

export default function BasicDemo() {
  const onChange = (page: number) => {
    console.log('Pagination onChange Event: ', page);
  };
  return (
    <Pagination
      totalRecords={60}
      onChange={onChange}
      styles={{
        wrapper: 'pagination-demo-wrapper',
      }}
    />
  );
}

export const meta = {
  title: '基础用法',
  desc: '基础用法',
};
