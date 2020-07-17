import { mount } from 'enzyme';
import React, { useRef, useState } from 'react';
import sinon from 'sinon';

import { wait } from '@muya-ui/utils';
import { muyaThemeLight } from '@muya-ui/theme-light';

import Dialog from './Base';
import StyledContainer from './StyledContainer';
import StyledRoot from './StyledRoot';

test('should add padding to container when overflowing', () => {
  document.body.style.paddingRight = '2px';
  sinon.stub(document.body, 'clientHeight').get(() => 10);
  (window as any).innerHeight = 4;
  const wrapper = mount(
    <div>
      <div style={{ width: '1000px', height: '1000px' }}>很高的div</div>
      <Dialog open>Test</Dialog>
    </div>,
  );

  expect(document.body.style.overflow).toBe('hidden');
  wrapper.unmount();
  expect(document.body.style.overflow === 'hidden').toBe(false);
});

test('should be fullWidth', () => {
  const wrapper = mount(
    <Dialog open fullWidth>
      Test
    </Dialog>,
  );
  expect(wrapper.find(StyledContainer)).toHaveStyleRule(
    'width',
    `${muyaThemeLight.components.Dialog.fullWidth.widthPrecent}%`,
  );
});

test('should be fullScreen', () => {
  const wrapper = mount(
    <Dialog open fullScreen>
      Test
    </Dialog>,
  );
  expect(wrapper.find(StyledContainer)).toHaveStyleRule('width', '100%');
});

test('should be hideMask', () => {
  const wrapper = mount(
    <Dialog open hideMask>
      Test
    </Dialog>,
  );
  expect(wrapper.find(StyledRoot)).toHaveStyleRule('pointer-events', 'none');
});

test('should transition', async () => {
  const onEntered = sinon.spy();
  const onExited = sinon.spy();
  function Comp() {
    const [show, setShow] = useState(false);
    const dialogRef = useRef(null);
    return (
      <div>
        <Dialog open={show} onEntered={onEntered} onExited={onExited} id="test" ref={dialogRef}>
          Test
        </Dialog>
        <button id="open" onClick={() => setShow(true)}>
          open
        </button>
        <button id="hide" onClick={() => setShow(false)}>
          hide
        </button>
      </div>
    );
  }

  const wrapper = mount(<Comp />);
  wrapper.find('#open').simulate('click');
  await wait.time(500);
  expect(getComputedStyle(wrapper.find(StyledRoot).getDOMNode()).opacity).toBe('1');
  expect(onEntered.calledOnce).toBe(true);

  wrapper.find('#hide').simulate('click');
  await wait.time(500);
  expect(getComputedStyle(wrapper.find(StyledRoot).getDOMNode()).opacity).toBe('0');
  expect(onExited.calledOnce).toBe(true);
});

test('should emit onClose when ESC keydown', async () => {
  const onClose = sinon.spy();
  const wrapper = mount(
    <Dialog open onClose={onClose}>
      Test
    </Dialog>,
  );

  const rootWrapper = wrapper.find(StyledRoot);
  rootWrapper.simulate('keydown', { key: 'Escape' });
  expect(onClose.calledOnce).toBe(true);
});

test('should emit onClose when click mask', async () => {
  const onClose = sinon.spy();
  const wrapper = mount(
    <Dialog open onClose={onClose}>
      Test
    </Dialog>,
  );

  const rootWrapper = wrapper.find(StyledRoot);
  rootWrapper.simulate('click');
  expect(onClose.calledOnce).toBe(true);
});

test('should not emit onClose when disableEscapeKeyDown', async () => {
  const onClose = sinon.spy();
  const onEscapeKeyDown = sinon.spy();
  const wrapper = mount(
    <Dialog open onClose={onClose} disableEscapeKeyDown onEscapeKeyDown={onEscapeKeyDown}>
      Test
    </Dialog>,
  );

  const rootWrapper = wrapper.find(StyledRoot);

  rootWrapper.simulate('keydown', { key: 'Other' });
  expect(onEscapeKeyDown.calledOnce).toBe(false);

  rootWrapper.simulate('keydown', { key: 'Escape' });
  expect(onClose.notCalled).toBe(true);
  expect(onEscapeKeyDown.calledOnce).toBe(true);
});

test('should not emit onClose when disableMaskClick', async () => {
  const onClose = sinon.spy();
  const onMaskClick = sinon.spy();
  const wrapper = mount(
    <Dialog open onClose={onClose} disableMaskClick onMaskClick={onMaskClick}>
      Test
    </Dialog>,
  );

  const rootWrapper = wrapper.find(StyledRoot);

  rootWrapper.find(StyledContainer).simulate('click');
  expect(onMaskClick.notCalled).toBe(true);

  rootWrapper.simulate('click');
  expect(onClose.notCalled).toBe(true);
  expect(onMaskClick.calledOnce).toBe(true);
});

test('should disableSize', async () => {
  const wrapper = mount(
    <Dialog open disableSize>
      Test
    </Dialog>,
  );

  expect(wrapper.find(StyledContainer)).toHaveStyleRule('width', undefined);
});

test('should overflow custom container', async () => {
  const container = document.createElement('div');
  const containerWithBorder = document.createElement('div');
  container.style.border = '1px solid #000';
  document.body.append(container);
  mount(
    <Dialog open container={container}>
      Test
    </Dialog>,
  );

  mount(
    <Dialog open container={containerWithBorder}>
      Test
    </Dialog>,
  );
});

test('should destroy children when set destroyOnClose', async () => {
  const wrapper = mount(<Dialog destroyOnClose>Test</Dialog>);

  expect(wrapper.find(StyledContainer)).toHaveLength(0);
});

test('should use outer zIndex', async () => {
  const wrapper = mount(<Dialog zIndex={102}>Test</Dialog>);
  const wrapper1 = mount(<Dialog zIndex={201}>Test</Dialog>);

  expect(wrapper.find(StyledRoot)).toHaveStyleRule('z-index', '102');
  expect(wrapper1.find(StyledRoot)).toHaveStyleRule('z-index', '201');
});

test('should not render children with lazyMount', async () => {
  const wrapper = mount(
    <Dialog open={false} lazyMount>
      <div id="lazyMount" />
    </Dialog>,
  );
  const wrapperOpen = mount(
    <Dialog open lazyMount>
      <div id="lazyMount" />
    </Dialog>,
  );

  expect(wrapper.find('#lazyMount')).toHaveLength(0);
  expect(wrapperOpen.find('#lazyMount')).toHaveLength(1);
});

test('should accept width and height', async () => {
  const wrapper = mount(
    <Dialog height="800px" width={1000}>
      Test
    </Dialog>,
  );

  expect(wrapper.find(StyledContainer)).toHaveStyleRule('width', '1000px');
  expect(wrapper.find(StyledContainer)).toHaveStyleRule('height', '800px');
});
