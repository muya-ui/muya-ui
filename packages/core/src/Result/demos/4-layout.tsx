import React from 'react';

import { Button, Result } from '@muya-ui/core';

export default function LayoutDemo() {
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
      <div style={{ marginTop: '30px' }}>
        <Result
          title="提示"
          subTitle="提示文案"
          type="success"
          vertical={false}
          extra={
            <>
              <Button>次按钮</Button>
              <Button type="primary">主按钮</Button>
            </>
          }
        />
      </div>
    </>
  );
}

export const meta = {
  title: '布局',
  desc: '两种布局，分别为垂直及水平布局',
};
