import React from 'react';
import SpinIcon from './SpinIcon';
import renderer from 'react-test-renderer';

describe('SpinIcon', () => {
  it('should render normal', () => {
    const wrapper = renderer.create(<SpinIcon fontSize={18} color="red" />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
