import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

test('测试 prop groupType', () => {
  const tree = renderer
    .create(
      <>
        <Button groupType="head">Test</Button>
        <Button groupType="tail">Test</Button>
        <Button groupType="group">Test</Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 prop offBorder', () => {
  const tree = renderer
    .create(
      <>
        <Button offBorder="right" disabled>
          Test
        </Button>
        <Button offBorder="left" disabled>
          Test
        </Button>
        <Button offBorder="both" disabled>
          Test
        </Button>
        <Button offBorder="no" disabled>
          Test
        </Button>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
