import React from 'react';
import renderer from 'react-test-renderer';

import Button from './MaskButton';

test('disabled=true', () => {
  const tree = renderer.create(<Button disabled>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('busy=true', () => {
  const tree = renderer.create(<Button busy>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('loading=true', () => {
  const tree = renderer.create(<Button loading>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

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

test('测试 marginLeft', () => {
  const tree = renderer.create(<Button disableSiblingMargin={true}>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
