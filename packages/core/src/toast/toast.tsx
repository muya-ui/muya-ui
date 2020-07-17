import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionStatus } from 'react-transition-group/Transition';
import { ThemeProvider } from 'styled-components';

import { muyaThemeLight } from '@muya-ui/theme-light';

import {
  ExpireQueue,
  IExpireQueueItem,
  INotificationSetting,
  NotificationList,
} from '../Notification';
import ToastItem from './ToastItem';
import { IToast, IToastBaseItem, IToastItem, IToastType } from './types';

interface ToastPrivate {
  _init?: boolean;
  _opt?: Partial<INotificationSetting>;
  _container?: HTMLDivElement;
  _expQueue: ExpireQueue<IToastItem>;
  _unshiftWithType(type: IToastType, msg: string | IToastBaseItem): number;
  /**
   * 带锁的初始化，保证只执行一次
   */
  _autoInit(): void;
}
const toast: IToast & ToastPrivate = {
  _expQueue: new ExpireQueue<IToastItem>(),
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
    const poolSettings = opt.setting || theme.components.Notification.toast.queueSetting;
    const expireQueue = new ExpireQueue<IToastItem>();
    this._expQueue = expireQueue;
    if (poolSettings) {
      expireQueue.reset(poolSettings);
    }
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <NotificationList
          position="top-center"
          className={`${theme.prefix}-toast-list`}
          expireQueue={expireQueue}
          container={containerElement}
        >
          {(state: TransitionStatus, item: IExpireQueueItem) => {
            // console.log(state, Date.now() - time);
            // console.log('render', item.id, state, performance.now() - (window as any).__t);
            return (
              <ToastItem
                item={item as IToastItem}
                state={state}
                timeout={expireQueue.setting.timeout}
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
  _unshiftWithType(type, msg) {
    let item: IToastItem;
    if (typeof msg === 'string') {
      item = {
        content: msg,
        type,
      };
    } else {
      item = msg as IToastItem;
      item.type = type;
    }
    return this.add(item);
  },
  success(msg) {
    return this._unshiftWithType('success', msg);
  },
  error(msg) {
    return this._unshiftWithType('error', msg);
  },
  info(msg) {
    return this._unshiftWithType('info', msg);
  },
  warning(msg) {
    return this._unshiftWithType('warning', msg);
  },
  loading(msg) {
    return this._unshiftWithType('loading', msg);
  },
  close(id) {
    this._expQueue.remove(id);
  },
  add(item) {
    return this._expQueue.unshift(item);
  },
};

// 保证第一次进入的时候动画效果
toast.config({});

export default toast;
