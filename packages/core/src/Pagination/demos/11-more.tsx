import React, { useState } from 'react';

import { Pagination } from '@muya-ui/core';

export default function MoreDemo() {
  const [current, setCurrent] = useState(5);
  const onChange = React.useCallback((page: number) => {
    setCurrent(page);
  }, []);

  return (
    <div>
      <Pagination totalRecords={200} current={current} defaultPageSize={10} onChange={onChange} />
    </div>
  );
}

export const meta = {
  title: '更多',
  desc: '更多分页',
};
