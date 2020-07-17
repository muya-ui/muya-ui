import React from 'react';
import renderer from 'react-test-renderer';
import CardActions from './CardActions';

describe('CardActions', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <CardActions>测试</CardActions>
          <CardActions padding={0}>测试</CardActions>
          <CardActions bordered={false}>测试</CardActions>
        </>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
