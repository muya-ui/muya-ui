import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Skeleton from './Skeleton';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <div>
        <h3>block 块级骨架屏</h3>
        <Skeleton style={{ width: '500px', height: '200px' }}>内容</Skeleton>
        <h3>tree 树形骨架屏</h3>
        <Skeleton type="tree" rows={3} style={{ width: '150px' }}>
          内容
        </Skeleton>
        <Skeleton type="tree" rows={3} style={{ width: '150px' }}>
          内容
        </Skeleton>
        <h3>navigation 导航式骨架屏</h3>
        <Skeleton type="navigation" style={{ width: '150px' }}>
          内容
        </Skeleton>
        <h3>paragraph 段落式骨架屏</h3>
        <Skeleton type="paragraph" style={{ width: '500px' }}>
          内容
        </Skeleton>
        <h3>card 卡片式骨架屏</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton type="card" style={{ width: '220px', height: '180px' }}>
            内容
          </Skeleton>
          <Skeleton type="card" style={{ width: '220px', height: '180px' }}>
            内容
          </Skeleton>
          <Skeleton type="card" style={{ width: '220px', height: '180px' }}>
            内容
          </Skeleton>
          <Skeleton type="card" style={{ width: '220px', height: '180px' }}>
            内容
          </Skeleton>
        </div>
      </div>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render children when loading is false', () => {
  const wrapper = mount(
    <Skeleton loading={false} style={{ width: '500px', height: '200px' }}>
      <div id="test"></div>
    </Skeleton>,
  );
  expect(wrapper.find('#test')).toHaveLength(1);
});

test('should not have animation when active is false', () => {
  const wrapper = mount(
    <Skeleton active={false} style={{ width: '500px', height: '200px' }}>
      <div id="test"></div>
    </Skeleton>,
  );
  expect(wrapper).toHaveStyleRule('animation', undefined);
});
