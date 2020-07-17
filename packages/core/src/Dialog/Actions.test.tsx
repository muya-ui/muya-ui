import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';
import DialogActions from './Actions';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <DialogActions>
        <Button>Test</Button>
      </DialogActions>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should be space-between with tipAction', () => {
  const wrapper = mount(
    <DialogActions tipAction="hhh">
      <Button>Test</Button>
      <Button>Test</Button>
    </DialogActions>,
  );

  expect(wrapper).toHaveStyleRule('justify-content', 'space-between');
});
