import React from 'react';
import renderer from 'react-test-renderer';

import BaseMenu from './index';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <BaseMenu.Menu maxItemCountPerPage={5}>
        <BaseMenu.Group label="分组一">
          <BaseMenu.Item>选项一</BaseMenu.Item>
          <BaseMenu.Item>选项二</BaseMenu.Item>
        </BaseMenu.Group>
        <BaseMenu.Divider></BaseMenu.Divider>
        <BaseMenu.Item loading>选项普通</BaseMenu.Item>
        <BaseMenu.Item selected>选项选中</BaseMenu.Item>
        <BaseMenu.Item disabled>选项禁用</BaseMenu.Item>
        <BaseMenu.Item loading>选项加载</BaseMenu.Item>
      </BaseMenu.Menu>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试不同宽度渲染', () => {
  const tree = renderer
    .create(
      <BaseMenu.Menu
        width={{
          s: 100,
          m: 200,
          l: 300,
          xl: 400,
        }}
      >
        <BaseMenu.Group label="分组一">
          <BaseMenu.Item>选项一</BaseMenu.Item>
          <BaseMenu.Item>选项二</BaseMenu.Item>
        </BaseMenu.Group>
        <BaseMenu.Divider></BaseMenu.Divider>
        <BaseMenu.Item loading>选项普通</BaseMenu.Item>
        <BaseMenu.Item selected>选项选中</BaseMenu.Item>
        <BaseMenu.Item disabled>选项禁用</BaseMenu.Item>
        <BaseMenu.Item loading>选项加载</BaseMenu.Item>
      </BaseMenu.Menu>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
