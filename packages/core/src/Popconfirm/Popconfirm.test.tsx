import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import { ClearIcon } from '@muya-ui/theme-light';

import Button from '../Button';
import Trigger from '../Trigger';
import Popconfirm from './Popconfirm';

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
      <Popconfirm title="111">
        <button>111</button>
      </Popconfirm>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('should accept cancelText and confirmText', () => {
  const wrapper = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      open
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button>hh</button>
    </Popconfirm>,
  );
  expect(wrapper.find(Button)).toHaveLength(2);
  expect(
    wrapper
      .find(Button)
      .at(0)
      .getDOMNode().textContent,
  ).toBe('cancel');
  expect(
    wrapper
      .find(Button)
      .at(1)
      .getDOMNode().textContent,
  ).toBe('confirm');
});

test('should accept onCancel and onConfirm', () => {
  const cancel = sinon.spy();
  const confirm = sinon.spy();
  const wrapper = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      onCancel={cancel}
      onConfirm={confirm}
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button id="test">hh</button>
    </Popconfirm>,
  );
  wrapper.find('#test').simulate('click');
  wrapper
    .find(Button)
    .at(0)
    .simulate('click');
  expect(cancel.calledOnce).toBe(true);

  wrapper
    .find(Button)
    .at(1)
    .simulate('click');
  expect(confirm.calledOnce).toBe(true);
});

test('should accept type', () => {
  const error = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      type="error"
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button id="error">hh</button>
    </Popconfirm>,
  );
  expect(error.find(ClearIcon)).toHaveLength(1);
});

test('should accept confirmButtonType', () => {
  const wrapper = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      confirmButtonType="danger"
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button>hh</button>
    </Popconfirm>,
  );
  expect(
    wrapper
      .find(Button)
      .at(1)
      .prop('type'),
  ).toBe('danger');
});

test('should accept actions', () => {
  const wrapper = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      actions={<Button>111</Button>}
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button>hh</button>
    </Popconfirm>,
  );
  expect(wrapper.find(Button)).toHaveLength(1);
});

test('should accept icon', () => {
  const wrapper = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      type="error"
      icon={<span id="icon"></span>}
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button>hh</button>
    </Popconfirm>,
  );
  expect(wrapper.find('#icon')).toHaveLength(1);
});

test('should accept useInlineButton', () => {
  const wrapper = mount(
    <Popconfirm
      id="111"
      open
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      useInlineButton
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button>hh</button>
    </Popconfirm>,
  );
  expect(wrapper.find(Button)).toHaveLength(0);
});

test('should be control mod', () => {
  const changeHandle = sinon.spy();
  const wrapper = mount(
    <Popconfirm
      id="111"
      open={false}
      onVisibleChange={changeHandle}
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      triggerAction="click"
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button id="test">hh</button>
    </Popconfirm>,
  );
  wrapper.find('#test').simulate('click');
  wrapper
    .find(Button)
    .at(0)
    .simulate('click');
  wrapper
    .find(Button)
    .at(1)
    .simulate('click');

  expect(changeHandle.calledOnceWith(true)).toBe(true);
});

test('should be uncontrol mod', () => {
  const wrapper = mount(
    <Popconfirm
      id="111"
      popperProps={{ lazyMount: false }}
      cancelText="cancel"
      confirmText="confirm"
      triggerAction="click"
      placement="bottom"
      title="hhh"
      content="xixi"
    >
      <button id="test">hh</button>
    </Popconfirm>,
  );
  wrapper.find('#test').simulate('click');
  expect(wrapper.find(Trigger).prop('open')).toBe(true);

  wrapper
    .find(Button)
    .at(0)
    .simulate('click');
  expect(wrapper.find(Trigger).prop('open')).toBe(false);

  wrapper.find('#test').simulate('click');

  wrapper
    .find(Button)
    .at(1)
    .simulate('click');
  expect(wrapper.find(Trigger).prop('open')).toBe(false);
});
