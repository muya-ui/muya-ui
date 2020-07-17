import { omit } from 'lodash';
import React, { Ref, useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { allMenuItemProp } from './const';
import { IMenuContextValue } from './innerTypes';
import { useMenuContext } from './MenuContext';
import {
  StyledMenuItem,
  StyledMenuItemContent,
  StyledMenuItemText,
  StyledMenuItemTooltip,
} from './styled';
import { IMenuItemProps } from './types';
import { useMenuItem } from './useMenuItem';

const defaultStyles = {
  item: '',
  itemContent: '',
  itemText: '',
};

const MenuItem = memoForwardRef((props: IMenuItemProps, ref: Ref<HTMLDivElement>) => {
  const context = useMenuContext() as IMenuContextValue;
  const itemRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(itemRef, ref);
  const { disabled, menuHasIcon, level, className, style, icon, children, styles } = props;
  const theme = useTheme();
  const {
    components: {
      Menu: { tooltip },
    },
  } = theme;
  const { isSelected, showChildren, attrs, handleClick } = useMenuItem(props, context, itemRef);
  const {
    styles: menuStyles,
    inlineMode,
    horizontalMode,
    itemIcon,
    inlineCollapsed,
    renderMenuItemChild,
  } = context;
  const itemStyles = useMemo(() => {
    const itemStyles: typeof styles = {
      ...menuStyles,
      ...styles,
    };
    const { item, itemContent, itemText } = itemStyles;
    return { item, itemContent, itemText };
  }, [menuStyles, styles]);
  const innerStyles = useStyles('menu', defaultStyles, itemStyles);
  const finalStyle = useMemo(() => {
    return { ...innerStyles.item.style, ...style };
  }, [innerStyles.item.style, style]);
  const domProps = omit(props, allMenuItemProp);

  const iconNode = useMemo(() => {
    const finalIcon = icon || itemIcon;
    if (typeof finalIcon === 'function') {
      return finalIcon(props);
    } else {
      return finalIcon;
    }
  }, [icon, itemIcon, props]);

  const childrenNode = useMemo(() => {
    if (renderMenuItemChild) {
      return renderMenuItemChild({ ...props, selected: isSelected });
    } else {
      return children;
    }
  }, [children, isSelected, props, renderMenuItemChild]);

  const itemNode = useMemo(() => {
    return (
      <StyledMenuItem
        ref={handleRef}
        {...domProps}
        {...attrs}
        theme={theme}
        $menuHasIcon={menuHasIcon}
        $isSelected={isSelected}
        $disabled={disabled!}
        $level={level!}
        $inlineMode={inlineMode}
        $horizontalMode={horizontalMode}
        $inlineCollapsed={inlineCollapsed}
        className={[innerStyles.item.className, className].join(' ').trim()}
        style={finalStyle}
        onClick={handleClick}
      >
        <StyledMenuItemContent {...innerStyles.itemContent}>
          {iconNode}
          <StyledMenuItemText {...innerStyles.itemText}>{childrenNode}</StyledMenuItemText>
        </StyledMenuItemContent>
      </StyledMenuItem>
    );
  }, [
    attrs,
    childrenNode,
    className,
    disabled,
    domProps,
    finalStyle,
    handleClick,
    handleRef,
    horizontalMode,
    iconNode,
    inlineCollapsed,
    inlineMode,
    innerStyles.item.className,
    innerStyles.itemContent,
    innerStyles.itemText,
    isSelected,
    level,
    menuHasIcon,
    theme,
  ]);

  if (showChildren) {
    return itemNode;
  } else {
    return (
      <StyledMenuItemTooltip
        title={children}
        offset={tooltip.offset}
        size={tooltip.size}
        placement="right"
      >
        {itemNode}
      </StyledMenuItemTooltip>
    );
  }
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
