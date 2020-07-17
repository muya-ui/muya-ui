import { EventEmitter } from 'events';

import { IExpireQueue, IExpireQueueItem, IExpireQueueSetting } from './types';

export default class ExpireQueue<T extends IExpireQueueItem> extends EventEmitter
  implements IExpireQueue<T> {
  // execTime: number = 0;

  private _items: T[] = [];
  private _timer: number = 0;
  private _setting: IExpireQueueSetting = {
    interval: 3000,
    timeout: 300,
    max: 3,
  };
  private _id: number = 0;

  refresh() {
    const now = Date.now();
    const items = this._items.filter(
      item => item.fixed || (item.expiration && item.expiration > now),
    );
    if (items.length !== this._items.length) {
      this._items = items;
      this.emit('update');
    }
  }

  stop() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  tick() {
    this.stop();
    const items = this._items;
    if (items.length < 1) {
      return;
    }
    const { time: intervalTime } = this._getMinExpTime();
    // 当所有都是 undefined 的时候，表示都是 fixed 不需要心跳处理了
    if (intervalTime === undefined) {
      return;
    }
    if (intervalTime <= 0) {
      this.refresh();
    } else {
      this._timer = setTimeout(() => {
        this.refresh();
      }, intervalTime);
    }
  }

  reset(setting: Partial<IExpireQueueSetting>) {
    const oldSetting = this._setting;
    const newSetting = {
      ...oldSetting,
      ...setting,
    };
    this._setting = newSetting;
  }

  remove(id: number) {
    const items = this._items.filter(item => item.id !== id);
    this._items = items;
    this.emit('update');
  }

  fixedItem(id: number) {
    this._setItemFixed(id, true);
  }

  unFixedItem(id: number) {
    this._setItemFixed(id, false);
  }

  pop() {
    const item = this._items.pop();
    if (item) {
      this.emit('update');
    }
    return item;
  }

  shift() {
    const item = this._items.shift();
    if (item) {
      this.emit('update');
    }
    return item;
  }

  unshift(item: T) {
    const { max } = this._setting;
    const newItem = this._formatItem(item);
    this._items.unshift(newItem);
    if (this._items.length > max) {
      this._items.pop();
    }
    // this.execTime = performance.now();
    this.emit('update');
    return newItem.id!;
  }

  push(item: T) {
    const { max } = this._setting;
    const newItem = this._formatItem(item);
    this._items.push(newItem);
    if (this._items.length > max) {
      this._items.shift();
    }
    // this.execTime = performance.now();
    this.emit('update');
    return newItem.id!;
  }

  private _formatItem(item: T) {
    const { interval: defaultInterval, timeout } = this._setting;
    if (!item.expiration) {
      const interval = item.interval || defaultInterval;
      const delay = interval! + timeout;
      item.expiration = Date.now() + delay;
    }
    item.id = this._id++;
    item.fixed = item.fixed || false;
    return item;
  }

  private _setItemFixed(id: number, fixed: boolean) {
    this._items.forEach(item => {
      if (item.id === id) {
        item.fixed = fixed;
      }
    });
  }

  private _getMinExpTime() {
    const now = Date.now();
    const items = this._items;
    let time;
    for (let i = 0, l = items.length; i < l; i++) {
      const item = items[i];
      const newTime = item.expiration! - now;
      if (!item.fixed && (!time || newTime < time)) {
        time = newTime;
      }
    }
    return { time };
  }

  get setting() {
    return this._setting;
  }

  get length() {
    return this._items.length;
  }

  get items() {
    return [...this._items];
  }
}
