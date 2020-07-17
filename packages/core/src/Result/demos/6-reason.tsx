import React from 'react';
import { Button, Link, Result } from '@muya-ui/core';

export default function IconDemo() {
  return (
    <>
      <Result
        title="提示"
        subTitle="提示文案"
        type="success"
        reason={
          <>
            错误原因
            <Link
              href="/"
              style={{
                margin: '0 5px',
                textDecoration: 'none',
                color: '#1a7af8',
              }}
            >
              文字链
            </Link>
          </>
        }
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
  title: '错误原因',
  desc: '可自定义错误原因',
};
