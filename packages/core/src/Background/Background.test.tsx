import React from 'react';
import renderer from 'react-test-renderer';

import Background from './Background';

test('Background 正常情况', () => {
  const tree = renderer.create(<Background />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Background 不同 type', () => {
  const tree = renderer
    .create(
      <div>
        <Background type="global">背景模式：global</Background>
        <Background type="higher">背景模式：higher</Background>
        <Background type="block">背景模式：block</Background>
        <Background type="selectedBlock">背景模式：selectedBlock</Background>
        <Background type="disabled">背景模式：disabled</Background>
        <Background type="divider">背景模式：divider</Background>
        <Background type="mask" color="#FFF">
          背景模式：mask
        </Background>
      </div>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Background 设置宽高', () => {
  const tree = renderer.create(<Background width={100} height={100} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Background 设置颜色', () => {
  const tree = renderer.create(<Background color="#FFF" backgroundColor="#000" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Background 设置 display', () => {
  const tree = renderer.create(<Background display="inline-block" component="span" />).toJSON();
  expect(tree).toMatchSnapshot();
});
