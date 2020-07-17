import React, { useCallback, useMemo } from 'react';

import { RightIcon } from '@muya-ui/theme-light';

import Checkbox from '../Checkbox';
import Spin from '../Spin';
import { useTheme } from '../utils/useTheme';
import { StyledCascaderMenuItem, StyledCascaderMenuItemContent } from './styled';
import { ICascaderMenuItemProps } from './types';
import useCascaderMenuItem from './useCascaderMenuItem';
import EllipsisContent from '../EllipsisContent';

export default React.memo((props: ICascaderMenuItemProps) => {
  const {
    size,
    menuIndex,
    option,
    active,
    expandIcon,
    loadingIcon,
    loading,
    multiple,
    placement,
    style,
    className,
    activeOptionsRef,
  } = props;
  const theme = useTheme();
  const {
    colors,
    size: { pattern: sizePattern },
    components: { Cascader: token },
  } = theme;
  const { disabled, loading: loadingFromOption } = option;
  const tooltipPlacement = placement.indexOf('top') > -1 ? 'bottom' : 'top';
  const {
    label,
    checked,
    isLeaf,
    halfChecked,
    hasChildren,
    handleSelect,
    handleCheck,
    handleMouseEvent,
  } = useCascaderMenuItem(props);

  const handleRef = useCallback(
    (el: HTMLLIElement) => {
      if (active) {
        activeOptionsRef.current[menuIndex] = el;
      }
    },
    [active, activeOptionsRef, menuIndex],
  );

  const suffixIconNode = useMemo(() => {
    let suffixIconNode = null;
    if (loadingFromOption || loading) {
      suffixIconNode = loadingIcon || <Spin />;
    } else if (hasChildren || isLeaf === false) {
      const ExpandIcon = token.menuExpandIcon || RightIcon;
      suffixIconNode = expandIcon || (
        <ExpandIcon
          style={{
            width: sizePattern.expandIcon.width,
            height: sizePattern.expandIcon.height,
            color: colors.pattern.icon.normal,
            margin: token.item.iconMargin,
          }}
        />
      );
    }
    return suffixIconNode;
  }, [
    colors.pattern.icon.normal,
    expandIcon,
    hasChildren,
    isLeaf,
    loading,
    loadingFromOption,
    loadingIcon,
    sizePattern.expandIcon.height,
    sizePattern.expandIcon.width,
    token.item.iconMargin,
    token.menuExpandIcon,
  ]);

  return (
    <StyledCascaderMenuItem
      ref={handleRef}
      role="menuitem"
      size={size}
      $disabled={!!disabled}
      $selected={active}
      $multiple={multiple}
      onClick={handleSelect}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
      theme={theme}
      style={style}
      className={className}
      onMouseDown={e => e.preventDefault()}
    >
      <StyledCascaderMenuItemContent>
        {multiple && (
          <Checkbox
            key="checkbox"
            size={size}
            indeterminate={!checked && halfChecked}
            checked={checked}
            onChange={handleCheck}
            disabled={disabled}
          />
        )}
        <EllipsisContent key="label" placement={tooltipPlacement}>
          {label}
        </EllipsisContent>
      </StyledCascaderMenuItemContent>
      {suffixIconNode}
    </StyledCascaderMenuItem>
  );
});
