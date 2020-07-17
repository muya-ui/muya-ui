import React, { createRef } from 'react';
import renderer from 'react-test-renderer';

import { render } from '@testing-library/react';

import Switch from './index';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <Switch defaultChecked />
        <Switch defaultChecked disabled />
        <Switch checkedChildren="开" unCheckedChildren="关" />
        <Switch defaultChecked loading />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 effect', () => {
  const nodeRef = createRef();
  const { rerender } = render(<Switch ref={nodeRef} checked autoFocus />);
  rerender(<Switch ref={nodeRef} checked={false} autoFocus />);
});
