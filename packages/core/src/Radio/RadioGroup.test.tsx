import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { IRadioGroupValue } from '@muya-ui/core';

import Radio from './Radio';
import RadioGroup from './RadioGroup';

test('shound onChange ok when options is string[]', () => {
  const options = ['a', 'b', 'c'];
  const onChange = sinon.spy();
  let groupValue: IRadioGroupValue = null;
  const wrap = mount(
    <RadioGroup
      options={options}
      value={groupValue}
      onChange={(value: IRadioGroupValue) => {
        groupValue = value;
        onChange();
      }}
    />,
  );
  wrap
    .find('input')
    .first()
    .simulate('change', { target: { checked: true } });
  expect(groupValue).toEqual('a');
  expect(onChange.calledOnce).toBe(true);
});

test('shound defaultValue take effect when options is object[]', () => {
  const onChange1 = sinon.stub();
  const onChange2 = sinon.stub();
  const options = [
    { label: 'a', value: 1, onChange: onChange1 },
    { label: 'b', value: 2, onChange: onChange2 },
    { label: 'c', value: 3 },
    { label: 'd', value: 4, disabled: true },
  ];

  const wrap = mount(<RadioGroup options={options} defaultValue={2} />);
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

test('shound not change when all disabled', () => {
  const options = ['a', 'b', 'c'];
  const onChange = sinon.stub();
  const wrapper = mount(<RadioGroup options={options} value="b" disabled onChange={onChange} />);

  wrapper
    .find('input')
    .first()
    .simulate('change', { target: { checked: true } });
  wrapper
    .find('label')
    .first()
    .simulate('click');
  expect(() => {
    sinon.assert.notCalled(onChange);
  }).not.toThrow();
});

test('Snapshots should be matched in the base case', () => {
  const options = [
    { label: 'a', value: 1 },
    { label: 'b', value: 2 },
    { label: 'c', value: 3 },
    { label: 'd', value: 4, disabled: true },
  ];
  const tree = renderer.create(<RadioGroup options={options} defaultValue={2} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshots 自定义 radio 渲染', () => {
  const tree = renderer
    .create(
      <RadioGroup defaultValue={2} renderRadio={node => <div>{node}</div>}>
        11
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
        <Radio value={3}>3</Radio>
      </RadioGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshots 自定义 width 和 ellipsis', () => {
  const tree = renderer
    .create(
      <RadioGroup defaultValue={2} radioEllipsis radioWidth={100}>
        11
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
        <Radio value={3}>3</Radio>
      </RadioGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
