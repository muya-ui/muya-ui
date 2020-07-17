import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { muyaThemeLight } from '@muya-ui/theme-light';

import { InlineButton } from '../Button';
import Dialog from '../Dialog';
import Spin from './Spin';
import { StyledDescWrapper, StyledIconWrapper, StyledSpinContent } from './styled';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <>
        <Spin />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should accept size', () => {
  const tree = renderer
    .create(
      <>
        <StyledDescWrapper size="s" theme={muyaThemeLight} />
        <StyledDescWrapper size="m" theme={muyaThemeLight} />
        <StyledDescWrapper size="l" theme={muyaThemeLight} />
        <StyledDescWrapper size="xl" theme={muyaThemeLight} />
        <StyledIconWrapper size="s" theme={muyaThemeLight} />
        <StyledIconWrapper size="m" theme={muyaThemeLight} />
        <StyledIconWrapper size="l" theme={muyaThemeLight} />
        <StyledIconWrapper size="xl" theme={muyaThemeLight} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should accept desc and cancelText', () => {
  const wrapper = mount(<Spin cancelText="test" desc="loading" />);
  expect(wrapper.find(StyledDescWrapper)).toHaveLength(1);
  expect(wrapper.find(InlineButton)).toHaveLength(1);
});

test('should render empty', () => {
  const wrapper = mount(<Spin spinning={false} />);
  expect(wrapper.isEmptyRender()).toBe(true);
});

test('should be fullscreen with Dialog', () => {
  const wrapper = mount(<Spin spinning={false} fullscreen />);
  expect(wrapper.find(Dialog.Base)).toHaveLength(1);
});

test('should be an icon without desc and cancelText', () => {
  const wrapper = mount(<Spin />);
  expect(getComputedStyle(wrapper.find('svg').getDOMNode()).fontSize).toBeFalsy();
});

test('direction can be column or row', () => {
  const wrapper = mount(<Spin direction="row" />);
  expect(wrapper.find(StyledSpinContent)).toHaveStyleRule('flex-flow', 'row nowrap');
});

test('test Spin when set container or children', () => {
  const div = document.createElement('div');
  const wrapper = mount(<Spin direction="row" container={div} />);
  const wrapperWithChildren = mount(
    <Spin direction="row">
      <div id="position"></div>
    </Spin>,
  );
  const wrapperWithPositionChildren = mount(
    <Spin direction="row">
      <div id="position1" style={{ position: 'absolute' }}></div>
    </Spin>,
  );
  expect(getComputedStyle(wrapper.find(Dialog.Base).getDOMNode()).position).toBe('absolute');
  expect(wrapperWithChildren.find('#position').getDOMNode().style.position).toBe('relative');
  expect(wrapperWithPositionChildren.find('#position1').getDOMNode().style.position).toBe(
    'absolute',
  );
  expect(div.style.position).toBe('relative');
});
