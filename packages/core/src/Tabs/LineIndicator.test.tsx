import React from 'react';
import renderer from 'react-test-renderer';

import LineIndicator from './LineIndicator';

test('测试 LineIndicator 默认', () => {
  const tree = renderer.create(<LineIndicator />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 LineIndicator 正常情况', () => {
  const tree = renderer.create(<LineIndicator $left={0} $width={100} />).toJSON();
  expect(tree).toMatchSnapshot();
});
