import { EventEmitter } from 'events';
import React, { ReactNode } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

import { IPortalProps } from '../Portal';
import { ICustomStyleBaseProps, IThemedBaseProps } from '../types';

export interface IExpireQueueItem {
  /**
   * 停驻时间
   */
  interval?: number;
  /**
   * 过期时间
   */
  expiration?: number;
  /**
   * 是否固定
   */
  fixed?: boolean;
  /**
   * 唯一ID
   */
  id?: number;
}

export interface IExpireQueueSetting {
  /**
   * 停驻时间
   */
  interval: number;
  /**
   * 动画的时长
   */
  timeout: number;
  /**
   * 最大的条数
   */
  max: number;
}

export interface IExpireQueue<T extends IExpireQueueItem> extends EventEmitter {
  readonly setting: IExpireQueueSetting;
  readonly length: number;
  readonly items: T[];
  /**
   * 锁定某一项
   * @param id id
   */
  fixedItem(id: number): void;
  /**
   * 解锁某一项
   * @param id id
   */
  unFixedItem(id: number): void;
  /**
   * 刷新过期队列，把无效的刷新掉
   */
  refresh(): void;
  /**
   * 停止心跳检测
   */
  stop(): void;
  /**
   * 开始心跳
   */
  tick(): void;
  /**
   * 重置过期队列
   * @param setting 配置
   */
  reset(setting: Partial<IExpireQueueSetting>): void;
  /**
   * 从队列中移出某一个item
   * @param id item.id
   */
  remove(id: number): void;
  /**
   * 从队列末尾移出一项
   */
  pop(): T | undefined;
  /**
   * 从队列头移出一项
   */
  shift(): T | undefined;
  /**
   * 在队列前添加一项
   */
  unshift(item: T): number;
  /**
   * 在队列尾前添加一项
   */
  push(item: T): number;
}

export type INotificationItemType = 'success' | 'error' | 'warning' | 'info' | 'loading';

/**
 * @styles self 根节点
 * @styles container 容器节点
 * @styles icon 图标
 * @styles title 标题
 * @styles content 内容
 * @styles contentWrapper 内容的容器
 * @styles close 关闭按钮
 */
export type INotificationItemStyleKeys =
  | 'self'
  | 'container'
  | 'icon'
  | 'title'
  | 'content'
  | 'contentWrapper'
  | 'close';
export interface INotificationItem
  extends IExpireQueueItem,
    ICustomStyleBaseProps<INotificationItemStyleKeys> {
  /**
   * 类型可以是 'success' | 'error' | 'warning' | 'info' | 'loading';
   */
  type?: INotificationItemType;
  /**
   * 可以传自定义的 Icon
   */
  icon?: ReactNode;
  /**
   * 可以传自定义的 Content，注意不能超过原有 toast 3行的高度
   */
  content: string | ReactNode;
  /**
   * 可以传自定义的 Title，注意不能超过原有 toast 3行的高度
   */
  title: string | ReactNode;
  /**
   * 预测样式的最大高度，可以是不准确的，在动画里使用
   */
  maxHeight?: number;
  /**
   * 消息 unmount 的时候调用
   */
  onClose?: () => void;
}

export interface INotificationItemPureProps {
  item: INotificationItem;
  state: TransitionStatus;
  timeout: number;
  expireQueue: IExpireQueue<INotificationItem>;
  /**
   * 设置当hover上去停止过期
   */
  hoverStop?: boolean;
  enterFrom?: 'left' | 'right';
  onClose?: () => void;
}
export type INotificationItemProps = INotificationItemPureProps &
  React.HTMLAttributes<HTMLDivElement>;

export interface INotificationListPureProps extends Pick<IPortalProps, 'container'> {
  /**
   * 消息队列在屏幕上的位置
   */
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * 过期队列
   */
  expireQueue: IExpireQueue<IExpireQueueItem>;
  /**
   * 设置满屏消失
   */
  fullScreen?: boolean;
  /**
   * 设置当hover上去整个列表停止过期
   */
  hoverStop?: boolean;
  children: (state: TransitionStatus, item: IExpireQueueItem) => ReactNode;
}
export type INotificationListProps = INotificationListPureProps &
  React.HTMLAttributes<HTMLDivElement>;

export interface INotificationSetting extends IThemedBaseProps {
  /** 过期队列的设置 */
  setting: Partial<IExpireQueueSetting>;
  /** notification 可以出现的位置设置  */
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

type INotificationFunction = (item: INotificationItem) => number;
export interface INotification {
  /**
   * 成功的提示
   * @param msg 可以传字符串，也可以传 T
   */
  success: INotificationFunction;
  /**
   * 出错的提示
   * @param msg 可以传字符串，也可以传 T
   */
  error: INotificationFunction;
  /**
   * 一般的提示
   * @param msg 可以传字符串，也可以传 T
   */
  info: INotificationFunction;
  /**
   * 警告的提示
   * @param msg 可以传字符串，也可以传 T
   */
  warning: INotificationFunction;
  /**
   * 加载中的提示
   * @param msg 可以传字符串，也可以传 T
   */
  loading: INotificationFunction;
  /**
   * 'success' | 'error' | 'warning' | 'info' | 'loading' 都是这个方法的别名
   * 加到队列的头部
   * @param item
   */
  add(item: INotificationItem): number;
  /**
   * 移出队列
   * @param id toast id
   */
  close(id: number): void;
  /**
   * 重置，注意主题
   * @param opt
   */
  config(opt?: Partial<INotificationSetting>): void;
  /**
   * 销毁
   */
  destroy(): void;
}
