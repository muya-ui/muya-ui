import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from './InlineButton';

test('不同类型', () => {
  const tree = renderer
    .create(
      <>
        <Button type="primary">Test</Button>
        <Button type="strong">Test</Button>
        <Button>Test</Button>
        <Button type="secondary">Test</Button>
        <Button type="weak">Test</Button>
        <Button type="danger">Test</Button>
        <Button type="warning">Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('disabled=true', () => {
  const tree = renderer
    .create(
      <>
        <Button type="primary" disabled>
          Test
        </Button>
        <Button type="strong" disabled>
          Test
        </Button>
        <Button disabled>Test</Button>
        <Button type="secondary" disabled>
          Test
        </Button>
        <Button type="weak" disabled>
          Test
        </Button>
        <Button type="danger" disabled>
          Test
        </Button>
        <Button type="warning" disabled>
          Test
        </Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('busy=true', () => {
  const tree = renderer
    .create(
      <>
        <Button type="primary" busy>
          Test
        </Button>
        <Button type="strong" busy>
          Test
        </Button>
        <Button busy>Test</Button>
        <Button type="secondary" busy>
          Test
        </Button>
        <Button type="weak" busy>
          Test
        </Button>
        <Button type="danger" busy>
          Test
        </Button>
        <Button type="warning" busy>
          Test
        </Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('loading=true', () => {
  const tree = renderer
    .create(
      <>
        <Button type="primary" loading>
          Test
        </Button>
        <Button type="strong" loading>
          Test
        </Button>
        <Button loading>Test</Button>
        <Button type="secondary" loading>
          Test
        </Button>
        <Button type="weak" loading>
          Test
        </Button>
        <Button type="danger" loading>
          Test
        </Button>
        <Button type="warning" loading>
          Test
        </Button>
      </>,
    )
    .toJSON();
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

test('测试 marginLeft', () => {
  const tree = renderer.create(<Button disableSiblingMargin={true}>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
