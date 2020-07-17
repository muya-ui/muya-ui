import React from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

import { INotificationItem, INotificationItemType, INotificationSetting } from '../Notification';
import { ICustomStyleBaseProps, Omit } from '../types';

export type IToastType = INotificationItemType;

/**
 * @styles self 根节点
 * @styles container 容器节点
 * @styles icon 图标节点
 * @styles content 内容节点
 */
export type IToastItemStyleKeys = 'self' | 'container' | 'icon' | 'content';

export interface IToastBaseItem
  extends Omit<INotificationItem, 'title' | 'type' | 'styles'>,
    ICustomStyleBaseProps<IToastItemStyleKeys> {
  // @TODO 下个大版本设置默认值为 true
  /** 是否使用默认的 content 节点包裹 content  */
  enableContentWrapper?: boolean;
}
export interface IToastItem extends IToastBaseItem {
  /** toast 类型 */
  type: INotificationItemType;
}

export interface IToastItemPureProps {
  item: IToastItem;
  state: TransitionStatus;
  timeout: number;
}
export type IToastItemProps = IToastItemPureProps & React.HTMLAttributes<HTMLDivElement>;

export interface IToast {
  /**
   * 成功的提示
   * @param msg 可以传字符串，也可以传 T
   */
  success(msg: string | IToastBaseItem): number;
  /**
   * 出错的提示
   * @param msg 可以传字符串，也可以传 T
   */
  error(msg: string | IToastBaseItem): number;
  /**
   * 一般的提示
   * @param msg 可以传字符串，也可以传 T
   */
  info(msg: string | IToastBaseItem): number;
  /**
   * 警告的提示
   * @param msg 可以传字符串，也可以传 T
   */
  warning(msg: string | IToastBaseItem): number;
  /**
   * 加载中的提示
   * @param msg 可以传字符串，也可以传 T
   */
  loading(msg: string | IToastBaseItem): number;
  /**
   * 'success' | 'error' | 'warning' | 'info' | 'loading' 都是这个方法的别名
   * 加到队列的头部
   * @param item
   */
  add(item: IToastItem): number;
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
