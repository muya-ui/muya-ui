import { HTMLAttributes, ReactNode } from 'react';

import { IImgProps } from '../Img';
import { ICustomStyleBaseProps } from '../types';

/**
 * @styles content 内容
 * @styles icon icon
 * @styles title 标题
 * @styles subTitle 子标题
 * @styles reason 原因
 * @styles extra 额外的
 */
export type IResultStyleKeys = 'content' | 'icon' | 'title' | 'subTitle' | 'reason' | 'extra';

export type IResultIconType = 'success' | 'error' | 'warning' | 'info';

export type IResultStatusIcon = 'forbidden' | 'empty' | 'emptySmall';

export interface IResultPureProps extends ICustomStyleBaseProps<IResultStyleKeys> {
  /**
   * 标题
   */
  title?: string;
  /**
   * 副标题
   */
  subTitle?: string;
  /**
   * 错误原因
   */
  reason?: ReactNode;
  /**
   * 类型
   * success-成功 error-失败 warning-警告 info-提示
   * 403-无权限 empty-空数据 emptySmall-空数据小Icon
   * @default 'info'
   */
  type?: 'success' | 'error' | 'warning' | 'info' | 'forbidden' | 'empty' | 'emptySmall';
  /**
   * 布局是否垂直
   * @default true
   */
  vertical?: boolean;
  /**
   * 自定义 icon
   */
  icon?: ReactNode;
  /**
   * icon 大小
   */
  iconSize?: number;
  /**
   * 操作区
   */
  extra?: ReactNode;
  /**
   * icon 传入字符串时可以自定义图片属性
   */
  imgProps?: IImgProps;
}

export type IResultProps = IResultPureProps & HTMLAttributes<HTMLDivElement>;
