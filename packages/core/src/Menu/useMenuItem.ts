import { RefObject, useEffect, useMemo } from 'react';

import { useEventCallback } from '@muya-ui/utils';

import scrollIntoView from '../utils/scrollIntoView';
import { IMenuContextValue } from './innerTypes';
import { IMenuItemProps } from './types';

/* istanbul ignore next */
export const useMenuItem = (
  props: IMenuItemProps,
  context: IMenuContextValue,
  itemRef: RefObject<HTMLDivElement>,
) => {
  const {
    selectedKeys,
    multiple,
    inlineCollapsed,
    inlineMode,
    verticalMode,
    horizontalMode,
    hideRootMenuSpacing,
    rootMenuRef,
    rootMenuScrollable,
  } = context;
  const {
    disabled,
    eventKey,
    onClick,
    originOnClick,
    level,
    role,
    title,
    parentMenuOpen,
    parentMenuScrollable,
    onItemSelect,
    onItemDeselect,
  } = props;

  // item 的选中状态
  const isSelected = selectedKeys.indexOf(eventKey!) !== -1;
  const showChildren = !inlineCollapsed || (inlineCollapsed && level! > 1);
  const attrs = useMemo(() => {
    let attrs: React.HTMLAttributes<HTMLDivElement> = {
      title: title,
      role: role || 'menuitem',
      'aria-disabled': disabled,
    };
    if (role === 'option') {
      attrs = {
        ...attrs,
        role: 'option',
        'aria-selected': isSelected,
      };
    } else if (role === null || role === 'none') {
      attrs.role = 'none';
    }
  }, [disabled, isSelected, role, title]);

  // 激活时滚动到该 item
  useEffect(() => {
    // 父菜单打开，且选中的情况下需要进行滚动
    if (parentMenuOpen && isSelected && itemRef.current) {
      // 弹出菜单
      if (
        parentMenuScrollable &&
        ((((inlineMode && inlineCollapsed) || verticalMode || horizontalMode) && level! > 0) ||
          (verticalMode && hideRootMenuSpacing && level! >= 0))
      ) {
        scrollIntoView(itemRef.current, {
          onlyFirstScrollableParent: true,
          behavior: 'auto',
        });
        // 非弹出菜单按根节点进行滚动
      } else if (rootMenuRef.current && rootMenuScrollable) {
        scrollIntoView(itemRef.current, {
          parentNode: rootMenuRef.current,
          behavior: 'auto',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentMenuOpen, parentMenuScrollable, rootMenuScrollable, isSelected, itemRef]);

  // 点击时调用外部的点击函数 + 处理选中状态
  const handleClick = useEventCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    const info = {
      key: eventKey!,
      keyPath: [eventKey!],
      item: itemRef,
      nativeEvent: e,
    };
    if (multiple) {
      if (isSelected) {
        onItemDeselect!(info);
      } else {
        onItemSelect!(info);
      }
    } else if (!isSelected) {
      onItemSelect!(info);
    }
    if (onClick) {
      onClick(info);
    }
    if (originOnClick) {
      originOnClick(info);
    }
  }, []);

  return {
    attrs,
    showChildren,
    isSelected,
    handleClick,
  };
};
