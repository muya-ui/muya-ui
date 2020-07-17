import React from 'react';
import renderer from 'react-test-renderer';

import SwipePanel from './SwipePanel';

test('测试 SwipePanel horizontal', () => {
  const tree = renderer
    .create(
      <SwipePanel $duration={450} $direction="horizontal" $transition="on">
        <div>AAA</div>
      </SwipePanel>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('display', 'flex');
});

test('测试 SwipePanel vertical', () => {
  const tree = renderer
    .create(
      <SwipePanel $duration={450} $direction="vertical" $transition="off">
        <div>AAA</div>
      </SwipePanel>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 SwipePanel duration', () => {
  const tree = renderer
    .create(
      <SwipePanel $duration={4000} $direction="vertical" $transition="on">
        <div>AAA</div>
      </SwipePanel>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
