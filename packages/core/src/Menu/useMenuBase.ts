import { cloneElement, ReactElement, useMemo } from 'react';

import { IMenuMode, IMenuProps, IMenuSelectInfo } from './types';
import { getKeyFromChildrenIndex, getValidChildElements } from './utils';

export interface IUseMenuBaseProps extends Pick<IMenuProps, 'children'> {
  mode: IMenuMode;
  eventKey: string;
  level: number;
  hasScrollBar?: boolean;
  parentIsRootMenu: boolean;
  parentMenuOpen: boolean;
  menuHasIcon: boolean;
  onClick?: (selectInfo: IMenuSelectInfo) => void;
  onItemSelect?: (selectInfo: IMenuSelectInfo) => void;
  onItemDeselect?: (selectInfo: IMenuSelectInfo) => void;
}

export const useMenuBase = (props: IUseMenuBaseProps) => {
  const {
    level,
    eventKey,
    hasScrollBar,
    parentIsRootMenu,
    parentMenuOpen,
    menuHasIcon,
    children,
    onClick,
    onItemSelect,
    onItemDeselect,
  } = props;
  // 获取子节点
  const elements = useMemo(() => getValidChildElements(children), [children]);
  // 渲染子节点
  const renderMenuWidget = (child: ReactElement, i: number) => {
    if (!child) {
      return null;
    }
    if (child.type && (child.type as any).displayName === 'MenuDivider') {
      return child;
    }
    const key = getKeyFromChildrenIndex(child, eventKey, i);
    const childProps = child.props;
    if (!childProps || typeof child.type === 'string') {
      return child;
    }
    return cloneElement(child, {
      level,
      index: i,
      eventKey: key,
      parentEventKey: eventKey,
      parentMenuOpen,
      parentIsRootMenu,
      parentMenuScrollable: hasScrollBar,
      menuHasIcon,
      originOnClick: childProps.onClick,
      onClick,
      onItemSelect,
      onItemDeselect,
    });
  };

  return {
    elements,
    renderMenuWidget,
  };
};
