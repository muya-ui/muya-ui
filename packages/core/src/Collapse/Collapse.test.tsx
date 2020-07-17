import React from 'react';
import renderer from 'react-test-renderer';
import { FoldIcon } from '@muya-ui/theme-light';
import sinon from 'sinon';

import { Collapse, CollapsePanel } from './';
import { StyledCollapseHeader } from './styled';
import { mount } from 'enzyme';
import Animation from '../Animation';

const text = 'a quick brown fox jumps over the lazy dog';

test('collapse render correctly', () => {
  const tree = renderer.create(
    <Collapse
      defaultActiveKeys={['1', '2', '3']}
      onChange={key => {
        console.log(key);
      }}
    >
      <CollapsePanel header="标题1" key="1">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题2" key="2">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题3" key="3" disabled>
        <p>{text}</p>
      </CollapsePanel>
    </Collapse>,
  );
  expect(tree).toMatchSnapshot();
});

test('collapse expand', () => {
  const onChange = sinon.spy();
  const onHeaderClick = sinon.spy();
  const wrapper = mount(
    <Collapse onChange={onChange}>
      <CollapsePanel onHeaderClick={onHeaderClick} header="标题1" key="1">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题2" key="2">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题3" key="3" disabled>
        <p>{text}</p>
      </CollapsePanel>
    </Collapse>,
  );
  wrapper
    .find(StyledCollapseHeader)
    .at(0)
    .simulate('click');
  expect(onChange.calledOnce).toBe(true);
  expect(onHeaderClick.calledOnce).toBe(true);

  wrapper
    .find(StyledCollapseHeader)
    .at(0)
    .simulate('click');
  expect(onChange.calledTwice).toBe(true);
  expect(onHeaderClick.calledTwice).toBe(true);
});

test('accordion collapse', () => {
  const wrapper = mount(
    <Collapse defaultActiveKeys={['1', '2', '3']} accordion>
      <CollapsePanel header="标题1" key="1" extra={<button id="extra">test</button>}>
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题2" key="2">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题3" key="3" disabled>
        <p>{text}</p>
      </CollapsePanel>
    </Collapse>,
  );
  expect(wrapper.find(Animation.Collapse).map(node => node.prop('in'))).toEqual([
    true,
    false,
    false,
  ]);

  wrapper
    .find(StyledCollapseHeader)
    .at(0)
    .simulate('click');

  expect(wrapper.find(Animation.Collapse).map(node => node.prop('in'))).toEqual([
    false,
    false,
    false,
  ]);

  wrapper
    .find(StyledCollapseHeader)
    .at(0)
    .simulate('click');

  expect(wrapper.find(Animation.Collapse).map(node => node.prop('in'))).toEqual([
    true,
    false,
    false,
  ]);

  wrapper
    .find(StyledCollapseHeader)
    .at(0)
    .find('#extra')
    .simulate('click');

  expect(wrapper.find(Animation.Collapse).map(node => node.prop('in'))).toEqual([
    true,
    false,
    false,
  ]);

  wrapper
    .find(StyledCollapseHeader)
    .at(0)
    .simulate('click');

  expect(wrapper.find(Animation.Collapse).map(node => node.prop('in'))).toEqual([
    false,
    false,
    false,
  ]);
});

test('collapse panel has no key prop', () => {
  const wrapper = mount(
    <Collapse activeKeys={[2]} accordion>
      <CollapsePanel header="标题1">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题2">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel header="标题3">
        <p>{text}</p>
      </CollapsePanel>
    </Collapse>,
  );
  const inList = wrapper.find(Animation.Collapse).map(node => node.prop('in'));
  expect(inList).toEqual([false, false, true]);
});

test('collapsePanel custom config', () => {
  const wrapper = mount(
    <Collapse>
      <CollapsePanel showArrow={false} header="标题1">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel isActive header="标题2">
        <p>{text}</p>
      </CollapsePanel>
      <CollapsePanel expandIconPosition="right" header="标题3">
        <p>{text}</p>
      </CollapsePanel>
    </Collapse>,
  );
  expect(
    wrapper
      .find(StyledCollapseHeader)
      .at(0)
      .find(FoldIcon),
  ).toHaveLength(0);

  expect(
    wrapper
      .find(StyledCollapseHeader)
      .at(2)
      .find(FoldIcon),
  ).toHaveLength(1);

  const inList = wrapper.find(Animation.Collapse).map(node => node.prop('in'));
  expect(inList).toEqual([false, true, false]);
});
