import React from 'react';

import { Pagination } from '@muya-ui/core';

const pageSizeOptions = [20, 30, 40, 50];

export default function ControlDemo() {
  const [current, setCurrent] = React.useState(0);
  return (
    <div>
      <Pagination
        current={current}
        totalRecords={200}
        showPageSizeChanger
        defaultPageSize={20}
        pageSizeOptions={pageSizeOptions}
        onChange={page => setCurrent(page)}
      />
    </div>
  );
}

export const meta = {
  title: '受控',
  desc: '受控制的页码',
};
