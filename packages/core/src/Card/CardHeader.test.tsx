import React from 'react';
import renderer from 'react-test-renderer';
import CardHeader from './CardHeader';

describe('CardHeader', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <CardHeader>测试</CardHeader>
          <CardHeader
            src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
            height={100}
          >
            测试
          </CardHeader>
          <CardHeader
            src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
            height="d"
          >
            测试
          </CardHeader>
        </>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
