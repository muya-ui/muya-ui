import React from 'react';
import renderer from 'react-test-renderer';

import Tab from './Tab';

test('测试 Tab line 正常情况', () => {
  const tree = renderer.create(<Tab index="10" selected type="line" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tab line disabled', () => {
  const tree = renderer.create(<Tab index="10" disabled type="line" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tab card 正常情况', () => {
  const tree = renderer.create(<Tab index="10" selected type="card" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tab card disabled', () => {
  const tree = renderer.create(<Tab index="10" disabled type="card" />).toJSON();
  expect(tree).toMatchSnapshot();
});
