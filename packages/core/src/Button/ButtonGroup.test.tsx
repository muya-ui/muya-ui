import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';
import ButtonGroup, { getOffBorder, IChildConfigMap } from './ButtonGroup';

test('测试 ButtonGroup 正常情况', () => {
  const tree = renderer
    .create(
      <ButtonGroup>
        <Button>AAA</Button>
        <Button>AAA</Button>
      </ButtonGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 ButtonGroup 子元素属性传递', () => {
  const tree = renderer
    .create(
      <ButtonGroup size="xl" block>
        sss
        <Button>AAA</Button>
        <Button>AAA</Button>
        <Button>AAA</Button>
      </ButtonGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 ButtonGroup 空情况', () => {
  const tree = renderer.create(<ButtonGroup size="xl" block></ButtonGroup>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 ButtonGroup 单节点', () => {
  const tree = renderer
    .create(
      <ButtonGroup size="xl" block>
        <Button>AAA</Button>
      </ButtonGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 ButtonGroup selected 快捷方式', () => {
  const tree = renderer
    .create(
      <ButtonGroup>
        <Button selected={false}>AAA</Button>
        <Button selected>AAA</Button>
        <Button selected={false}>AAA</Button>
      </ButtonGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 ButtonGroup getOffBorder', () => {
  const c1: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'head',
      zIndex: 2,
    },
  };
  expect(getOffBorder(0, c1)).toBe('no');
  const c2: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'head',
      zIndex: 4,
    },
  };
  expect(getOffBorder(0, c2)).toBe('right');
  const c3: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'tail',
      zIndex: 2,
    },
  };
  expect(getOffBorder(1, c3)).toBe('left');
  const c4: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'tail',
      zIndex: 4,
    },
  };
  expect(getOffBorder(1, c4)).toBe('no');
  const c5: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'group',
      zIndex: 2,
    },
    2: {
      groupType: 'tail',
      zIndex: 4,
    },
  };
  expect(getOffBorder(1, c5)).toBe('both');
  const c6: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'group',
      zIndex: 10,
    },
    2: {
      groupType: 'tail',
      zIndex: 4,
    },
  };
  expect(getOffBorder(1, c6)).toBe('no');
  const c7: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 3,
    },
    1: {
      groupType: 'group',
      zIndex: 4,
    },
    2: {
      groupType: 'tail',
      zIndex: 5,
    },
  };
  expect(getOffBorder(1, c7)).toBe('right');
  const c8: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 5,
    },
    1: {
      groupType: 'group',
      zIndex: 4,
    },
    2: {
      groupType: 'tail',
      zIndex: 3,
    },
  };
  expect(getOffBorder(1, c8)).toBe('left');
  const c9: IChildConfigMap = {
    0: {
      groupType: 'head',
      zIndex: 5,
    },
  };
  expect(getOffBorder(0, c9, true)).toBe('right');
  const c10: IChildConfigMap = {
    0: {
      groupType: 'group',
      zIndex: 5,
    },
  };
  expect(getOffBorder(0, c10, true)).toBe('right');
  const c11: IChildConfigMap = {
    0: {
      groupType: 'tail',
      zIndex: 5,
    },
  };
  expect(getOffBorder(0, c11, true)).toBe('no');
});
