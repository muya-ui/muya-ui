import { mount } from 'enzyme';
import React from 'react';

import Portal from './Portal';

test('should render correctly', () => {
  const wrapper = mount(<Portal>Test</Portal>);
  expect(wrapper).toMatchSnapshot();
});

test('should accept function container', () => {
  const wrapper = mount(<Portal container={() => document.body}>Test</Portal>);
  expect(wrapper).toMatchSnapshot();
});

test('should accept ref', () => {
  const wrapper = mount(<Portal ref={{ current: null }}>Test</Portal>);
  expect(wrapper).toMatchSnapshot();
});

test('should accept onRendered', () => {
  const wrapper = mount(<Portal onRendered={() => {}}>Test</Portal>);
  expect(wrapper).toMatchSnapshot();
});

test('should accept disablePortal', () => {
  const wrapper = mount(
    <Portal disablePortal>
      <div></div>
    </Portal>,
  );
  expect(wrapper).toMatchSnapshot();
});
