import React, { ReactElement, ReactNode } from 'react';

import { IAnimationBaseProps } from '../Animation';
import { ICommonTriggerProps, ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';
import { ITriggerContainerFunc } from '../Trigger';

/** common type */
export type IMenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'inline' | 'horizontal';

export type ISubMenuTriggerAction = 'hover' | 'click';

/**
 * Menu style keys
 * @styles wrapper 菜单容器
 * @styles menuScrollWrapper 菜单滚动容器节点
 * @styles menu 菜单节点
 * @styles subMenu 子菜单
 * @styles subMenuTitle 子菜单标题
 * @styles group 菜单项组
 * @styles groupLabel 菜单项组文本
 * @styles item 菜单项
 * @styles itemContent 菜单项内容节点
 * @styles itemText 菜单项文本节点
 **/
export type IMenuStyleKeys =
  | 'wrapper'
  | 'menuScrollWrapper'
  | 'menu'
  | 'subMenu'
  | 'subMenuTitle'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemContent'
  | 'itemText';

export type ISubMenuIconFunc = (props: ISubMenuProps) => ReactNode;

/**
 * 菜单选中回调信息
 */
export interface IMenuSelectInfo {
  /**
   * 触发选中或者取消选中的 item 的 key
   */
  key: string;
  /**
   * 选中 item 的 key 路径
   */
  keyPath: string[];
  /**
   * 选中 item 的 ref
   */
  item: React.RefObject<HTMLDivElement>;
  /**
   * 原始的点击事件
   */
  nativeEvent: React.MouseEvent;
  /**
   * 当前选中的 keys
   */
  selectedKeys?: string[];
  /**
   * 内部非受控情况下计算得的的选中 keys
   */
  newSelectedKeys?: string[];
}

/**
 * 菜单展开回调信息
 */
export interface IMenuOpenInfo {
  /**
   * 触发展开的 item 的 key
   */
  key: string;
  /**
   * 展开 item 的 ref
   */
  item: React.RefObject<HTMLDivElement>;
  /**
   * 展开还是关闭
   */
  open: boolean;
  /**
   * 父菜单是否为根菜单
   */
  parentIsRootMenu: boolean;
  /**
   * 触发 open 的行为
   */
  trigger: string;
}

export interface IMenuMouseEventInfo {
  /**
   * 触发事件 item 的 key
   */
  key: string;
  /**
   * 原始的点击事件
   */
  nativeEvent: React.MouseEvent;
}

export interface IMenuWidgetCommonProps {
  /**
   * 菜单节点（包括 SubMenu、MenuItemGroup、MenuItem，下同）的 key
   */
  eventKey?: string;
  /**
   * 菜单节点层级
   */
  level?: number;
  /**
   * 菜单节点所在菜单是否有 icon
   */
  menuHasIcon?: boolean;
  /**
   * 菜单父节点 key
   */
  parentEventKey?: string;
  /**
   * 父菜单是否为根菜单
   */
  parentIsRootMenu?: boolean;
  /**
   * 父菜单是否打开
   */
  parentMenuOpen?: boolean;
  /**
   * 父菜单是否可以滚动
   */
  parentMenuScrollable?: boolean;
  /**
   * 点击回调
   */
  onClick?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * 原始的点击回调
   */
  originOnClick?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * 选中回调
   */
  onItemSelect?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * 取消选中回调
   */
  onItemDeselect?: (selectInfo: IMenuSelectInfo) => void;
}

/** component props */
export interface IMenuBaseProps extends ISizeSpecBaseProps, ICustomStyleBaseProps<IMenuStyleKeys> {
  /**
   * 菜单宽度
   * @default -
   */
  width?: number;
  /**
   * 菜单高度
   * @default -
   */
  height?: number | string;
  /**
   * 是否隐藏根菜单的边距，在 Dropdown 等场景中使用时可以选择隐藏根菜单的边距
   * @default false
   */
  hideRootMenuSpacing?: boolean;
  /**
   * SubMenuTitle、MenuItem 禁用外边距
   * @default false
   */
  noSpacing?: boolean;
  /**
   * 默认选中的 keys
   * @default []
   **/
  defaultSelectedKeys?: string[];
  /**
   * 选择 items 的 keys
   * @default []
   **/
  selectedKeys?: string[];
  /**
   * 默认打开的 submenuitem keys
   * @default []
   **/
  defaultOpenKeys?: string[];
  /**
   * 打开的 submenuitem keys
   * @default []
   **/
  openKeys?: string[];
  /**
   * 菜单模式
   * @default 'vertical'
   **/
  mode?: IMenuMode;
  /**
   * 子菜单什么条件下展开
   * @default 'hover'
   **/
  triggerSubMenuAction?: ISubMenuTriggerAction;
  /**
   * 菜单是否允许选择
   * @default true
   **/
  selectable?: boolean;
  /**
   * 是否支持多选
   * @default false
   **/
  multiple?: boolean;
  /**
   * 是否开启手风琴模式，只在 `openKeys` 非受控模式下有效
   * @default false
   */
  accordion?: boolean;
  /**
   * 子元素
   * @default -
   **/
  children: ReactElement | ReactElement[];
  /**
   * 子菜单的 icon
   * @default -
   **/
  subMenuIcon?: ReactNode | ISubMenuIconFunc;
  /**
   * item 的 icon
   * @default -
   **/
  itemIcon?: ReactNode;
  /**
   * 展开的 icon
   * @default -
   **/
  expandIcon?: React.ReactNode | ISubMenuIconFunc;
  /**
   * 自定义渲染 Menuitem 的 children
   * @default -
   */
  renderMenuItemChild?: (props: IRenderMenuItemProps) => React.ReactNode;
  /**
   * 过渡组件
   * @default Animation.Slide
   **/
  TransitionComponent?: React.ComponentType<IAnimationBaseProps>;
  /**
   * 在子菜单展示之前就渲染进 DOM
   * @default false
   */
  forceSubMenuRender?: boolean;
  /**
   * inline 时菜单是否收起状态
   * @default false
   */
  inlineCollapsed?: boolean;
  /**
   * vertical 模式下，子菜单每页最多的菜单项数量
   * @default 6.5
   */
  maxItemCountPerPage?: number;
  /**
   * 自适应每页菜单项数量
   */
  autoItemCountPerPage?: boolean;
  /**
   * 一级子菜单默认绑定的容器
   * @default -
   **/
  getPopupContainer?: ITriggerContainerFunc;
  /**
   * 点击回调
   * @default -
   */
  onClick?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * 选中 menuitem 触发，不推荐使用之后将移除，建议使用 onSelectChange
   * @default -
   **/
  onItemSelect?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * 多选模式下，取消选中时触发，不推荐使用之后将移除，建议使用 onSelectChange
   * @default -
   **/
  onItemDeselect?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * item 选中状态改变
   * @default -
   */
  onSelectChange?: (selectInfo: IMenuSelectInfo) => void;
  /**
   * 打开的菜单改变时触发
   * @default -
   **/
  onOpenChange?: (openKeys: string[]) => void;
  /**
   * 菜单滚动
   * @default -
   */
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

export type IMenuProps = IMenuBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onScroll' | 'onClick'>;

export interface IMenuItemBaseProps
  extends IMenuWidgetCommonProps,
    ICustomStyleBaseProps<'item' | 'itemContent' | 'itemText'> {
  /**
   * 子节点
   * @default -
   **/
  children: ReactNode;
  /**
   * 是否禁用
   * @default false
   **/
  disabled?: boolean;
  /**
   * item 的 icon
   * @default -
   */
  icon?: ReactNode;
}

export type IMenuItemProps = IMenuItemBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

export type IRenderMenuItemProps = { selected: boolean } & IMenuItemProps;

export interface IMenuItemGroupBaseProps
  extends IMenuWidgetCommonProps,
    ICustomStyleBaseProps<'group' | 'groupLabel'> {
  /**
   * 标题
   * @default -
   */
  title: ReactNode;
  /**
   * 子元素
   * @default -
   **/
  children: ReactElement | ReactElement[];
}

export type IMenuItemGroupProps = IMenuItemGroupBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'>;

export interface ISubMenuBaseProps
  extends ICommonTriggerProps,
    IMenuWidgetCommonProps,
    ICustomStyleBaseProps<'menu' | 'subMenu' | 'subMenuTitle' | 'menuScrollWrapper'> {
  /**
   * 子菜单标题
   * @default -
   **/
  title?: ReactNode;
  /**
   * 子节点
   * @default -
   **/
  children: ReactElement | ReactElement[];
  /**
   * 是否禁用
   * @default false
   **/
  disabled?: boolean;
  /**
   * 子菜单的 icon
   * @default -
   */
  icon?: ReactNode | ISubMenuIconFunc;
  /**
   * 鼠标移入 title 的处理函数
   * @default -
   **/
  onTitleMouseEnter?: (info: IMenuMouseEventInfo) => void;
  /**
   * 鼠标移出 title 的处理函数
   * @default -
   **/
  onTitleMouseLeave?: (info: IMenuMouseEventInfo) => void;
  /**
   * 点击 title 的处理函数
   * @default -
   **/
  onTitleClick?: (info: IMenuMouseEventInfo) => void;
}

export type ISubMenuProps = ISubMenuBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'>;
