import React from 'react';

import { ICheckboxProps } from '../Checkbox';
import { IImgDivProps } from '../Img';
import { ICustomStyleBaseProps, Omit } from '../types';

/**
 * @styles 卡片右上角的操作区域容器
 */
export type ICardStyleKeys = 'extraWrapper';
/**
 * @styles checkBoxWrapper 容器
 * @styles extraWrapper 卡片右上角的操作区域容器
 */
export type ICheckBoxCardStyleKeys = 'checkBoxWrapper' | ICardStyleKeys;
/**
 * @styles headerWrapper 头部容器
 * @styles contentWrapper 内容容器
 * @styles actionWrapper 操作区容器
 * @styles metaWrapper meta 容器
 */
export type ICommonCardStyleKeys = 'headerWrapper' | 'contentWrapper' | 'actionWrapper' | 'metaWrapper';

export interface ICardPureProps extends ICustomStyleBaseProps<ICardStyleKeys> {
  /**
   * 卡片右上角的操作区域
   */
  extra?: React.ReactNode;
  /**
   * 是否有边框
   * @default false
   */
  bordered?: boolean;
  /**
   * 常态是否有阴影
   * @default true
   */
  shadowed?: boolean;
  /**
   * hover 态是否有阴影
   * @default true
   */
  hoverShadowed?: boolean;
  /**
   * 是否显示骨架屏，推荐自定义
   * @default false
   */
  loading?: boolean;
}

export type ICardProps = ICardPureProps & React.HTMLAttributes<HTMLDivElement>;

export interface ICommonCardPureProps extends ICardMetaBaseProps, ICustomStyleBaseProps<ICommonCardStyleKeys> {
  /**
   * 图片链接，传入该参数默认会
   * 使用 Img 组件渲染图片
   */
  src?: string;
  /**
   * 图片高度，如需显示图片该参数必须设置
   */
  imgHeight?: number | string;
  /**
   * 文案容器内边距
   * @default 16px 20px
   */
  contentPadding?: string | number;
  /**
   * 操作区容器内边距
   * @default 16px 20px
   */
  actionsPadding?: string | number;
  /**
   * 操作区是否有上边框
   * @default true
   */
  actionsBordered?: boolean;
  /**
   * 操作区内容
   * @default true
   */
  actions?: React.ReactNode;
  /**
   * 头部组件 props
   * @default true
   */
  headerProps?: ICardHeaderProps;
}

export type ICommonCardProps = ICommonCardPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & Omit<ICardPureProps, 'styles'>;

export interface ICheckBoxBaseProps extends ICustomStyleBaseProps<ICheckBoxCardStyleKeys> {
  /**
   * 卡片右上角的操作区域
   */
  extra?: React.ReactNode;
  /**
   * 是否有边框
   * @default false
   */
  bordered?: boolean;
  /**
   * 常态是否有阴影
   * @default true
   */
  shadowed?: boolean;
  /**
   * hover 态是否有阴影
   * @default true
   */
  hoverShadowed?: boolean;
  /**
   * 是否显示骨架屏，推荐自定义
   * @default false
   */
  loading?: boolean;
  /**
   * 默认是否选中
   */
  checked?: boolean;
  /**
   * checked改变事件
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 默认是否选中
   */
  defaultChecked?: boolean;
  /**
   * 是否显示 checkbox
   * @default true
   */
  showCheckbox?: boolean;
}

export type ICheckBoxCardProps = ICheckBoxBaseProps &
  React.HTMLAttributes<HTMLDivElement> &
  Pick<ICheckboxProps, 'size' | 'inputRef'>;

export interface ICardContentBaseProps {
  /**
   * 容器内边距
   * @default 16px 20px
   */
  padding?: string | number;
}

export type ICardContentProps = ICardContentBaseProps & React.HTMLAttributes<HTMLDivElement>;

export interface ICardActionsBaseProps {
  /**
   * 容器内边距
   * @default 16px 20px
   */
  padding?: string | number;
  /**
   * 是否有上边框
   * @default true
   */
  bordered?: boolean;
}

export type ICardActionsProps = ICardActionsBaseProps & React.HTMLAttributes<HTMLDivElement>;

export interface ICardMetaBaseProps {
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 描述
   */
  text?: React.ReactNode;
  /**
   * 标题与描述之间的间距
   * @default 4
   */
  space?: string | number;
}

export type ICardMetaProps = ICardMetaBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

export type ICardHeaderProps = IImgDivProps;
