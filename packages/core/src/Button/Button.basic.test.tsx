import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

test('测试设置按钮 width', () => {
  const tree = renderer
    .create(
      <>
        <Button width={200}>Test</Button>
        <Button width="20%">Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('render as link', () => {
  const tree = renderer
    .create(
      <>
        <Button href="test">Test</Button>
        <Button component="a">Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 prop shape', () => {
  const tree = renderer
    .create(
      <>
        <Button shape="circle">Test</Button>
        <Button shape="round">Test</Button>
        <Button shape="square">Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 prefix suffix', () => {
  const node = <span>aa</span>;
  const tree = renderer
    .create(
      <>
        <Button prefixNode={node}>Test</Button>
        <Button suffixNode={node}>Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 prop block', () => {
  const tree = renderer
    .create(
      <>
        <Button block>Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('have static perperty for type detecting', () => {
  const wrapper = mount(<Button>按钮</Button>);
  // eslint-disable-next-line
  expect((wrapper.type() as any).__MUYA_BUTTON).toBe(true);
});

test('测试 marginLeft', () => {
  const tree = renderer.create(<Button disableSiblingMargin={true}>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
