import { mount } from 'enzyme';
import React from 'react';

import { Drawer } from '@muya-ui/core';

test('should render correctly', () => {
  const wrapper = mount(
    <>
      <Drawer direction="right" width={300} height={300}>
        <span id="test"></span>
      </Drawer>
      <Drawer direction="up">
        <span id="test"></span>
      </Drawer>
      <Drawer direction="down">
        <span id="test"></span>
      </Drawer>
      <Drawer>
        <span id="test"></span>
      </Drawer>
    </>,
  );
  expect(wrapper.find('#test')).toHaveLength(4);
});
