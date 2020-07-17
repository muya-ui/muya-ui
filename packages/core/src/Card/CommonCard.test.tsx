import React from 'react';
import renderer from 'react-test-renderer';
import CommonCard from './CommonCard';

const src = '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

describe('CommonCard', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <CommonCard src={src}>测试</CommonCard>
          <CommonCard src={src} imgHeight={100}>
            测试
          </CommonCard>
          <CommonCard title="测试" contentPadding={0} />
          <CommonCard text="测试" />
          <CommonCard title="测试" text="测试" />
          <CommonCard actions="测试" actionsPadding={0} />
        </>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
