import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionStatus } from 'react-transition-group/Transition';
import { ThemeProvider } from 'styled-components';

import { muyaThemeLight } from '@muya-ui/theme-light';

import ExpireQueue from './ExpireQueue';
import NotificationItem from './NotificationItem';
import NotificationList from './NotificationList';
import {
  IExpireQueueItem,
  INotification,
  INotificationItem,
  INotificationItemType,
  INotificationSetting,
} from './types';

interface INotificationPrivate {
  _init?: boolean;
  _opt?: Partial<INotificationSetting>;
  _container?: HTMLDivElement;
  _position?: INotificationSetting['position'];
  _expQueue: ExpireQueue<INotificationItem>;
  _unshiftWithType(type: INotificationItemType, item: INotificationItem): number;
  /**
   * 带锁的初始化，保证只执行一次
   */
  _autoInit(): void;
}
const notification: INotification & INotificationPrivate = {
  _expQueue: new ExpireQueue<INotificationItem>(),
  _autoInit() {
    if (this._init) {
      return;
    }
    this._init = true;
    const opt = this._opt || {};
    const doc = window.document;
    const containerElement = doc.createElement('div');
    doc.body.appendChild(containerElement);
    this._container = containerElement;
    const theme = opt.theme || muyaThemeLight;
    const poolSettings = opt.setting || theme.components.Notification.notification.queueSetting;
    const expireQueue = new ExpireQueue<INotificationItem>();
    this._expQueue = expireQueue;
    expireQueue.reset(poolSettings);
    const position = opt.position || 'top-right';
    this._position = position;

    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <NotificationList
          fullScreen
          className={`${theme.prefix}-notification-list`}
          position={position}
          expireQueue={expireQueue}
          container={containerElement}
        >
          {(state: TransitionStatus, item: IExpireQueueItem) => {
            const enterFrom = position.includes('left') ? 'left' : 'right';
            return (
              <NotificationItem
                item={item as INotificationItem}
                enterFrom={enterFrom}
                state={state}
                expireQueue={expireQueue}
                hoverStop
                timeout={expireQueue.setting.timeout}
                onClose={() => expireQueue.remove(item.id!)}
              />
            );
          }}
        </NotificationList>
      </ThemeProvider>,
      containerElement,
    );
  },
  destroy() {
    const doc = window.document;
    if (this._container) {
      doc.body.removeChild(this._container);
    }
    this._init = false;
  },
  config(opt) {
    this.destroy();
    this._opt = opt;
    this._autoInit();
  },
  _unshiftWithType(type, item) {
    item.type = type;
    return this.add(item);
  },
  success(item) {
    return this._unshiftWithType('success', item);
  },
  error(item) {
    return this._unshiftWithType('error', item);
  },
  info(item) {
    return this._unshiftWithType('info', item);
  },
  warning(item) {
    return this._unshiftWithType('warning', item);
  },
  loading(item) {
    return this._unshiftWithType('loading', item);
  },
  close(id) {
    this._expQueue.remove(id);
  },
  add(item) {
    const opt = this._opt || {};
    const position = opt.position || 'top-right';
    if (position.includes('bottom')) {
      return this._expQueue.unshift(item);
    }
    return this._expQueue.push(item);
  },
};

// 保证第一次进入的时候动画效果
notification.config({});

export default notification;
