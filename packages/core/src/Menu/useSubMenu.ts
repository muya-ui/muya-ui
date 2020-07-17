import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { placementMap } from './const';
import { IMenuContextValue } from './innerTypes';
import { IMenuSelectInfo, ISubMenuProps } from './types';
import { loopMenuItemRecursively } from './utils';

/* istanbul ignore next */
export const useSubMenu = (
  props: ISubMenuProps,
  context: IMenuContextValue,
  titleRef: RefObject<HTMLDivElement>,
) => {
  const {
    openKeys,
    selectedKeys,
    mode,
    multiple,
    inlineMode,
    horizontalMode,
    inlineCollapsed,
    triggerSubMenuAction,
    handleOpenChange,
  } = context;
  const {
    eventKey,
    onClick,
    originOnClick,
    onTitleMouseEnter,
    onTitleMouseLeave,
    onTitleClick,
    parentIsRootMenu,
    disabled,
    children,
    onItemSelect,
    onItemDeselect,
  } = props;
  const [hasScrollBar, setHasScrollBar] = useState(false);
  const [appear, setAppear] = useState(false);
  const menuWidthRef = useRef<number>(0);
  const mouseenterTimeoutRef = useRef<number>();
  const isOpen = useMemo(() => {
    return openKeys.indexOf(eventKey!) > -1;
  }, [eventKey, openKeys]);
  const _menuId = `${eventKey}$Menu`;
  const placement = placementMap[mode] as 'left-start' | 'right-start';
  // item 的选中状态
  const isSelected = useMemo(() => {
    const ret = { find: false };
    loopMenuItemRecursively(children, selectedKeys, ret);
    return selectedKeys.indexOf(eventKey!) !== -1 || ret.find;
  }, [children, eventKey, selectedKeys]);

  const handleMenuScrollRef = useCallback((el: HTMLDivElement) => {
    if (el) {
      setHasScrollBar(el.scrollHeight > el.offsetHeight);
    }
  }, []);

  /**
   * 触发 open 事件，点击 title 或者 popup 展现
   * 如果没有 children 那么还会触发选中行为
   */
  const triggerOpenChange = useCallback(
    (open: boolean, type: string) => {
      if (open === isOpen) return;
      // 第一次打开是将 appear 设为 true，使得后面的动画正常
      if (inlineMode && !inlineCollapsed && !appear) {
        setAppear(true);
      }
      const changeInfo = {
        key: eventKey!,
        item: titleRef,
        trigger: type,
        open,
        parentIsRootMenu: parentIsRootMenu!,
      };
      if (type === 'mouseenter') {
        // make sure mouseenter happen after other menu item's mouseleave
        mouseenterTimeoutRef.current = setTimeout(() => {
          handleOpenChange(changeInfo);
        }, 0);
      } else {
        handleOpenChange(changeInfo);
      }
    },
    [
      appear,
      eventKey,
      handleOpenChange,
      inlineCollapsed,
      inlineMode,
      isOpen,
      parentIsRootMenu,
      titleRef,
    ],
  );

  const addKeyPath = useCallback(
    (info: IMenuSelectInfo) => ({
      ...info,
      keyPath: (info.keyPath || []).concat([eventKey!]),
    }),
    [eventKey],
  );

  // title 的事件
  const handleTitleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      if (onTitleMouseEnter) {
        onTitleMouseEnter({
          key: eventKey!,
          nativeEvent: e,
        });
      }
    },
    [disabled, eventKey, onTitleMouseEnter],
  );

  const handleTitleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      if (onTitleMouseLeave) {
        onTitleMouseLeave({
          key: eventKey!,
          nativeEvent: e,
        });
      }
    },
    [disabled, eventKey, onTitleMouseLeave],
  );

  const handleItemSelect = useCallback(
    (info: IMenuSelectInfo) => {
      if (onItemSelect) {
        onItemSelect(addKeyPath(info));
      }
    },
    [addKeyPath, onItemSelect],
  );

  const handleItemDeselect = useCallback(
    (info: IMenuSelectInfo) => {
      if (onItemDeselect) {
        onItemDeselect(addKeyPath(info));
      }
    },
    [addKeyPath, onItemDeselect],
  );

  const handleTitleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (onTitleClick) {
        onTitleClick({
          key: eventKey!,
          nativeEvent: e,
        });
      }
      if (horizontalMode && titleRef.current) {
        menuWidthRef.current = parseFloat(getComputedStyle(titleRef.current).width || '0');
      }
      if (inlineMode && !inlineCollapsed) {
        triggerOpenChange(!isOpen, 'click');
      }
      // 没有 children 那么触发选中
      if (React.Children.count(children) === 0) {
        const info = {
          key: eventKey!,
          keyPath: [eventKey!],
          item: titleRef,
          nativeEvent: e,
        };
        if (multiple) {
          if (isSelected) {
            handleItemDeselect(info);
          } else {
            handleItemSelect(info);
          }
        } else if (!isSelected) {
          handleItemSelect(info);
        }
      }
    },
    [
      children,
      disabled,
      eventKey,
      handleItemDeselect,
      handleItemSelect,
      horizontalMode,
      inlineCollapsed,
      inlineMode,
      isOpen,
      isSelected,
      multiple,
      onTitleClick,
      titleRef,
      triggerOpenChange,
    ],
  );

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (triggerSubMenuAction === 'hover') {
        triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
      } else {
        triggerOpenChange(visible, 'click');
      }
    },
    [triggerOpenChange, triggerSubMenuAction],
  );

  const handleSubMenuClick = useCallback(
    (info: IMenuSelectInfo) => {
      if (onClick) {
        onClick(addKeyPath(info));
      }
      if (originOnClick) {
        originOnClick(addKeyPath(info));
      }
    },
    [addKeyPath, onClick, originOnClick],
  );

  useEffect(() => {
    return () => {
      if (mouseenterTimeoutRef.current) {
        clearTimeout(mouseenterTimeoutRef.current);
      }
    };
  });

  return {
    isOpen,
    _menuId,
    placement,
    appear,
    hasScrollBar,
    handleMenuScrollRef,
    handleTitleMouseEnter,
    handleTitleMouseLeave,
    handleTitleClick,
    handleVisibleChange,
    handleSubMenuClick,
    handleItemSelect,
    handleItemDeselect,
    isSelected,
    menuWidth: menuWidthRef.current,
  };
};
