import React, { useCallback, useRef, useEffect } from 'react';

import { ICascaderMenuItemProps } from './types';

export default function useCascaderMenuItem(props: ICascaderMenuItemProps) {
  const {
    option,
    fieldNames,
    expandTrigger,
    checkedKeys,
    menuIndex,
    loading,
    loaded,
    active,
    onLoad,
    onSelect,
    onDeselect,
  } = props;
  const delayTimer = useRef<number>();
  const value = option[fieldNames.value];
  const label = option[fieldNames.label] || value;
  const isLeaf = option[fieldNames.isLeaf];
  const children = option[fieldNames.children];
  const checked = checkedKeys.checked.indexOf(value) > -1;
  const halfChecked = checkedKeys.halfChecked.indexOf(value) > -1;
  const hasChildren = children && children.length > 0;
  const enableMouseEvent = expandTrigger === 'hover' && (hasChildren || isLeaf === false);

  const handleSelect = useCallback(
    (e: React.MouseEvent | React.ChangeEvent) => {
      if (onSelect) {
        onSelect(option, menuIndex, e);
      }
    },
    [menuIndex, onSelect, option],
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        handleSelect(e);
      } else {
        onDeselect([option], e);
      }
    },
    [handleSelect, onDeselect, option],
  );

  const handleMouseEvent = useCallback(
    (e: React.MouseEvent) => {
      if (!enableMouseEvent) return;
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
      e.persist();
      delayTimer.current = setTimeout(() => {
        handleSelect(e);
      }, 150);
    },
    [enableMouseEvent, handleSelect],
  );

  useEffect(() => {
    if (loading || option.loading) return;
    if (active && isLeaf === false && !loaded && !hasChildren) {
      onLoad(value);
    }
  }, [active, hasChildren, isLeaf, loaded, loading, onLoad, option.loading, value]);

  return {
    value,
    label,
    isLeaf,
    checked,
    halfChecked,
    hasChildren,
    handleSelect,
    handleCheck,
    handleMouseEvent,
  };
}
