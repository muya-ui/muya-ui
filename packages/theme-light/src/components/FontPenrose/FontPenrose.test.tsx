import React from 'react';
import renderer from 'react-test-renderer';

import FontPenrose from './FontPenrose';

test('测试 FontPenrose', () => {
  const tree = renderer.create(<FontPenrose />).toJSON();
  expect(tree).toMatchSnapshot();
});
