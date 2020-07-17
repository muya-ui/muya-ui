import React from 'react';
import renderer from 'react-test-renderer';

import DateTimePicker from './DateTimePicker';

test('默认渲染', () => {
  const tree = renderer.create(<DateTimePicker />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('disabled', () => {
  const tree = renderer.create(<DateTimePicker disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('styles', () => {
  const tree = renderer
    .create(
      <DateTimePicker
        styles={{
          popPanel: 'test-a',
          input: 'w-input',
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
