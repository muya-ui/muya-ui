import { RefObject, Ref } from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import {
  IMenuMode,
  IMenuOpenInfo,
  IMenuProps,
  IMenuSelectInfo,
  ISubMenuTriggerAction,
} from './types';

export interface IMenuContextValue
  extends Pick<
    IMenuProps,
    | 'styles'
    | 'expandIcon'
    | 'itemIcon'
    | 'subMenuIcon'
    | 'TransitionComponent'
    | 'maxItemCountPerPage'
    | 'autoItemCountPerPage'
    | 'renderMenuItemChild'
    | 'getPopupContainer'
  > {
  openKeys: string[];
  selectedKeys: string[];
  multiple: boolean;
  size: IComponentSizeSpec;
  mode: IMenuMode;
  rootMenuScrollable?: boolean;
  inlineCollapsed: boolean;
  inlineMode: boolean;
  verticalMode: boolean;
  horizontalMode: boolean;
  forceSubMenuRender: boolean;
  hideRootMenuSpacing: boolean;
  triggerSubMenuAction: ISubMenuTriggerAction;
  rootMenuRef: RefObject<HTMLDivElement>;
  handleOpenChange: (openInfo: IMenuOpenInfo) => void;
  handleItemSelect: (selectInfo: IMenuSelectInfo) => void;
  handleItemDeselect: (selectInfo: IMenuSelectInfo) => void;
  handleMenuScrollRef: Ref<HTMLDivElement>;
}
