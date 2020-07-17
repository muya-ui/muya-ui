import React from 'react';
import renderer from 'react-test-renderer';
import CardMeta from './CardMeta';

describe('CardMeta', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <CardMeta>测试</CardMeta>
          <CardMeta title="测试" />
          <CardMeta title={<span>测试</span>} />
          <CardMeta text="测试" />
          <CardMeta text={<span>测试</span>} />
          <CardMeta title="测试" text="测试" />
          <CardMeta title={<span>测试</span>} text={<span>测试</span>} />
          <CardMeta title="测试" text="测试">
            测试
          </CardMeta>
          <CardMeta title={<span>测试</span>} text={<span>测试</span>}>
            测试
          </CardMeta>
        </>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
