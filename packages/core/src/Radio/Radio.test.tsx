import { mount } from 'enzyme';
import React, { ChangeEvent, useState } from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Radio from './Radio';

test('should mount and test onChange', () => {
  const onChange = sinon.stub();
  const wrapper = mount(
    <Radio
      onChange={onChange}
      styles={{
        wrapper: 'radio-demo-wrapper',
      }}
    >
      Apple
    </Radio>,
  );
  expect(
    wrapper
      .find('span')
      .last()
      .text(),
  ).toEqual('Apple');
  expect(wrapper.find('input').prop('checked')).toEqual(false);
  wrapper.simulate('click');
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(wrapper.find('input').prop('checked')).toEqual(true);
  expect(() => {
    sinon.assert.calledOnce(onChange);
  }).not.toThrow();
  expect(wrapper.find('label.radio-demo-wrapper')).toHaveLength(1);
});

test('should checked if checked=true', () => {
  const wrapper = mount(<Radio checked={true}>Apple</Radio>);
  expect(wrapper.find('input').prop('checked')).toEqual(true);
});

test('should controlled checked with onChange', () => {
  function Com() {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <Radio
          checked={checked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
        >
          {checked.toString()}
        </Radio>
      </div>
    );
  }
  const wrapper = mount(<Com />);
  expect(
    wrapper
      .find('span')
      .last()
      .text(),
  ).toEqual('false');
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(
    wrapper
      .find('span')
      .last()
      .text(),
  ).toEqual('true');
});

test('should not focus or onChange if disabled', () => {
  const onFocus = sinon.stub();
  const onBlur = sinon.stub();
  const onChange = sinon.stub();
  const wrapper = mount(
    <Radio disabled onBlur={onBlur} onFocus={onFocus} onChange={onChange}>
      Apple
    </Radio>,
  );
  wrapper.find('input').simulate('focus');
  wrapper.find('input').simulate('blur');
  wrapper.find('input').simulate('change');
  wrapper.simulate('click');

  // https://github.com/airbnb/enzyme/issues/386
  // expect(() => {
  //   sinon.assert.notCalled(onFocus);
  //   sinon.assert.notCalled(onBlur);
  //   sinon.assert.notCalled(onChange);
  // }).not.toThrow();
});

test('should focus even if no onFocus', () => {
  const wrapper = mount(<Radio>Apple</Radio>);
  wrapper.find('input').simulate('focus');
  wrapper.find('input').simulate('blur');
});

test('Snapshots should be matched in the base case', () => {
  const tree = renderer.create(<Radio>Apple</Radio>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshots should be matched in different size', () => {
  const tree = renderer
    .create(
      <div>
        <Radio size="s" />
        <Radio size="m" />
        <Radio size="l" />
        <Radio size="xl" />
        <Radio />
      </div>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
