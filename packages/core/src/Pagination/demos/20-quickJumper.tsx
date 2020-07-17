import React, { useState } from 'react';

import { Pagination } from '@muya-ui/core';

export default function QuickJumperDemo() {
  const [current, setCurrent] = useState(5);
  const onChange = React.useCallback((page: number) => {
    setCurrent(page);
  }, []);

  return (
    <div>
      <Pagination
        totalRecords={200}
        showQuickJumper
        current={current}
        defaultPageSize={10}
        onChange={onChange}
      />
    </div>
  );
}

export const meta = {
  title: '跳转',
  desc: '快速跳转到某一页',
};
