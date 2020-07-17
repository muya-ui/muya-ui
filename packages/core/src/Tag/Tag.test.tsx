import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import CheckableTag from './CheckableTag';
import Tag from './Tag';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <Tag>Test</Tag>
        <Tag closable>Test</Tag>
        <Tag color="#666" closable>
          Test
        </Tag>
        <Tag color="#666">Test</Tag>
        <Tag color="#666" bordered>
          Test
        </Tag>
        <Tag color="#666" disabled>
          Test
        </Tag>
        <Tag color="#666" colorInverse closable>
          Test
        </Tag>
        <Tag visible={false} maxWidth={100}>
          Test
        </Tag>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
  const checkableTree = renderer
    .create(
      <>
        <CheckableTag checked={false}>Test</CheckableTag>
        <CheckableTag checked>Test</CheckableTag>
      </>,
    )
    .toJSON();
  expect(checkableTree).toMatchSnapshot();
});

test('测试 Tag visible 受控逻辑', () => {
  const wrapper = mount(<Tag visible={false}>Test</Tag>);
  wrapper.setProps({ visible: true });
});

test('测试 Tag closeIconClick 逻辑', () => {
  const onClose = jest.fn();
  const wrapper = mount(
    <Tag closable onClose={onClose}>
      Test
    </Tag>,
  );
  wrapper.find('svg').simulate('click');
  expect(onClose).toBeCalledTimes(1);
  wrapper.find('svg').simulate('click', { defaultPrevented: true });
  expect(onClose).toBeCalledTimes(2);
});

test('测试 CheckableTag onChange 逻辑', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  const wrapper = mount(
    <CheckableTag checked onChange={onChange} onClick={onClick}>
      Test
    </CheckableTag>,
  );
  wrapper.simulate('click');
  wrapper.simulate('mousedown');
  wrapper.simulate('mouseup');
  expect(onChange).toBeCalledTimes(1);
});
