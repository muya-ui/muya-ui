import React from 'react';
import renderer from 'react-test-renderer';

import IconButton from './IconButton';

test('测试渲染', () => {
  const tree = renderer
    .create(
      <>
        <IconButton>我是一个图标按钮</IconButton>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
