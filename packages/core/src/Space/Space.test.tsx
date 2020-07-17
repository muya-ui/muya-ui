import React from 'react';
import renderer from 'react-test-renderer';

import Space from './Space';
import Typography from '../Typography';
import Button from '../Button';
import { mount } from 'enzyme';

test('测试 Space正常渲染', () => {
  const tree = renderer
    .create(
      <Space direction="vertical">
        <Space spacing="s6">
          <Typography.Title>我是标题</Typography.Title>
          普通文本
        </Space>
        {}
        {null}
        <Space spacing={10}>
          <Button type="primary">主要按钮</Button>
          <Button>普通按钮</Button>
        </Space>
        <Typography.Title>另起一行的标题</Typography.Title>
      </Space>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 block Space', () => {
  const wrapper = mount(
    <Space direction="vertical" block>
      <button>111</button>
      <button>222</button>
    </Space>,
  );
  expect(wrapper).toHaveStyleRule('display', 'flex');
});
