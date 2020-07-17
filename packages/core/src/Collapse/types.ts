import React from 'react';

import { IAnimationBaseProps } from '../Animation';
import { Omit, ICustomStyleBaseProps } from '../types';

export type ICollapseExpandIconPosition = 'left' | 'right';

/**
 * @styles wrapper 头部容器节点
 * @styles content 内容节点
 * @styles expandWrapper 展开箭头容器节点
 * @styles prefixNodeWrapper 左侧容器节点
 * @styles suffixNodeWrapper 右侧容器节点
 */
export type ICollapsePanelStyleKeys =
  | 'header'
  | 'content'
  | 'expandWrapper'
  | 'prefixNodeWrapper'
  | 'suffixNodeWrapper';

export interface ICollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 当前激活的key，受控使用
   *
   * @type {(React.Key[])}
   * @memberof ICollapseProps
   */
  activeKeys?: React.Key[];
  /**
   * 默认激活的key
   *
   * @type {(React.Key[])}
   * @memberof ICollapseProps
   * @default []
   */
  defaultActiveKeys?: React.Key[];
  /**
   * 手风琴模式，同时只展开一个面板
   *
   * @type {boolean}
   * @memberof ICollapseProps
   * @default false
   */
  accordion?: boolean;
  /**
   * 激活key发生变化时的回调
   *
   * @memberof ICollapseProps
   */
  onChange?: (keys: React.Key[]) => void;
  /**
   * 设置内部所有panel的自定义图标渲染
   *
   * @memberof ICollapseProps
   */
  expandIcon?: React.ReactElement;
  /**
   * 设置内部所有panel图标位置
   *
   * @type {(ICollapseExpandIconPosition)}
   * @memberof ICollapseProps
   * @default 'left'
   */
  expandIconPosition?: ICollapseExpandIconPosition;
  /**
   * 子元素
   *
   * @type {React.ReactElement<ICollapsePanelProps>}
   * @memberof ICollapseProps
   */
  children: React.ReactNode;
}

export interface ICollapsePanelProps
  extends IAnimationBaseProps,
    ICustomStyleBaseProps<ICollapsePanelStyleKeys>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 设置内部所有panel的自定义图标渲染
   *
   * @memberof ICollapseProps
   */
  expandIcon?: React.ReactElement;
  /**
   * 设置内部所有panel图标位置
   *
   * @type {(ICollapseExpandIconPosition)}
   * @memberof ICollapseProps
   */
  expandIconPosition?: ICollapseExpandIconPosition;
  /**
   * 标题内容
   *
   * @type {React.ReactNode}
   * @memberof ICollapsePanelProps
   */
  header?: React.ReactNode;
  /**
   * 当前panel是否激活
   *
   * @type {boolean}
   * @memberof ICollapsePanelProps
   */
  isActive?: boolean;
  /**
   * 是否显示展开箭头的图标
   *
   * @type {boolean}
   * @memberof ICollapsePanelProps
   */
  showArrow?: boolean;
  /**
   * 自定义渲染每个面板右上角的内容
   *
   * @type {React.ReactNode}
   * @memberof ICollapsePanelProps
   */
  extra?: React.ReactNode;
  /**
   * header区域点击事件
   *
   * @memberof ICollapsePanelProps
   */
  onHeaderClick?: (e: React.MouseEvent) => void;
  /**
   * 禁用当前面板
   *
   * @type {boolean}
   * @memberof ICollapsePanelProps
   */
  disabled?: boolean;
}
