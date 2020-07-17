import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import DialogAlert, { alert, config } from './Alert';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <DialogAlert
        open
        size="m"
        type="success"
        title="决策型对话框"
        text="正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分"
        confirmText="主按钮"
        disablePortal
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should accept confirmText and onConfirm', () => {
  const confirm = sinon.spy();

  const wrapper = mount(
    <DialogAlert
      open
      size="m"
      type="success"
      title="决策型对话框"
      text="正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分"
      confirmText="主按钮"
      onConfirm={confirm}
    />,
  );

  wrapper.find('button').simulate('click');
  expect(confirm.calledOnce).toBe(true);
});

test('should render close icon', () => {
  const confirm = sinon.spy();

  const wrapper = mount(
    <DialogAlert
      open
      size="m"
      type="success"
      title="决策型对话框"
      text="正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分"
      hideClose={false}
      onClose={confirm}
    />,
  );

  wrapper.find('button svg').simulate('click');
  expect(confirm.calledOnce).toBe(true);
});

test('should accept cancelText and onCancel', () => {
  const cancel = sinon.spy();

  const wrapper = mount(
    <DialogAlert
      open
      type="success"
      title="决策型对话框"
      text="正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分"
      confirmText=""
      cancelText="主按钮"
      onCancel={cancel}
    />,
  );

  wrapper.find('button').simulate('click');
  expect(cancel.calledOnce).toBe(true);
});

test('should accept cancelButtonProps and confirmButtonProps', () => {
  const cancel = sinon.spy();

  const wrapper = mount(
    <DialogAlert
      open
      type="success"
      title="决策型对话框"
      text="正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分"
      confirmText="主按钮"
      cancelText="取消"
      cancelButtonProps={{
        id: 'cancelButton',
      }}
      confirmButtonProps={{
        id: 'confirmButton',
        loading: true,
      }}
      onCancel={cancel}
    />,
  );

  expect(wrapper.find('#confirmButton').find('svg')).toHaveLength(1);
});

test('test alert sugar', () => {
  const spy = sinon.spy;
  const alertInstance = alert({
    size: 's',
    type: 'success',
    title: '提示型对话框',
    confirmText: '主按钮',
    text: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长篇大论',
    onConfirm: spy,
  });
  expect(alertInstance.getConfig().title).toBe('提示型对话框');

  alertInstance.close();
  expect(alertInstance.getConfig().open).toBe(false);

  alertInstance.open();
  expect(alertInstance.getConfig().open).toBe(true);

  alertInstance.update({ title: 'test' });
  expect(alertInstance.getConfig().title).toBe('test');

  const unmounted = alertInstance.destroy();
  expect(unmounted).toBe(true);

  config({ title: 'modify all instance title' });
  expect(alertInstance.getConfig().title).toBe('modify all instance title');
});
