import { mount } from 'enzyme';
import React, { ChangeEvent, useState } from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Checkbox from './Checkbox';

test('测试默认Checkbox', () => {
  const onClick = sinon.stub();
  const wrapper = mount(<Checkbox onClick={onClick}>Hello World</Checkbox>);
  expect(
    wrapper
      .find('span')
      .last()
      .text(),
  ).toEqual('Hello World');
  expect(wrapper.find('input').prop('checked')).toEqual(false);
  wrapper.find('input').simulate('click');
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(wrapper.find('input').prop('checked')).toEqual(true);
  expect(() => {
    sinon.assert.calledOnce(onClick);
  }).not.toThrow();
});

test('测试Checkbox checked是否正确设置', () => {
  const wrapper = mount(<Checkbox checked={true}>Hello World</Checkbox>);
  expect(wrapper.find('input').prop('checked')).toEqual(true);
});

test('测试Checkbox 受控Change', () => {
  function Com() {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <span>{checked.toString()}</span>
        <Checkbox
          checked={checked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
        >
          Hello
        </Checkbox>
      </div>
    );
  }
  const wrapper = mount(<Com />);
  expect(
    wrapper
      .find('span')
      .first()
      .text(),
  ).toEqual('false');
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(
    wrapper
      .find('span')
      .first()
      .text(),
  ).toEqual('true');
});

test('测试Checkbox', () => {
  const onFocus = sinon.stub();
  const onBlur = sinon.stub();
  const wrapper = mount(
    <Checkbox onBlur={onBlur} onFocus={onFocus}>
      Hello World
    </Checkbox>,
  );
  wrapper.find('input').simulate('focus');
  wrapper.find('input').simulate('blur');
  expect(() => {
    sinon.assert.calledOnce(onFocus);
    sinon.assert.calledOnce(onBlur);
  }).not.toThrow();
});

test('测试Disabled', () => {
  const onChange = sinon.stub();
  const wrapper = mount(
    <Checkbox disabled onChange={onChange}>
      Hello World
    </Checkbox>,
  );
  wrapper.find('input').simulate('change');
  expect(() => {
    sinon.assert.notCalled(onChange);
  }).not.toThrow();
});

test('测试事件', () => {
  const onChange = sinon.stub();
  const wrapper = mount(<Checkbox onChange={onChange}>Hello World</Checkbox>);
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(() => {
    sinon.assert.calledOnce(onChange);
  }).not.toThrow();
});

test('测试半选', () => {
  const tree = renderer.create(<Checkbox indeterminate />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试Size', () => {
  const tree = renderer
    .create(
      <div>
        <Checkbox size="s" />
        <Checkbox size="m" />
        <Checkbox size="l" />
        <Checkbox size="xl" />
        <Checkbox />
      </div>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
