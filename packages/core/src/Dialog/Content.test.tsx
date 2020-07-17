import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import DialogContent from './Content';

test('should render correctly', () => {
  const tree = renderer.create(<DialogContent>Test</DialogContent>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should show icon with type', () => {
  const wrapper = mount(<DialogContent type="info" />);

  expect(wrapper.find('svg')).toHaveLength(1);
});

test('should use outer icon element with icon props', () => {
  const wrapper = mount(<DialogContent type="info" icon={<span id="test">Test</span>} />);

  expect(wrapper.find('#test')).toHaveLength(1);
});
