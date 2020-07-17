import { omit } from 'lodash';
import React, { Ref, useMemo } from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { allMenuGroupProp } from './const';
import { IMenuContextValue } from './innerTypes';
import { useMenuContext } from './MenuContext';
import { StyledMenuItemGroup, StyledMenuItemGroupLabel } from './styled';
import { IMenuItemGroupBaseProps, IMenuItemGroupProps } from './types';
import { useMenuBase } from './useMenuBase';

const defaultStyles = {
  group: '',
  groupLabel: '',
};

const MenuItemGroup = memoForwardRef((props: IMenuItemGroupProps, ref: Ref<HTMLDivElement>) => {
  const {
    title = '',
    children,
    eventKey,
    parentIsRootMenu,
    parentMenuOpen,
    menuHasIcon,
    level,
    style,
    styles,
    className,
    onClick,
    onItemSelect,
    onItemDeselect,
  } = props;
  const theme = useTheme();
  const {
    styles: menuStyles,
    inlineMode,
    inlineCollapsed,
    mode,
  } = useMenuContext() as IMenuContextValue;
  const { elements, renderMenuWidget } = useMenuBase({
    mode,
    level: level!,
    eventKey: `${eventKey}_menu_group`,
    parentIsRootMenu: parentIsRootMenu!,
    parentMenuOpen: parentMenuOpen!,
    menuHasIcon: false,
    children,
    onClick,
    onItemSelect,
    onItemDeselect,
  });
  const groupStyles = useMemo(() => {
    const groupStyles: typeof styles = { ...menuStyles, ...styles };
    const { group, groupLabel } = groupStyles;
    return { group, groupLabel };
  }, [menuStyles, styles]);
  const innerStyles = useStyles('menu', defaultStyles, groupStyles);
  const finalStyle = useMemo(() => {
    return { ...innerStyles.group.style, ...style };
  }, [innerStyles.group.style, style]);
  const showLabel = !inlineCollapsed || (inlineCollapsed && level! > 1);
  const domProps = omit<IMenuItemGroupProps, keyof IMenuItemGroupBaseProps>(
    props,
    allMenuGroupProp,
  );

  return (
    <StyledMenuItemGroup
      ref={ref}
      theme={theme}
      $level={level!}
      $menuHasIcon={menuHasIcon}
      $inlineMode={inlineMode}
      $inlineCollapsed={inlineCollapsed}
      className={[innerStyles.group.className, className].join(' ').trim()}
      style={finalStyle}
      {...domProps}
    >
      {showLabel && (
        <StyledMenuItemGroupLabel {...innerStyles.groupLabel}>{title}</StyledMenuItemGroupLabel>
      )}
      {elements.map(renderMenuWidget)}
    </StyledMenuItemGroup>
  );
});

MenuItemGroup.displayName = 'MenuItemGroup';

export default MenuItemGroup;
