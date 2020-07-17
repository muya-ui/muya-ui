import React from 'react';

import { Link, Row } from '@muya-ui/core';

export default function StatusDemo() {
  return (
    <>
      <Row>
        <Link href="https://www.kujiale.com" target="_blank">
          我是一个链接
        </Link>
      </Row>
      <Row>
        <Link href="https://www.kujiale.com" disabled>
          我是一个禁用链接
        </Link>
      </Row>
      <Row>
        <Link
          href="https://www.kujiale.com"
          target="_blank"
          prefixNode={<span>前缀</span>}
          suffixNode={<span>后缀</span>}
        >
          我是一个带前后缀链接
        </Link>
      </Row>
    </>
  );
}

export const meta = {
  title: '链接基础用法',
  desc: '链接基础用法',
};
