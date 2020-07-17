import React from 'react';

import { Pagination } from '@muya-ui/core';

const pageSizeOptions = [20, 30, 40, 50];

export default function PageSizeDemo() {
  return (
    <div>
      <Pagination
        totalRecords={200}
        showPageSizeChanger
        defaultPageSize={20}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}

export const meta = {
  title: '设置每页条数',
  desc: '每页条数设置',
};
