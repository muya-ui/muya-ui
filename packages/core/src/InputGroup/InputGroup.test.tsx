import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Button from '../Button';
import Input from '../Input';
import { StyledPopperInputWrapper } from '../Input/styled';
import Select, { Option } from '../Select';
import InputGroup from './InputGroup';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <InputGroup>
        <Input></Input>
        <Button>确认</Button>
      </InputGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should set zIndex when focus and blur', () => {
  const handleFocus = sinon.spy();
  const handleBlur = sinon.spy();
  const handleVisibleChange = sinon.spy();
  const wrapper = mount(
    <InputGroup>
      <Input autoFocus id="test1" />
      <Select id="select1" onPopupVisibleChange={handleVisibleChange}>
        <Option value="111" />
      </Select>
      <Button>确认</Button>
    </InputGroup>,
  );

  const wrapperWithCallback = mount(
    <InputGroup disabled>
      <Input onBlur={handleBlur} onFocus={handleFocus} autoFocus id="test2" />
      <Button type="primary">确认</Button>
      {''}
    </InputGroup>,
  );

  wrapper
    .find('input')
    .at(0)
    .simulate('focus', {});

  expect(
    window.getComputedStyle(
      wrapper
        .find('#test1')
        .at(0)
        .getDOMNode(),
    ).zIndex,
  ).toBe('1');

  wrapper
    .find('input')
    .at(0)
    .simulate('blur', {});

  expect(
    window.getComputedStyle(
      wrapper
        .find('#test1')
        .at(0)
        .getDOMNode(),
    ).zIndex,
  ).toBe('');

  wrapperWithCallback
    .find('input')
    .at(0)
    .simulate('focus', {});
  wrapperWithCallback
    .find('input')
    .at(0)
    .simulate('blur', {});
  wrapper
    .find(StyledPopperInputWrapper)
    .find('input')
    .at(0)
    .simulate('click', {});

  expect(handleFocus.calledOnce).toBe(true);
  expect(handleBlur.calledOnce).toBe(true);
  expect(handleVisibleChange.calledOnce).toBe(true);
});
