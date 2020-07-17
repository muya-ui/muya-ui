import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import Button from '../Button';
import PopoverCard from './PopoverCard';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});
test('should render correctly', () => {
  const wrapper = renderer
    .create(
      <PopoverCard title="111">
        <button>111</button>
      </PopoverCard>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('should accept node', () => {
  const wrapper = mount(
    <PopoverCard
      id="111"
      popperProps={{ lazyMount: false }}
      open
      placement="bottom"
      title="hhh"
      content="xixi"
      actions={<Button>111</Button>}
    >
      <span>hh</span>
    </PopoverCard>,
  );
  expect(wrapper.find('button')).toHaveLength(1);
});
