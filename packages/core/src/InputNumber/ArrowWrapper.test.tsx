import React from 'react';
import renderer from 'react-test-renderer';
import ArrowWrapper from './ArrowWrapper';
import { mount } from 'enzyme';

describe('ArrowWrapper Component', () => {
  it('should ArrowWrapper Component mount success', () => {
    const wrapper = renderer
      .create(
        <ArrowWrapper size="m" arrowDisabled={{ up: false, down: false }} changeStep={() => {}} />,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render different size', () => {
    const wrapper = renderer
      .create(
        <>
          <ArrowWrapper size="m" arrowDisabled={{ up: false, down: false }} changeStep={() => {}} />
          <ArrowWrapper size="s" arrowDisabled={{ up: false, down: false }} changeStep={() => {}} />
          <ArrowWrapper size="l" arrowDisabled={{ up: false, down: false }} changeStep={() => {}} />
          <ArrowWrapper
            size="xl"
            arrowDisabled={{ up: false, down: false }}
            changeStep={() => {}}
          />
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should click success', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ArrowWrapper size="m" arrowDisabled={{ up: false, down: false }} changeStep={fn} />,
    );
    wrapper.find('div').map(div => div.simulate('click'));
    expect(fn.mock.calls).toHaveLength(2);
  });
  it('should mouseLeave and enter change style', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ArrowWrapper size="m" arrowDisabled={{ up: false, down: false }} changeStep={fn} />,
    );
    wrapper.find('div').map((div, index) => {
      if (index === 0) {
        div.simulate('mouseEnter');
      } else {
        div.simulate('mouseLeave');
      }
      return div;
    });
    expect(renderer.create(wrapper.getElement()).toJSON()).toMatchSnapshot();
    wrapper.find('div').map((div, index) => {
      if (index === 0) {
        div.simulate('mouseLeave');
      } else {
        div.simulate('mouseEnter');
      }
      return div;
    });
    expect(renderer.create(wrapper.getElement()).toJSON()).toMatchSnapshot();
  });
  it('should arrowDisabled change style', () => {
    const wrapper = renderer
      .create(
        <>
          <ArrowWrapper size="m" arrowDisabled={{ up: true, down: false }} changeStep={() => {}} />
          <ArrowWrapper size="m" arrowDisabled={{ up: false, down: true }} changeStep={() => {}} />
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
