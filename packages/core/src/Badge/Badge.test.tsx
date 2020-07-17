import React from 'react';
import renderer from 'react-test-renderer';

import Badge from './index';

test('should render normal badge', () => {
  const tree = renderer
    .create(
      <>
        <Badge value={0}>message</Badge>
        <Badge value={0} showZero>
          message
        </Badge>
        <Badge value={10}>message</Badge>
        <Badge value={10} isStroke>
          message
        </Badge>
        <Badge value={10} isStroke color="#409eff">
          message
        </Badge>
        <Badge dot>message</Badge>
        <Badge dot color="#409eff">
          message
        </Badge>
        <Badge value="New">message</Badge>
        <Badge value="New" color="#409eff">
          message
        </Badge>
        <Badge value="New" color="#409eff" isStroke>
          message
        </Badge>
        <Badge value="New" color="#409eff" isStroke>
          message
        </Badge>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render small badge', () => {
  const tree = renderer
    .create(
      <>
        <Badge value={10} size="s">
          message
        </Badge>
        <Badge value={10} isStroke color="#409eff" size="s">
          message
        </Badge>
        <Badge dot size="s">
          message
        </Badge>
        <Badge value="New" color="#409eff" size="s">
          message
        </Badge>
        <Badge value="New" color="#409eff" isStroke size="s">
          message
        </Badge>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render overflow badge', () => {
  const tree = renderer
    .create(
      <>
        <Badge value={100}>message</Badge>,
        <Badge value={1000} max={999}>
          message
        </Badge>
        ,
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render detached badges', () => {
  const tree = renderer
    .create(
      <>
        <Badge dot />
        <Badge dot detached>
          message
        </Badge>
        <Badge value={10} />
        <Badge value={10} detached>
          message
        </Badge>
        <Badge value="Hot" />
        <Badge value="Hot" detached>
          message
        </Badge>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
