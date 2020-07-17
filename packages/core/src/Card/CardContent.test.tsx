import React from 'react';
import renderer from 'react-test-renderer';
import CardContent from './CardContent';

describe('CardContent', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <CardContent>测试</CardContent>
          <CardContent padding={0}>测试</CardContent>
        </>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
