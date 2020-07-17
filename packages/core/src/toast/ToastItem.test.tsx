import React from 'react';
import renderer from 'react-test-renderer';

import ToastItem from './ToastItem';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <ToastItem timeout={100} state="entering" item={{ type: 'success', content: 'ssss' }} />
        <ToastItem timeout={100} state="entered" item={{ type: 'loading', content: 'ssss' }} />
        <ToastItem timeout={100} state="exited" item={{ type: 'error', content: 'ssss' }} />
        <ToastItem timeout={100} state="exiting" item={{ type: 'error', content: 'ssss' }} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 自定义节点', () => {
  const tree = renderer
    .create(
      <ToastItem
        state="entering"
        timeout={100}
        item={{
          type: 'success',
          content: <div>content</div>,
          icon: <div>icon</div>,
        }}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
