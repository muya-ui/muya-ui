import React from 'react';
import renderer from 'react-test-renderer';

import CardIndicator from './CardIndicator';

test('测试 CardIndicator 默认', () => {
  const tree = renderer.create(<CardIndicator />).toJSON();
  expect(tree).toMatchSnapshot();
});
