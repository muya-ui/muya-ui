import React from 'react';
import renderer from 'react-test-renderer';

import Link from './Link';

test('测试渲染', () => {
  const tree = renderer
    .create(
      <>
        <Link href="https://www.kujiale.com" target="_blank">
          我是一个链接
        </Link>
        <Link href="https://www.kujiale.com" disabled>
          我是一个禁用链接
        </Link>
        <Link
          href="https://www.kujiale.com"
          target="_blank"
          prefixNode={<span>前缀</span>}
          suffixNode={<span>后缀</span>}
        >
          我是一个带前后缀链接
        </Link>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
