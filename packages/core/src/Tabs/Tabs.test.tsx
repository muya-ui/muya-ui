import React from 'react';
import renderer from 'react-test-renderer';

import Tab from './Tab';
import Tabs from './Tabs';

test('测试 Tabs line no tab', () => {
  const tree = renderer.create(<Tabs></Tabs>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs line no valid tab', () => {
  const tree = renderer.create(<Tabs>ss</Tabs>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs line', () => {
  const tree = renderer
    .create(
      <Tabs>
        <Tab>1</Tab>
        <Tab>2</Tab>
        <Tab>3</Tab>
      </Tabs>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs 自定义高度，文字水平居中', () => {
  const tree = renderer
    .create(
      <Tabs height={60}>
        <Tab>1</Tab>
        <Tab>2</Tab>
        <Tab>3</Tab>
      </Tabs>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs card no tab', () => {
  const tree = renderer.create(<Tabs type="card"></Tabs>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs card no valid tab', () => {
  const tree = renderer.create(<Tabs type="card">ss</Tabs>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs card', () => {
  const tree = renderer
    .create(
      <Tabs type="card">
        <Tab>1</Tab>
        <Tab>2</Tab>
        <Tab>3</Tab>
      </Tabs>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Tabs empty', () => {
  const tree = renderer.create(<Tabs type="card"></Tabs>).toJSON();
  expect(tree).toMatchSnapshot();
});
