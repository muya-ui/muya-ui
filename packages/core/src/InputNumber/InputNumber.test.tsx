import React from 'react';
import renderer from 'react-test-renderer';
import InputNumber from './InputNumber';
import { mount } from 'enzyme';
import { SuccessIcon } from '@muya-ui/theme-light';

describe('InputNumber Component', () => {
  it('should InputNumber Component mount success', () => {
    const wrapper = renderer
      .create(
        <>
          <InputNumber defaultValue={4} />
          <InputNumber size="l" defaultValue={4} value={5} />
          <InputNumber size="xl" value={5} />
          <InputNumber size="s" />
          <InputNumber defaultValue={4} suffixNode="元" />
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should mouse event change style', () => {
    const wrapper = mount(
      <>
        <InputNumber defaultValue={4} />
      </>,
    );
    wrapper.simulate('mouseEnter');
    expect(wrapper.find('svg')).toHaveLength(2);
  });
  it('should render disabled style', () => {
    const wrapper = mount(
      <>
        <InputNumber defaultValue={4} disabled suffixNode={<SuccessIcon />} />
      </>,
    );
    wrapper.simulate('mouseEnter');
    expect(wrapper.find('svg')).toHaveLength(1);
  });
  it('should click arrow to trigger the input focus', () => {
    const wrapper = mount(
      <>
        <InputNumber value={1} />
      </>,
    );
    wrapper.simulate('mouseEnter');
    wrapper.find('svg').map(svg => svg.simulate('click'));
    expect(wrapper.find('input').is(':focus')).toBe(true);
    wrapper.simulate('mouseEnter');
    wrapper.find('svg').map(svg => svg.simulate('click'));
    wrapper.find('input').simulate('compositionStart');
    wrapper.find('input').simulate('compositionEnd');
  });
  it('should do not display error value', () => {
    const wrapper = mount(
      <>
        <InputNumber value="dddd" />
      </>,
    );
    const text = wrapper.find('input').text();
    expect(text).toBe('');
  });
  it('should handleChange success', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <>
        <InputNumber onChange={fn} />
      </>,
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '123' } });
    expect(fn.mock.calls[0][0]).toBe('123');
    input.simulate('change', { target: { value: 'ddd' } });
    expect(fn.mock.calls[1][0]).toBe('');
    input.simulate('compositionStart');
    input.simulate('change', { target: { value: '123' } });
    expect(fn.mock.calls).toHaveLength(2);
  });
  it('should handleKeyDown success', () => {
    const wrapper = mount(
      <>
        <InputNumber defaultValue={1} />
      </>,
    );
    const input = wrapper.find('input');
    input.simulate('keydown', { keyCode: 38 });
    expect(wrapper.find('input').props().value).toBe('2');
    input.simulate('keydown', { keyCode: 40 });
    expect(wrapper.find('input').props().value).toBe('1');
    input.simulate('keydown', { keyCode: 189 });
    expect(wrapper.find('input').props().value).toBe('1');
    input.simulate('keydown', { keyCode: 190 });
    expect(wrapper.find('input').props().value).toBe('1');
    input.simulate('keydown', { keyCode: 48 });
    expect(wrapper.find('input').props().value).toBe('1');
  });
  it('should handleBlur success', () => {
    const fn = jest.fn();
    const changeFn = jest.fn();
    const wrapper = mount(
      <>
        <InputNumber onBlur={fn} onChange={changeFn} value={5} />
      </>,
    );
    const input = wrapper.find('input');
    input.simulate('blur');
    expect(fn).toBeCalled();
    expect(changeFn.mock.calls[0][0]).toBe('5');

    const wrapper1 = mount(
      <>
        <InputNumber onChange={changeFn} defaultValue={4} />
      </>,
    );
    const input1 = wrapper1.find('input');
    input1.simulate('blur');
    expect(changeFn.mock.calls[1][0]).toBe('4');
  });
  it('should setArrowStatus success', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <>
        <InputNumber defaultValue={12} max={10} min={9} onChange={fn} />
      </>,
    );
    const input = wrapper.find('input');
    input.simulate('keydown', { keyCode: 38 });
    expect(wrapper.find('input').props().value).toBe('10');
    input.simulate('keydown', { keyCode: 40 });
    input.simulate('keydown', { keyCode: 40 });
    expect(wrapper.find('input').props().value).toBe('9');
  });
  it('should value undefined', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <>
        <InputNumber value={undefined} onChange={fn} />
      </>,
    );
    const input = wrapper.find('input');
    input.simulate('blur');
    expect(fn.mock.calls[0][0]).toBe('');
  });
});
