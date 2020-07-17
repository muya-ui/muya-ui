import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import ExpireQueue from './ExpireQueue';
import NotificationItem from './NotificationItem';
import { INotificationItem } from './types';

test('测试普通渲染', () => {
  const expireQueue = new ExpireQueue<INotificationItem>();
  const tree = renderer
    .create(
      <>
        <NotificationItem
          timeout={100}
          state="entering"
          item={{ type: 'success', title: 'success', content: 'ssss' }}
          expireQueue={expireQueue}
        />
        <NotificationItem
          timeout={100}
          state="entering"
          item={{ type: 'loading', title: 'success', content: 'ssss' }}
          expireQueue={expireQueue}
        />
        <NotificationItem
          timeout={100}
          state="entering"
          item={{
            title: 'none',
            content: Array(100)
              .fill(11111)
              .join(''),
          }}
          expireQueue={expireQueue}
        />
        <NotificationItem
          timeout={100}
          state="entered"
          item={{
            title: <div>icon</div>,
            icon: <div>icon</div>,
            content: <div>icon</div>,
          }}
          expireQueue={expireQueue}
        />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('mount', () => {
  const expireQueue = new ExpireQueue<INotificationItem>();
  const fixedItem = sinon.spy(expireQueue, 'fixedItem');
  const unFixedItem = sinon.spy(expireQueue, 'unFixedItem');
  const tick = sinon.spy(expireQueue, 'tick');

  const wrapper = mount(
    <NotificationItem
      timeout={100}
      state="entered"
      hoverStop
      item={{
        id: 11,
        title: <div>icon</div>,
        icon: <div>icon</div>,
        content: <div>icon</div>,
      }}
      expireQueue={expireQueue}
    />,
  );

  wrapper.simulate('mouseenter');
  wrapper.simulate('mouseleave');
  expect(() => {
    sinon.assert.calledWith(fixedItem, 11);
    sinon.assert.calledWith(unFixedItem, 11);
    sinon.assert.calledOnce(tick);
  }).not.toThrow();
});
