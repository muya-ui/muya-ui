import { omit } from 'lodash';
import React, { Ref, useMemo, useRef } from 'react';

import { FoldIcon } from '@muya-ui/theme-light';

import Animation from '../Animation';
import { IPopperProps } from '../Popper';
import ExpandIconWrapper from '../styled/components/ExpandIconWrapper';
import ExpandWrapper from '../styled/components/ExpandWrapper';
import Trigger from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { allSubMenuProp } from './const';
import { IMenuContextValue } from './innerTypes';
import { useMenuContext } from './MenuContext';
import {
  expandedRotateKeyframes,
  notExpandedRotateKeyframes,
  StyledMenu,
  StyledMenuScrollWrapper,
  StyledSubMenu,
  StyledSubMenuTitle,
  StyledSubMenuTitleAndIconWrapper,
  StyledSubMenuTitleWrapper,
} from './styled';
import { ISubMenuBaseProps, ISubMenuProps } from './types';
import { useMenuBase } from './useMenuBase';
import { useSubMenu } from './useSubMenu';
import { applyStyle } from './utils';

const defaultStyles = {
  menu: '',
  subMenu: '',
  subMenuTitle: '',
  menuScrollWrapper: '',
};

const SubMenu = memoForwardRef((props: ISubMenuProps, ref: Ref<HTMLDivElement>) => {
  const {
    eventKey,
    title,
    disabled,
    level,
    icon,
    menuHasIcon,
    children,
    className,
    style,
    popperProps = {},
    flip = true,
    arrowPointAtCenter,
    parentIsRootMenu,
    parentMenuScrollable,
    triggerId,
    styles,
  } = props;
  const titleRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const context = useMenuContext() as IMenuContextValue;
  const {
    getPopupContainer,
    inlineMode,
    expandIcon,
    subMenuIcon,
    triggerSubMenuAction,
    TransitionComponent,
    styles: menuStyles,
    forceSubMenuRender,
    inlineCollapsed,
    horizontalMode,
    verticalMode,
    maxItemCountPerPage,
    autoItemCountPerPage,
    size,
    hideRootMenuSpacing,
    mode,
  } = context;
  const {
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
    menuWidth,
  } = useSubMenu(props, context, titleRef);
  const finalIcon = icon || subMenuIcon;
  const { elements, renderMenuWidget } = useMenuBase({
    mode,
    level: level! + 1,
    eventKey: `${eventKey}_submenu`,
    parentIsRootMenu: false,
    parentMenuOpen: isOpen,
    menuHasIcon: !!finalIcon,
    children,
    hasScrollBar,
    onClick: handleSubMenuClick,
    onItemSelect: handleItemSelect,
    onItemDeselect: handleItemDeselect,
  });
  const subMenuStyles = useMemo(() => {
    const subMenuStyles: typeof styles = { ...menuStyles, ...styles };
    const { menu, subMenu, subMenuTitle, menuScrollWrapper } = subMenuStyles;
    return { menu, subMenu, subMenuTitle, menuScrollWrapper };
  }, [menuStyles, styles]);
  const offset = useMemo(() => {
    if (parentMenuScrollable && mode !== 'vertical-right') {
      return theme.components.Menu.subMenu.offsetHasScrollBar;
    } else {
      return theme.components.Menu.subMenu.offset;
    }
  }, [
    mode,
    parentMenuScrollable,
    theme.components.Menu.subMenu.offset,
    theme.components.Menu.subMenu.offsetHasScrollBar,
  ]);
  const innerStyles = useStyles('menu', defaultStyles, subMenuStyles);
  const finalStyle = useMemo(() => {
    return { ...innerStyles.subMenu.style, ...style };
  }, [innerStyles.subMenu.style, style]);

  const container =
    (parentIsRootMenu && !hideRootMenuSpacing) || !titleRef.current
      ? getPopupContainer
      : (titleRef.current.parentNode as Element);
  const domProps = omit<ISubMenuProps, keyof ISubMenuBaseProps>(props, allSubMenuProp);
  const showTitle = !inlineCollapsed || (inlineCollapsed && level! > 1);
  const ariaOwns = useMemo(() => {
    let ariaOwns = {};
    if (isOpen) {
      ariaOwns = {
        '': _menuId,
      };
    }
    return ariaOwns;
  }, [_menuId, isOpen]);
  const finalPopperProps: Partial<IPopperProps> = useMemo(() => {
    const finalPopperProps = {
      ...popperProps,
      lazyMount: !forceSubMenuRender,
    };
    if (hasScrollBar) {
      finalPopperProps.modifiers = {
        ...finalPopperProps.modifiers,
        preventOverflow: {
          boundariesElement: 'viewport',
          padding: theme.components.Menu.subMenu.preventOverflowPadding / 2,
        },
      };
    }
    if (parentMenuScrollable) {
      finalPopperProps.modifiers = {
        ...finalPopperProps.modifiers,
        applyStyle: {
          fn: applyStyle,
        },
      };
    }
    return finalPopperProps;
  }, [
    forceSubMenuRender,
    hasScrollBar,
    parentMenuScrollable,
    popperProps,
    theme.components.Menu.subMenu.preventOverflowPadding,
  ]);

  // 渲染 children
  const childrenNode = useMemo(() => {
    let style;
    if (horizontalMode) {
      style = { width: menuWidth };
    }
    if (inlineMode && !inlineCollapsed) {
      return (
        <Animation.Collapse
          appear={appear}
          easing="linear"
          timeout={theme.transition.pattern.duration.status}
          in={isOpen}
        >
          <StyledMenu
            theme={theme}
            $size={size}
            $inlineMode={inlineMode}
            $horizontalMode={horizontalMode}
            $inlineCollapsed={inlineCollapsed}
            $sub={true}
            $hideRootMenuSpacing={hideRootMenuSpacing}
            {...innerStyles.menu}
          >
            <StyledMenuScrollWrapper ref={handleMenuScrollRef} {...innerStyles.menuScrollWrapper}>
              {elements.map(renderMenuWidget)}
            </StyledMenuScrollWrapper>
          </StyledMenu>
        </Animation.Collapse>
      );
    }
    return (
      <StyledMenu
        theme={theme}
        $size={size}
        $inlineMode={inlineMode}
        $horizontalMode={horizontalMode}
        $inlineCollapsed={inlineCollapsed}
        $sub={true}
        $hasScrollBar={hasScrollBar}
        $hideRootMenuSpacing={hideRootMenuSpacing}
        $maxItemCountPerPage={maxItemCountPerPage}
        $autoItemCountPerPage={autoItemCountPerPage}
        className={innerStyles.menu.className}
        style={{ ...innerStyles.menu.style, ...style }}
      >
        <StyledMenuScrollWrapper ref={handleMenuScrollRef} {...innerStyles.menuScrollWrapper}>
          {elements.map(renderMenuWidget)}
        </StyledMenuScrollWrapper>
      </StyledMenu>
    );
  }, [
    appear,
    autoItemCountPerPage,
    elements,
    handleMenuScrollRef,
    hasScrollBar,
    hideRootMenuSpacing,
    horizontalMode,
    inlineCollapsed,
    inlineMode,
    innerStyles.menu,
    innerStyles.menuScrollWrapper,
    isOpen,
    maxItemCountPerPage,
    menuWidth,
    renderMenuWidget,
    size,
    theme,
  ]);

  const iconNode = useMemo(() => {
    if (typeof finalIcon === 'function') {
      return finalIcon(props);
    } else {
      return finalIcon;
    }
  }, [finalIcon, props]);

  const expandIconNode = useMemo(() => {
    if (React.Children.count(children) > 0 && showTitle) {
      const ExpandIcon = theme.components.Menu.expandIcon || FoldIcon;
      let {
        components: { Menu: token },
        typography: {
          spec: { lineHeight },
        },
        size: {
          pattern: {
            expandIcon: { height },
          },
        },
      } = theme;
      let animationProps;
      if (verticalMode || (inlineCollapsed && level! > 1)) {
        animationProps = {
          expandedKeyframes: expandedRotateKeyframes,
          notExpandedKeyframes: notExpandedRotateKeyframes,
        };
      }
      if (horizontalMode) {
        height = lineHeight[token.fontLevel];
      }
      return (
        <ExpandWrapper theme={theme} expanded={isOpen} {...animationProps}>
          {expandIcon || (
            <ExpandIconWrapper height={height}>
              <ExpandIcon />
            </ExpandIconWrapper>
          )}
        </ExpandWrapper>
      );
    }
  }, [
    children,
    expandIcon,
    horizontalMode,
    inlineCollapsed,
    isOpen,
    level,
    showTitle,
    theme,
    verticalMode,
  ]);

  const titleNode = useMemo(
    () => (
      <StyledSubMenuTitleWrapper
        ref={titleRef}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleTitleClick}
        onMouseEnter={handleTitleMouseEnter}
        onMouseLeave={handleTitleMouseLeave}
        {...ariaOwns}
        title={typeof title === 'string' ? title : undefined}
      >
        <StyledSubMenuTitle {...innerStyles.subMenuTitle} theme={theme} $selected={isSelected}>
          <StyledSubMenuTitleAndIconWrapper>
            {iconNode}
            {showTitle && title}
          </StyledSubMenuTitleAndIconWrapper>
          {expandIconNode}
        </StyledSubMenuTitle>
      </StyledSubMenuTitleWrapper>
    ),
    [
      ariaOwns,
      expandIconNode,
      handleTitleClick,
      handleTitleMouseEnter,
      handleTitleMouseLeave,
      iconNode,
      innerStyles.subMenuTitle,
      isOpen,
      isSelected,
      showTitle,
      theme,
      title,
    ],
  );

  const inlineMenu = useMemo(() => {
    if (inlineMode && !inlineCollapsed) {
      return (
        <>
          {titleNode}
          {childrenNode}
        </>
      );
    }
  }, [childrenNode, inlineCollapsed, inlineMode, titleNode]);

  const verticalOrInlineCollapseMenu = useMemo(() => {
    if (!inlineMode || inlineCollapsed) {
      return (
        <Trigger
          hideArrow
          disabled={disabled}
          triggerAction={triggerSubMenuAction}
          TransitionComponent={TransitionComponent}
          placement={placement}
          open={isOpen}
          offset={offset}
          popup={childrenNode}
          flip={flip}
          triggerId={triggerId}
          arrowPointAtCenter={arrowPointAtCenter}
          popperProps={finalPopperProps}
          container={container}
          onVisibleChange={handleVisibleChange}
        >
          {titleNode}
        </Trigger>
      );
    }
  }, [
    TransitionComponent,
    arrowPointAtCenter,
    childrenNode,
    container,
    disabled,
    finalPopperProps,
    flip,
    handleVisibleChange,
    inlineCollapsed,
    inlineMode,
    isOpen,
    offset,
    placement,
    titleNode,
    triggerId,
    triggerSubMenuAction,
  ]);

  return (
    <StyledSubMenu
      ref={ref}
      role="menuitem"
      {...domProps}
      className={[innerStyles.subMenu.className, className].join(' ').trim()}
      style={finalStyle}
      theme={theme}
      $disabled={disabled!}
      $level={level!}
      $menuHasIcon={menuHasIcon}
      $inlineMode={inlineMode}
      $inlineCollapsed={inlineCollapsed}
      $selected={isSelected}
      $horizontalMode={horizontalMode}
      $isOpen={isOpen}
    >
      {inlineMenu}
      {verticalOrInlineCollapseMenu}
    </StyledSubMenu>
  );
});

SubMenu.displayName = 'SubMenu';

export default SubMenu;
