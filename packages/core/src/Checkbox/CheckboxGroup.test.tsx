import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { ICheckboxGroupValue } from '@muya-ui/core';

import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

test('测试字符串Option', () => {
  const options = ['a', 'b', 'c'];
  let list: ICheckboxGroupValue[] = [];
  const wrap = mount(
    <CheckboxGroup
      options={options}
      value={list}
      onChange={value => {
        list = value;
      }}
    />,
  );
  wrap
    .find('input')
    .first()
    .simulate('change', { target: { checked: true } });
  expect(list[0]).toEqual('a');
});

test('测试 value 为 undefined', () => {
  const options = ['a', 'b', 'c'];
  let list: ICheckboxGroupValue[] = [];
  const wrap = mount(
    <CheckboxGroup
      options={options}
      value={undefined}
      onChange={value => {
        list = value;
      }}
    />,
  );
  wrap
    .find('input')
    .first()
    .simulate('change', { target: { checked: true } });
  expect(list[0]).toEqual('a');
});

test('测试对象Option', () => {
  const onChange1 = sinon.stub();
  const onChange2 = sinon.stub();
  const options = [
    { label: 'a', value: 1, onChange: onChange1 },
    { label: 'b', value: 2, onChange: onChange2 },
    { label: 'c', value: 3 },
    { label: 'd', value: 4, disabled: true },
  ];

  const wrap = mount(<CheckboxGroup options={options} defaultValue={[2]} />);
  expect(
    wrap
      .find('div')
      .childAt(1)
      .find('input')
      .prop('checked'),
  ).toEqual(true);
  wrap
    .find('input')
    .first()
    .simulate('change', { target: { checked: true } });
  expect(() => {
    sinon.assert.calledOnce(onChange1);
    sinon.assert.notCalled(onChange2);
  }).not.toThrow();
  wrap
    .find('div')
    .childAt(1)
    .find('input')
    .simulate('change', { target: { checked: false } });
  expect(() => {
    sinon.assert.calledOnce(onChange2);
  }).not.toThrow();
});

test('测试没有任何参数', () => {
  const tree = renderer.create(<CheckboxGroup />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试自定义渲染 CheckBox', () => {
  const tree = renderer
    .create(
      <CheckboxGroup renderCheckbox={node => <div>{node}</div>}>
        111
        <Checkbox value={1}>1</Checkbox>
        <Checkbox value={2}>2</Checkbox>
        <Checkbox value={3}>3</Checkbox>
      </CheckboxGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试自定义渲染 CheckBox width ellipsis', () => {
  const tree = renderer
    .create(
      <CheckboxGroup checkboxEllipsis checkboxWidth={100}>
        111
        <Checkbox value={1}>1</Checkbox>
        <Checkbox value={2}>2</Checkbox>
        <Checkbox value={3}>3</Checkbox>
      </CheckboxGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
