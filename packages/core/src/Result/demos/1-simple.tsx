import React from 'react';

import { Button, Result } from '@muya-ui/core';

export default function BasicDemo() {
  return (
    <>
      <Result
        title="提示"
        subTitle="提示文案"
        type="success"
        extra={
          <>
            <Button>次按钮</Button>
            <Button type="primary">主按钮</Button>
          </>
        }
      />
    </>
  );
}

export const meta = {
  title: '基本',
  desc: '基础用法',
};
