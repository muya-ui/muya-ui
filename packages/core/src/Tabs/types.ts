import React from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';
import { IButtonStyleKeys, IInlineButtonPureProps, IButtonType } from '../Button/types';
import { ISwipeBaseProps } from '../Swipe/types';

export type ITabsType = 'line' | 'card';

/**
 * @styles container 容器
 * @styles indicator 指示器
 * @styles extraContentWrapper 额外元素的容器
 */
export type ITabsStyleKeys = 'container' | 'indicator' | 'extraContentWrapper';

type IPropsFromSwipeBaseProps = Pick<
  ISwipeBaseProps,
  'enableDiffChildren' | 'equalNum' | 'gutter' | 'duration'
>;
type IPropsFromInlineButtonPureProps = Pick<IInlineButtonPureProps, 'busy' | 'disabled' | 'size'>;

export interface ITabsPureProps
  extends ICustomStyleBaseProps<ITabsStyleKeys>,
    IPropsFromSwipeBaseProps,
    IPropsFromInlineButtonPureProps {
  /**
   * Tabs类型
   * @default 'line'
   */
  type?: ITabsType;
  /** Tabs高度，如果你需要文字水平居中 */
  height?: number;
  /** 当前所在索引位置 */
  index?: string | number;
  /**
   * 默认的 index
   * 0
   */
  defaultIndex?: string | number;
  /** 关闭翻页功能，在使容器居中时使用 */
  swipe?: boolean;
  /** 变化的事件 */
  onChange?: (value: string | number) => void;
  /** Tabs右边添加附加操作节点 */
  tabBarExtraContent?: React.ReactNode;
  /**
   * line 模式下，指示器模式
   * * 'default': 默认
   * * 'static': 静态
   */
  lineIndicatorMode?: 'default' | 'static';
}

/**
 * @styles item 按钮
 * @styles suffix 后缀节点
 * @styles prefix 前缀节点
 */
export type ITabStyleKeys = 'item' | IButtonStyleKeys;
export interface ITabPureProps
  extends ICustomStyleBaseProps<ITabStyleKeys>,
    Omit<IInlineButtonPureProps, 'type' | 'styles'> {
  /**
   * Tabs类型
   * @default 'line'
   */
  type?: ITabsType;
  /**
   * 设置内部inlineButton的type
   *
   * @type {IButtonType}
   * @memberof ITabPureProps
   */
  buttonType?: IButtonType;
  /**
   * 索引名
   */
  index?: string | number;
  /**
   * 是否选中
   */
  selected?: boolean;
  /**
   * 显示分割符
   */
  divider?: 'off';
  /**
   * a 标签的属性，透传到button上，有这个属性会使用 dom a标签
   */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];

  /**
   * a 标签的属性，透传到button上
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /**
   * a 标签的属性，透传到button上
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  /**
   * 用于火柴棍型时，是否显示 selected 后底部的指示器的条
   */
  showIndicator?: boolean;
}

export interface ITabsContainerPureProps extends ISizeSpecBaseProps, IPropsFromSwipeBaseProps {
  /**
   * Tabs类型
   */
  type: ITabsType;
  /**
   * 关闭翻页功能
   */
  swipe?: boolean;
  /**
   * Tabs高度，如果你需要文字水平居中
   */
  height?: number;
  onChange?: (offset?: number) => void;
}
export type ITabsProps = ITabsPureProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
export type ITabProps = ITabPureProps & React.HTMLAttributes<HTMLDivElement>;
export type ITabsContainerProps = ITabsContainerPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
