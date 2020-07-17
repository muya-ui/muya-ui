import React from 'react';
import renderer from 'react-test-renderer';

import WeekPicker from './WeekPicker';

test('默认渲染', () => {
  const tree = renderer.create(<WeekPicker />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('disabled', () => {
  const tree = renderer.create(<WeekPicker disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('styles', () => {
  const tree = renderer
    .create(
      <WeekPicker
        styles={{
          popPanel: 'test-a',
          input: 'w-input',
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
