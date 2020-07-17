import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import { wait } from '@muya-ui/utils';
import { AddIcon } from '@muya-ui/theme-light';

import Button from '../Button';
import Popper from '../Popper';
import { StyledArrow } from '../styled/components/Arrow';
import Tooltip from '../Tooltip';
import Trigger from './Trigger';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});
test('should render correctly', () => {
  const wrapper = renderer
    .create(
      <Trigger id="111" placement="bottom" popup={<span>111</span>}>
        <span>hh</span>
      </Trigger>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('test uncontroled mod', async () => {
  const wrapper = mount(
    <Trigger
      id="111"
      popperProps={{ id: 'uncontroled' }}
      triggerActions={['click']}
      popup={<p>111</p>}
    >
      <button>hh</button>
    </Trigger>,
  );
  wrapper.find('button').simulate('click');
});

test('test click trigger', () => {
  const spy = sinon.spy();
  const clickSpy = sinon.spy();
  const wrapper = mount(
    <Trigger id="111" onVisibleChange={spy} triggerActions={['click']} popup={<p>111</p>}>
      <button onClick={clickSpy}>hh</button>
    </Trigger>,
  );
  renderer.act(() => {
    wrapper.find('button').simulate('click');
  });
  expect(spy.calledWith(true)).toBe(true);

  renderer.act(() => {
    wrapper.find('button').simulate('click');
  });
  expect(spy.calledWith(false)).toBe(true);
});

test('test hover trigger', async () => {
  const spy = sinon.spy();
  const enterSpy = sinon.spy();
  const leaveSpy = sinon.spy();
  const wrapper = mount(
    <Trigger id="111" onVisibleChange={spy} triggerActions={['hover']} popup={<p>111</p>}>
      <button onMouseEnter={enterSpy} onMouseLeave={leaveSpy}>
        hh
      </button>
    </Trigger>,
  );
  renderer.act(() => {
    wrapper.find('button').simulate('mouseenter', { type: 'mouseenter' });
  });
  await wait.time(100);
  expect(spy.calledWith(true)).toBe(true);
  expect(enterSpy.calledOnce).toBe(true);

  renderer.act(() => {
    wrapper.find('button').simulate('mouseleave', { type: 'mouseleave' });
  });
  await wait.time(100);
  expect(spy.calledWith(false)).toBe(true);
  expect(leaveSpy.calledOnce).toBe(true);
});

test('test focus trigger', async () => {
  const spy = sinon.spy();
  const spy1 = sinon.spy();
  const blur = sinon.spy();
  const focus = sinon.spy();
  const wrapper = mount(
    <Trigger onVisibleChange={spy} triggerActions={['focus']} popup={<p>111</p>}>
      <button onFocus={focus} onBlur={blur}>
        <input autoFocus></input>
      </button>
    </Trigger>,
  );

  const wrapperWithoutEvent = mount(
    <Trigger onVisibleChange={spy1} triggerActions={['focus']} popup={<p>111</p>}>
      <button>
        <input autoFocus></input>
      </button>
    </Trigger>,
  );
  renderer.act(() => {
    wrapper.find('input').simulate('focus', { type: 'focus' });
  });
  await wait.time(100);
  expect(spy.calledWith(true)).toBe(true);
  expect(focus.calledOnce).toBe(true);

  renderer.act(() => {
    wrapper.find('input').simulate('blur', { type: 'blur' });
  });
  await wait.time(100);
  expect(spy.calledWith(false)).toBe(true);
  expect(blur.calledOnce).toBe(true);

  renderer.act(() => {
    wrapperWithoutEvent.find('input').simulate('focus', { type: 'focus' });
  });
  await wait.time(100);
  expect(spy1.calledWith(true)).toBe(true);

  renderer.act(() => {
    wrapperWithoutEvent.find('input').simulate('blur', { type: 'blur' });
  });
  await wait.time(100);
  expect(spy1.calledWith(false)).toBe(true);
});

test('test clickAway', async () => {
  const spy = sinon.spy();
  const away = sinon.spy();
  const wrapper = mount(
    <Trigger
      id="111"
      open={false}
      onVisibleChange={spy}
      triggerActions={['click']}
      popup={<p>111</p>}
      onClickAway={away}
    >
      <button>11</button>
    </Trigger>,
  );
  wrapper.find('button').simulate('click', { type: 'click' });
  expect(spy.calledWith(true)).toBe(true);

  document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(away.calledOnce).toBe(true);

  wrapper.unmount();
});

test('test esc key close', () => {
  const spy = sinon.spy();
  const escSpy = sinon.spy();
  const wrapper = mount(
    <Trigger
      id="111"
      defaultOpen={false}
      onVisibleChange={spy}
      triggerActions={['click']}
      popup={<p>111</p>}
      onEscapeKeyDown={escSpy}
      escapeKeyCloseable
    >
      <button>11</button>
    </Trigger>,
  );

  wrapper.find('button').simulate('click', { type: 'click' });
  expect(spy.calledWith(true)).toBe(true);

  wrapper.find('button').simulate('keydown', { key: 'notEscape' });
  wrapper.find('button').simulate('keydown', { key: 'Escape' });
  expect(escSpy.calledOnce).toBe(true);
  expect(spy.calledWith(false)).toBe(true);

  wrapper.unmount();
});

test('test disable esc key close', () => {
  const spy = sinon.spy();
  const escSpy = sinon.spy();
  const wrapper = mount(
    <Trigger
      id="111"
      open={false}
      onVisibleChange={spy}
      triggerActions={['click']}
      popup={<p>111</p>}
      onEscapeKeyDown={escSpy}
      escapeKeyCloseable={false}
    >
      <button>11</button>
    </Trigger>,
  );

  wrapper.find('button').simulate('click', { type: 'click' });
  expect(spy.calledWith(true)).toBe(true);

  wrapper.find('button').simulate('keydown', { key: 'notEscape' });
  wrapper.find('button').simulate('keydown', { key: 'Escape' });
  expect(escSpy.calledOnce).toBe(true);
  expect(spy.calledOnce).toBe(true);

  wrapper.unmount();
});

test('should have 12 placement', () => {
  const wrapper = renderer
    .create(
      <div>
        <StyledArrow placement="top">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="top-start">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="top-end">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="bottom">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="bottom-start">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="bottom-end">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="left-start">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="left-end">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="left">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="right">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="right-end">
          <span>hh</span>
        </StyledArrow>
        <StyledArrow placement="right-start">
          <span>hh</span>
        </StyledArrow>
        ;
      </div>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('should hide arrow', () => {
  const wrapper = mount(
    <Trigger id="111" open triggerActions={['click']} popup={<p>111</p>} hideArrow>
      <button>11</button>
    </Trigger>,
  );
  expect(wrapper.find(StyledArrow)).toHaveLength(0);
});

it('should hide when mouse leave native disabled button', () => {
  const onVisibleChange = sinon.spy();
  const wrapper = mount(
    <Tooltip title="xxxxx" triggerActions={['hover']} onVisibleChange={onVisibleChange}>
      <button disabled>Hello world!</button>
    </Tooltip>,
  );

  const button = wrapper.find('button').at(0);
  button.simulate('mouseenter');
  button.simulate('mouseleave');
  expect(onVisibleChange.notCalled).toBe(true);
});

it('should pass modifiers flip to Popper when Trigger.flip is true', () => {
  const wrapper = mount(
    <Tooltip title="xxxxx" triggerActions={['hover']} flip>
      <button disabled>Hello world!</button>
    </Tooltip>,
  );
  expect((wrapper.find(Popper).prop('modifiers') as any).flip.enabled).toBe(true);
});

it('should set Popper offset when arrowPointAtCenter', () => {
  const wrapper = mount(
    <Tooltip title="xxxxx" triggerActions={['hover']} placement="top-start" arrowPointAtCenter>
      <button disabled>Hello world!</button>
    </Tooltip>,
  );

  expect((wrapper.find(Popper).prop('modifiers') as any).flip.enabled).toBe(false);
  expect((wrapper.find(Popper).prop('modifiers') as any).offset.enabled).toBe(true);
});

it('should auto set arrowPointAtCenter when element is too small', () => {
  const wrapper = mount(
    <Tooltip title="xxxxx" triggerActions={['hover']} placement="top-start">
      <AddIcon />
    </Tooltip>,
  );

  expect((wrapper.find(Popper).prop('modifiers') as any).flip.enabled).toBe(false);
  expect((wrapper.find(Popper).prop('modifiers') as any).offset.enabled).toBe(true);
});

it('should disabled Trigger and children', () => {
  const wrapper = mount(
    <Tooltip title="xxxxx" disabled triggerActions={['hover']} placement="top-start">
      <Button>Test</Button>
    </Tooltip>,
  );

  expect(wrapper.find(Button).prop('disabled') as any).toBe(true);
  expect(wrapper.find(Button).prop('mouseEnter') as any).toBe(undefined);
});

it('should not effect disabled Button margin', () => {
  const wrapper = mount(
    <div>
      <Tooltip title="xxxxx" disabled triggerActions={['hover']} placement="top-start">
        <Button id="btn1">Test1</Button>
      </Tooltip>
      <Button id="btn2">Test2</Button>
    </div>,
  );

  // btn1 is disabled, and it's a span element
  expect(wrapper
    .find('#btn1')
    .at(0)
    .prop('disabled') as any).toBe(true);
  expect(
    window.getComputedStyle(
      wrapper
        .find('#btn2')
        .at(0)
        .getDOMNode(),
    ).marginLeft,
  ).toBe('8px');
});
