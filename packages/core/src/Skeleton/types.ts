import React, { HTMLAttributes } from 'react';

import { ICustomStyleBaseProps } from '../types';

export type ISkeletonType = 'paragraph' | 'tree' | 'card' | 'block' | 'navigation';
/**
 * @styles cardContent 卡片内容
 * @styles cardTitle 卡片标题
 * @styles cardDesc 卡片描述
 * @styles paragraphTitle 段落标题
 * @styles paragraph 段落
 * @styles treeHead 树的头部容器
 * @styles treeSquare 树的方块
 * @styles treeContent 树的内容
 * @styles treeChild 树的子节点
 * @styles navigationHead 导航的头
 * @styles navigationSquare 导航的方块
 * @styles navigationNode 导航的节点
 */
export type ISkeletonStyleKeys =
  | 'cardContent'
  | 'cardTitle'
  | 'cardDesc'
  | 'paragraphTitle'
  | 'paragraph'
  | 'treeHead'
  | 'treeSquare'
  | 'treeContent'
  | 'treeChild'
  | 'navigationHead'
  | 'navigationSquare'
  | 'navigationNode';

export interface ISkeletonPureProps extends ICustomStyleBaseProps<ISkeletonStyleKeys> {
  /**
   * 展示加载动画
   *
   * @default true
   * @type {boolean}
   * @memberof IPureSkeletonProps
   */
  active?: boolean;
  /**
   * 骨架屏是否处于加载中
   *
   * @default true
   * @type {boolean}
   * @memberof IPureSkeletonProps
   */
  loading?: boolean;
  /**
   * 骨架屏的类型
   *
   * @default 'block'
   * @type {ISkeletonType}
   * @memberof IPureSkeletonProps
   */
  type?: ISkeletonType;
  /**
   * 骨架屏加载完成后，渲染的内容
   *
   * @type {React.ReactNode}
   * @memberof IPureSkeletonProps
   */
  children?: React.ReactNode;
  /**
   * 骨架屏内容行数
   *
   * @default 6
   * @type {number}
   * @memberof ISkeletonPureProps
   */
  rows?: number;
}

export type ISkeletonProps = ISkeletonPureProps & HTMLAttributes<HTMLDivElement>;
