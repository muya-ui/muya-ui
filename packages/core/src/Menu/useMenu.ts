import { useEventCallback } from '@muya-ui/utils';

import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { shallowEqualArrays } from 'shallow-equal';

import { IMenuContextValue } from './innerTypes';
import { IMenuOpenInfo, IMenuProps, IMenuSelectInfo } from './types';

export const useMenu = (
  props: IMenuProps,
  rootMenuRef: RefObject<HTMLDivElement>,
): IMenuContextValue => {
  const {
    defaultSelectedKeys = [],
    selectedKeys,
    defaultOpenKeys = [],
    openKeys,
    selectable = true,
    inlineCollapsed = false,
    accordion = false,
    mode = 'vertical',
    size = 'm',
    TransitionComponent,
    forceSubMenuRender = false,
    multiple = false,
    triggerSubMenuAction = 'hover',
    expandIcon,
    itemIcon,
    subMenuIcon,
    getPopupContainer,
    hideRootMenuSpacing = false,
    maxItemCountPerPage = 6.5,
    autoItemCountPerPage,
    renderMenuItemChild,
    onOpenChange,
    onSelectChange,
    onItemSelect,
    onItemDeselect,
    styles,
  } = props;
  const isSelectControlled = 'selectedKeys' in props;
  const isOpenControlled = 'openKeys' in props;
  const isInlineCollapsedControlled = 'inlineCollapsed' in props;
  const [hasScrollBar, setHasScrollBar] = useState(false);

  const prevInlineCollapsedOpenKeys = useRef<string[]>(
    (isOpenControlled ? openKeys : defaultOpenKeys) || [],
  );
  const [selectedKeysState, setSelectedKeysState] = useState(
    (isSelectControlled ? selectedKeys : defaultSelectedKeys) || [],
  );
  const [openKeysState, setOpenKeysState] = useState(
    (isOpenControlled ? openKeys : defaultOpenKeys) || [],
  );

  const inlineMode = mode === 'inline';
  const horizontalMode = mode === 'horizontal';
  const verticalMode = !inlineMode && !horizontalMode;
  const finalInlineCollapsed = inlineMode && inlineCollapsed!;
  const finalTriggerSubMenuAction = inlineMode && !inlineCollapsed ? 'click' : triggerSubMenuAction;

  const handleMenuScrollRef = useCallback((el: HTMLDivElement) => {
    if (el) {
      setHasScrollBar(el.scrollHeight > el.offsetHeight);
    }
  }, []);

  const handleOpenChange = useEventCallback((openInfo: IMenuOpenInfo) => {
    let changed = false;
    let newOpenKeys = [...openKeysState];
    /**
     * 手风琴菜单
     */
    if (openInfo.parentIsRootMenu && openInfo.open && accordion) {
      newOpenKeys = [];
      changed = true;
    }
    if (openInfo.open) {
      // 当前打开的 keys 中不存在那么添加
      changed = newOpenKeys.indexOf(openInfo.key) === -1;
      if (changed) {
        newOpenKeys.push(openInfo.key);
      }
    } else {
      // 当前打开的 keys 中存在那么移除
      const index = newOpenKeys.indexOf(openInfo.key);
      changed = index !== -1;
      if (changed) {
        newOpenKeys.splice(index, 1);
      }
    }
    if (changed) {
      if (onOpenChange) {
        onOpenChange(newOpenKeys);
      }
      if (!isOpenControlled) {
        setOpenKeysState(newOpenKeys);
      }
    }
  });

  const handleItemSelect = useCallback(
    (selectInfo: IMenuSelectInfo) => {
      if (selectable) {
        let newSelectedKeys;
        const selectedKey = selectInfo.key;
        if (multiple) {
          newSelectedKeys = [...selectedKeysState, selectedKey];
        } else {
          newSelectedKeys = [selectedKey];
        }
        if (!isSelectControlled) {
          setSelectedKeysState(newSelectedKeys);
        }
        if (onSelectChange) {
          onSelectChange({
            ...selectInfo,
            selectedKeys: selectedKeysState,
            newSelectedKeys,
          });
        }
        if (onItemSelect) {
          onItemSelect({
            ...selectInfo,
            selectedKeys: selectedKeysState,
            newSelectedKeys,
          });
        }
        // 单选，弹出菜单时自动关闭
        if (!multiple && (!inlineMode || inlineCollapsed)) {
          if (onOpenChange) {
            onOpenChange([]);
          }
          if (!isOpenControlled) {
            setOpenKeysState([]);
          }
        }
      }
    },
    [
      inlineCollapsed,
      inlineMode,
      isOpenControlled,
      isSelectControlled,
      multiple,
      onItemSelect,
      onOpenChange,
      onSelectChange,
      selectable,
      selectedKeysState,
    ],
  );

  const handleItemDeselect = useCallback(
    (selectInfo: IMenuSelectInfo) => {
      if (selectable) {
        const newSelectedKeys = [...selectedKeysState];
        const selectedKey = selectInfo.key;
        const index = newSelectedKeys.indexOf(selectedKey);
        if (index !== -1) {
          newSelectedKeys.splice(index, 1);
        }
        if (!isSelectControlled) {
          setSelectedKeysState(newSelectedKeys);
        }
        if (onSelectChange) {
          onSelectChange({
            ...selectInfo,
            selectedKeys: selectedKeysState,
            newSelectedKeys,
          });
        }
        if (onItemDeselect) {
          onItemDeselect({
            ...selectInfo,
            selectedKeys: selectedKeysState,
            newSelectedKeys,
          });
        }
      }
    },
    [isSelectControlled, onItemDeselect, onSelectChange, selectable, selectedKeysState],
  );

  // 受控状态更新
  if (isSelectControlled && !shallowEqualArrays(selectedKeysState, selectedKeys || [])) {
    setSelectedKeysState(selectedKeys || []);
  }

  if (isOpenControlled && !shallowEqualArrays(openKeysState, openKeys || [])) {
    setOpenKeysState(openKeys || []);
  }

  useEffect(() => {
    if (isInlineCollapsedControlled) {
      // 关闭的时候保存开关状态
      if (finalInlineCollapsed) {
        prevInlineCollapsedOpenKeys.current = openKeysState;
      }
      const newOpenKeys = finalInlineCollapsed ? [] : prevInlineCollapsedOpenKeys.current;
      if (onOpenChange) {
        onOpenChange(newOpenKeys);
      }
      if (!isOpenControlled) {
        setOpenKeysState(newOpenKeys);
      }
      // 打开的时候清空保存的开关状态
      if (!finalInlineCollapsed) {
        prevInlineCollapsedOpenKeys.current = [];
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalInlineCollapsed, isInlineCollapsedControlled]);

  const contextValue = {
    rootMenuScrollable: hasScrollBar,
    size,
    mode,
    inlineMode,
    horizontalMode,
    verticalMode,
    triggerSubMenuAction: finalTriggerSubMenuAction,
    TransitionComponent,
    forceSubMenuRender,
    inlineCollapsed: finalInlineCollapsed,
    multiple,
    expandIcon,
    itemIcon,
    subMenuIcon,
    getPopupContainer,
    hideRootMenuSpacing,
    maxItemCountPerPage,
    autoItemCountPerPage,
    openKeys: openKeysState,
    selectedKeys: selectedKeysState,
    styles,
    rootMenuRef,
    renderMenuItemChild,
    handleOpenChange,
    handleItemSelect,
    handleItemDeselect,
    handleMenuScrollRef,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => contextValue, [
    contextValue.rootMenuScrollable,
    contextValue.openKeys,
    contextValue.selectedKeys,
    contextValue.size,
    contextValue.mode,
    contextValue.inlineMode,
    contextValue.verticalMode,
    contextValue.horizontalMode,
    contextValue.inlineCollapsed,
    contextValue.multiple,
    contextValue.expandIcon,
    contextValue.itemIcon,
    contextValue.subMenuIcon,
    contextValue.hideRootMenuSpacing,
    contextValue.maxItemCountPerPage,
    contextValue.autoItemCountPerPage,
  ]);
};
