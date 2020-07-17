import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import muyaThemeLight from '@muya-ui/theme-light';

import Step from './Step';
import Steps from './Steps';
import { StyledCircle, StyledStepContent } from './styled';

test('Steps should give children status and stepNumber', () => {
  const wrapper = mount(
    <Steps current={1}>
      <Step id="Step1" title="111" description="111" />
      <Step id="Step2" title="222" description="222" />
      <Step id="Step3" title="333" description="333" />
    </Steps>,
  );
  expect(
    wrapper
      .find('#Step1')
      .at(0)
      .prop('stepNumber'),
  ).toBe(0);
  expect(
    wrapper
      .find('#Step2')
      .at(0)
      .prop('stepNumber'),
  ).toBe(1);
  expect(
    wrapper
      .find('#Step3')
      .at(0)
      .prop('stepNumber'),
  ).toBe(2);

  expect(
    wrapper
      .find('#Step1')
      .at(0)
      .prop('status'),
  ).toBe('finish');
  expect(
    wrapper
      .find('#Step2')
      .at(0)
      .prop('status'),
  ).toBe('process');
  expect(
    wrapper
      .find('#Step3')
      .at(0)
      .prop('status'),
  ).toBe('wait');

  wrapper
    .find('#Step1')
    .at(0)
    .find(StyledStepContent)
    .at(0)
    .simulate('click');

  expect(
    wrapper
      .find('#Step1')
      .at(0)
      .prop('status'),
  ).toBe('finish');
});

test('should not emit onChange', () => {
  const handleChange = sinon.spy();

  const wrapper = mount(
    <Steps onChange={handleChange}>
      <Step id="Step1" title="111" description="111" />
      <Step id="Step2" title="222" description="222" />
      <Step id="Step3" title="333" description="333" />
    </Steps>,
  );

  wrapper
    .find('#Step1')
    .at(0)
    .find(StyledStepContent)
    .at(0)
    .simulate('click');

  expect(handleChange.called).toBe(false);
});

test('should emit onChange', () => {
  const handleChange = sinon.spy();

  const wrapper = mount(
    <Steps onChange={handleChange}>
      <Step id="Step1" title="111" description="111" />
      <Step id="Step2" title="222" description="222" />
      <Step id="Step3" title="333" description="333" />
    </Steps>,
  );

  wrapper
    .find('#Step2')
    .at(0)
    .find(StyledStepContent)
    .at(0)
    .simulate('click');

  expect(handleChange.calledOnce).toBe(true);
});

test('Step should emit onClick', () => {
  const handleChange = sinon.spy();
  const clickSpy = sinon.spy();

  const wrapper = mount(
    <Steps onChange={handleChange}>
      <Step id="Step1" onClick={clickSpy} title="111" description="111" />
      <Step id="Step2" title="222" description="222" />
      <Step id="Step3" title="333" description="333" />
    </Steps>,
  );

  wrapper
    .find('#Step1')
    .at(0)
    .find(StyledStepContent)
    .at(0)
    .simulate('click');

  expect(clickSpy.called).toBe(true);
});

test('Step should have default stepNumber', () => {
  const wrapper = mount(<Step status="wait" title="111" />);

  expect(wrapper.find(StyledCircle).getDOMNode().textContent).toBe('1');
});

test('Step should be error status', () => {
  const wrapper = mount(<Step status="error" title="111" />);

  expect(wrapper.find(StyledStepContent)).toHaveStyleRule(
    'color',
    muyaThemeLight.colors.spec.danger,
  );
});

test('should render different size', () => {
  const wrapper = renderer
    .create(
      <>
        <Step status="error" title="111" size="s" />
        <Step status="error" title="111" size="m" />
        <Step status="error" title="111" size="xl" />
        <Step status="error" title="111" size="l" />
      </>,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
