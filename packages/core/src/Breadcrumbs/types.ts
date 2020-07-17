import React from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps } from '../types';
import { IInlineButtonProps } from '../Button/types';

/**
 *  Breadcrumbs style keys
 * @styles item 每个子项
 * @styles headSeparator 第一个的分割符
 * @styles separator 默认的分隔符
 */
export type IBreadcrumbsStyleKeys = 'item' | 'headSeparator' | 'separator';

export interface IBreadcrumbItem {
  /**
   * 文字内容
   * @default -
   * */
  label: React.ReactNode;
  /**
   * 文字链接
   * @default -
   * */
  url?: string;
  /**
   * 点击事件
   * @default -
   * */
  onClick?: IInlineButtonProps['onClick'];
  /**
   * 鼠标进入事件
   * @default -
   * */
  onMouseEnter?: IInlineButtonProps['onMouseEnter'];
  /**
   * 鼠标离开事件
   * @default -
   * */
  onMouseLeave?: IInlineButtonProps['onMouseLeave'];
}

type IPickFromInlineButtonForBreadcrumbs = Pick<IInlineButtonProps, 'fontWeight'>;
export interface IBreadcrumbsPureProps
  extends ISizeSpecBaseProps,
    IPickFromInlineButtonForBreadcrumbs,
    ICustomStyleBaseProps<IBreadcrumbsStyleKeys> {
  /**
   * 分割符
   * @default ['>']
   **/
  separators?: React.ReactNode[];
  /**
   * 第一个元素单独设置
   * @default -
   * */
  headItem?: IBreadcrumbItem;
  /**
   * 可以传数组
   * @default -
   * */
  items?: IBreadcrumbItem[];
}

export type IBreadcrumbsProps = IBreadcrumbsPureProps & React.HTMLAttributes<HTMLDivElement>;
