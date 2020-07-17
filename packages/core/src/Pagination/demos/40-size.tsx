import React from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, Pagination } from '@muya-ui/core';

export default function PaginationSizeDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <ButtonGroup plain={true}>
          <Button selected={size === 'xl'} onClick={() => setSize('xl')}>
            xl
          </Button>
          <Button selected={size === 'l'} onClick={() => setSize('l')}>
            l
          </Button>
          <Button selected={size === 'm'} onClick={() => setSize('m')}>
            m
          </Button>
          <Button selected={size === 's'} onClick={() => setSize('s')}>
            s
          </Button>
        </ButtonGroup>
      </div>
      <Pagination size={size} totalRecords={80} showQuickJumper />
      <Pagination size={size} totalRecords={80} simple showQuickJumper />
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '不同尺寸: s / m / l / xl, 默认 m',
};
