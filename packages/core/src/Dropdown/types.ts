import React from 'react';

import { IMenuProps, IMenuSelectInfo } from '../Menu/types';
import { IPopperPlacement } from '../Popper/types';
import { ITriggerAction, ITriggerProps, ITriggerContainerFunc } from '../Trigger/types';
import { IReactElementWithRef, ISizeSpecBaseProps, Omit } from '../types';
import { IButtonProps } from '../Button/types';

export type IOverlayFunc = () => React.ReactElement<IMenuProps>;
export type IOverlay = React.ReactElement<IMenuProps> | IOverlayFunc;

export interface IDropdownProps
  extends ISizeSpecBaseProps,
    Omit<
      ITriggerProps,
      | 'popup'
      | 'open'
      | 'children'
      | 'container'
      | 'placement'
      | 'triggerActions'
      | 'TransitionComponent'
    > {
  /**
   * trigger id
   * @default -
   * */
  id?: string;
  /**
   * 是否禁用
   * @default false
   **/
  disabled?: boolean;
  /**
   * 菜单
   * @typeText React.ReactElement<IMenuProps> | () => React.ReactElement<IMenuProps>
   * @default -
   **/
  overlay: IOverlay;
  /**
   * 菜单弹出位置
   * @default 'bottom-start'
   **/
  placement?: IPopperPlacement;
  /**
   * 下拉触发行为
   * @typeText Array<'hover' | 'click' | 'focus'>
   * @default ['hover']
   **/
  triggerActions?: Array<ITriggerAction>;
  /**
   * 下拉触发行为，优先级低于 triggerActions
   * @default 'hover'
   **/
  triggerAction?: ITriggerAction;
  /**
   * 菜单是否可见
   * @default -
   */
  visible?: boolean;
  /**
   * 菜单是否默认可见
   * @default false
   **/
  defaultVisible?: boolean;
  /**
   * 过渡组件
   * @default Animation.Slide
   **/
  TransitionComponent?: React.ComponentType<any>;
  /**
   * 子节点
   * @default -
   *  */
  children: IReactElementWithRef;
  /** 菜单绑定的节点 */
  getPopupContainer?: ITriggerContainerFunc;
  /** 点击菜单 */
  onOverlayClick?: (selectInfo: IMenuSelectInfo) => void;
}

export interface IDropdownButtonProps
  extends Omit<IDropdownProps, 'children'>,
    Omit<IButtonProps, 'theme'> {
  /**
   * 按钮类型
   * @default false
   **/
  plain?: boolean;
  /**
   * 是否是按钮组
   * @default false
   **/
  group?: boolean;
  /**
   * 展开的 icon
   * @default FoldIcon
   */
  expandIcon?: React.ReactNode;
  /**
   *  group icon
   * @default MoreIcon
   */
  groupIcon?: React.ReactNode;
  /**
   * 子节点
   * @default -
   */
  children: React.ReactNode;
}
