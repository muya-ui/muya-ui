import React from 'react';

import { Pagination } from '@muya-ui/core';

export default function SimpleDemo() {
  const [current, setCurrent] = React.useState(1);
  const onChange = React.useCallback((num: number) => {
    setCurrent(num);
  }, []);
  return (
    <>
      <Pagination totalRecords={200} simple onChange={onChange} />
      <Pagination totalRecords={200} current={current} simple onChange={onChange} showQuickJumper />
    </>
  );
}

export const meta = {
  title: '简洁模式',
  desc: '简洁型分页器, 带输入框和不带输入框两种',
};
