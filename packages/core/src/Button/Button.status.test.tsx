import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

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
