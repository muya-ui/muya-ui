import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { ClearIcon, muyaThemeLight, SuccessIcon } from '@muya-ui/theme-light';

import Spin from '../Spin';
import ClearIconWrapper from '../styled/components/ClearIconWrapper';
import Input from './Input';
import { makeStatusWrapperStyle, StyledInputWrapper, StyledTextarea } from './styled';
import TextLimit, { LimitDanerWrapper } from './TextLimit';

test('should render correctly', () => {
  const tree = renderer.create(<Input />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('textarea should render correctly', () => {
  const tree = renderer.create(<Input multiline limit={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should show text limit', () => {
  const wrapper = mount(<Input value="111" limit={2} />);
  const overflowLimitWrapper = mount(<TextLimit limit={10} value="111" />);
  const limitWrapper = mount(<TextLimit />);
  expect(wrapper.find(StyledInputWrapper)).toHaveStyleRule(
    'border-color',
    muyaThemeLight.colors.pattern.feature.error,
  );
  expect(overflowLimitWrapper.find(LimitDanerWrapper)).toHaveLength(0);
  expect(limitWrapper.isEmptyRender()).toBe(true);
});

test('test wrapper style', () => {
  const wrapper = mount(
    <StyledInputWrapper $width="300px" $height="300px" theme={muyaThemeLight} />,
  );
  const focusWrapper = mount(<StyledInputWrapper focus theme={muyaThemeLight} />);
  const errorWrapper = mount(<StyledInputWrapper hasError theme={muyaThemeLight} />);
  const disabledWrapper = mount(<StyledInputWrapper disabled theme={muyaThemeLight} />);
  expect(wrapper).toHaveStyleRule('width', '300px');
  expect(wrapper).toHaveStyleRule('height', '300px');
  expect(focusWrapper).toHaveStyleRule('border-color', muyaThemeLight.colors.spec.brand);
  expect(errorWrapper).toHaveStyleRule('border-color', muyaThemeLight.colors.pattern.feature.error);
  expect(disabledWrapper).toHaveStyleRule(
    'background',
    muyaThemeLight.colors.pattern.background.disabled,
  );
});

test('test textarea style', () => {
  const wrapper = renderer
    .create(<StyledTextarea limit={3} size="m" theme={muyaThemeLight} />)
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('test input status', () => {
  const successWrapper = mount(<Input status="success" />);
  const errorWrapper = mount(<Input status="error" />);
  const loadingWrapper = mount(<Input status="loading" />);
  const loadingWrapperWithoutIcon = mount(<Input status="loading" hasFeedback={false} />);
  expect(successWrapper.find(SuccessIcon)).toHaveLength(1);
  expect(errorWrapper.find(ClearIcon)).toHaveLength(1);
  expect(loadingWrapper.find(Spin)).toHaveLength(1);
  expect(loadingWrapperWithoutIcon.find(Spin)).toHaveLength(0);
});

test('test status wrapper style', () => {
  const style = makeStatusWrapperStyle({ theme: muyaThemeLight });
  expect(style).toBeFalsy();
});

test('test prefix node', () => {
  const wrapper = mount(<Input prefixNode={[<span id="test" key="test" />, null, 'test']} />);
  expect(wrapper.find('#test')).toHaveLength(1);
});

test('test siffix node', () => {
  const wrapper = mount(<Input suffixNode={[<span id="test" key="test" />, 'test']} />);
  expect(wrapper.find('#test')).toHaveLength(1);
});

test('test input allowClear', async () => {
  const handleChange = sinon.spy();
  const wrapper = mount(<Input defaultValue="11" autoFocus allowClear />);
  const valueWrapper = mount(<Input value="11" autoFocus onChange={handleChange} allowClear />);

  wrapper.find(StyledInputWrapper).simulate('mouseenter');
  wrapper.find(ClearIconWrapper).simulate('click');
  valueWrapper.find(StyledInputWrapper).simulate('mouseenter');
  valueWrapper.find('input').simulate('change');

  expect(
    wrapper
      .find('input')
      .getDOMNode()
      .getAttribute('value'),
  ).toBe('');
  expect(handleChange.called).toBe(true);
});

test('input should focus', () => {
  const spy = sinon.spy();
  const wrapper = mount(<Input onFocus={spy} />);
  const normalWrapper = mount(<Input />);
  const disabledWrapper = mount(<Input disabled onFocus={spy} />);
  wrapper.find('input').simulate('focus');
  disabledWrapper.find('input').simulate('focus');
  normalWrapper.find('input').simulate('focus');
  expect(spy.calledOnce).toBe(true);
});

test('input should blur', () => {
  const spy = sinon.spy();
  const wrapper = mount(<Input onBlur={spy} />);
  const normalWrapper = mount(<Input />);
  const disabledWrapper = mount(<Input disabled />);
  wrapper.find('input').simulate('blur');
  disabledWrapper.find('input').simulate('blur');
  normalWrapper.find('input').simulate('blur');
  expect(spy.calledOnce).toBe(true);
});

test('input mouse enter event', () => {
  const spy = sinon.spy();
  const wrapper = mount(<Input onMouseEnter={spy} allowClear />);
  const disabledWrapper = mount(<Input disabled allowClear />);
  const normalWrapper = mount(<Input />);
  wrapper.find(StyledInputWrapper).simulate('mouseEnter');
  disabledWrapper.find(StyledInputWrapper).simulate('mouseEnter');
  normalWrapper.find(StyledInputWrapper).simulate('mouseEnter');
  expect(spy.calledOnce).toBe(true);
});

test('input mouse leave event', () => {
  const spy = sinon.spy();
  const normalWrapper = mount(<Input />);
  const wrapper = mount(<Input onMouseLeave={spy} allowClear />);
  const disabledWrapper = mount(<Input disabled allowClear />);
  wrapper.find(StyledInputWrapper).simulate('mouseLeave');
  disabledWrapper.find(StyledInputWrapper).simulate('mouseLeave');
  normalWrapper.find(StyledInputWrapper).simulate('mouseLeave');
  expect(spy.calledOnce).toBe(true);
});

test('input mouse click event', () => {
  const spy = sinon.spy();
  const normalWrapper = mount(<Input onClick={spy} allowClear />);
  const wrapper = mount(<Input allowClear />);
  wrapper.simulate('click');
  normalWrapper.find('input').simulate('click');
  expect(spy.calledOnce).toBe(true);
});

test('input onPressEnter event', () => {
  const spy = sinon.spy();
  const keyDownSpy = sinon.spy();
  const wrapper = mount(<Input onPressEnter={spy} onKeyDown={keyDownSpy} />);
  const event: any = { keyCode: 13 };
  wrapper.find('input').simulate('keyDown', event);
  expect(spy.calledOnce).toBe(true);
  expect(keyDownSpy.calledOnce).toBe(true);
});
