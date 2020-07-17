import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import { InlineButton } from '../Button';
import Alert from './Alert';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

test('should render correctly', () => {
  const tree = renderer
    .create(
      <>
        <Alert type="error">这是一条 error 提示文案</Alert>
        <Alert type="info" title="sssss" showClose>
          这是一条 error 提示文案
        </Alert>
        <Alert type="info" showIcon={false}>
          <div>这是一条 error 提示文案这是一条 error 提示文案</div>
        </Alert>
        <Alert>
          <div>这是一条 error 提示文案这是一条 error 提示文案</div>
        </Alert>
        <Alert type="warning" childrenAsTitle>
          <div>这是一条 error 提示文案这是一条 error 提示文案</div>
        </Alert>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render different size', () => {
  const tree = renderer
    .create(
      <>
        <Alert type="error">这是一条 error 提示文案</Alert>
        <Alert type="info" title="sssss" showClose size="s">
          这是一条 error 提示文案
        </Alert>
        <Alert type="info" showIcon={false} size="m">
          <div>这是一条 error 提示文案这是一条 error 提示文案</div>
        </Alert>
        <Alert size="l">
          <div>这是一条 error 提示文案这是一条 error 提示文案</div>
        </Alert>
        <Alert size="xl">
          <div>这是一条 error 提示文案这是一条 error 提示文案</div>
        </Alert>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('有 title 和 desc 的情况', () => {
  const tree = renderer
    .create(
      <>
        <Alert type="error" description="测试赛所所" showClose>
          ssss
        </Alert>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('close correctly', () => {
  const onClose = sinon.spy();
  const wrapper = mount(
    <Alert type="error" showClose onClose={onClose}>
      这是一条 error 提示文案
    </Alert>,
  );
  wrapper.find(InlineButton).simulate('click');
  expect(() => {
    sinon.assert.calledOnce(onClose);
  }).not.toThrow();
});

test('close controlled correctly', () => {
  const onClose = sinon.spy();
  const wrapper = mount(
    <Alert type="error" showClose onClose={onClose} visible={true}>
      这是一条 error 提示文案
    </Alert>,
  );
  wrapper.find(InlineButton).simulate('click');
  expect(() => {
    sinon.assert.calledOnce(onClose);
  }).not.toThrow();
});
