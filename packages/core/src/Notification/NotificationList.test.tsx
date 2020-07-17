import { mount } from 'enzyme';
import React from 'react';

import ExpireQueue from './ExpireQueue';
import NotificationList from './NotificationList';
import { INotificationItem } from './types';

test('测试普通渲染', () => {
  const expireQueue = new ExpireQueue<INotificationItem>();
  mount(
    <>
      <NotificationList position="top-center" expireQueue={expireQueue}>
        {(state, item) => <div>test</div>}
      </NotificationList>
      <NotificationList position="top-left" expireQueue={expireQueue}>
        {(state, item) => <div>test</div>}
      </NotificationList>
      <NotificationList position="top-right" expireQueue={expireQueue}>
        {(state, item) => <div>test</div>}
      </NotificationList>
      <NotificationList position="bottom-left" expireQueue={expireQueue}>
        {(state, item) => <div>test</div>}
      </NotificationList>
      <NotificationList position="bottom-right" expireQueue={expireQueue}>
        {(state, item) => <div>test</div>}
      </NotificationList>
    </>,
  );
});
