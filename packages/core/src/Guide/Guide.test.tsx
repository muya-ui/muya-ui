import React from 'react';
import Guide from './Guide';
import { mount } from 'enzyme';
import { IGuideStep } from './types';

describe('Guide', () => {
  it('should render success', function() {
    const tourConfig = (position = 'right') => [
      // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
      {
        selector: '.step1',
        position,
        content: '这是第一个新功能',
        subTitle: '这是副标题',
        arrowPosition: 'right-end',
      } as IGuideStep,
    ];
    const wrapper = mount(
      <>
        <Guide steps={tourConfig('left')} onRequestClose={() => {}} />
      </>,
    );
    const wrapper1 = mount(
      <>
        <Guide
          steps={tourConfig('top')}
          confirmText="确定啦"
          nextText="下一步"
          skipText="跳过啦"
          onRequestClose={() => {}}
        />
      </>,
    );
    const wrapper2 = mount(
      <>
        <Guide steps={tourConfig()} showSkip={false} showClose={false} onRequestClose={() => {}} />
      </>,
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper1.html()).toMatchSnapshot();
    expect(wrapper2.html()).toMatchSnapshot();
  });
});
