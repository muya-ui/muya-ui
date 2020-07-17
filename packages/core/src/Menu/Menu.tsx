import { useForkRef } from '@muya-ui/utils';

import { omit } from 'lodash';

import React, { Ref, useMemo, useRef } from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';

import MenuContext from './MenuContext';
import { allMenuProp, rootMenuKey } from './const';
import { StyledMenu, StyledMenuScrollWrapper, StyledMenuWrapper } from './styled';
import { IMenuProps } from './types';
import { useMenu } from './useMenu';
import { useMenuBase } from './useMenuBase';

const defaultStyles = {
  wrapper: '',
  menu: '',
  menuScrollWrapper: '',
};

const Menu = memoForwardRef((props: IMenuProps, ref: Ref<HTMLDivElement>) => {
  const { width, height, children, onScroll, styles, style, className, noSpacing, onClick } = props;
  const theme = useTheme();
  const rootMenuRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(rootMenuRef, ref);
  const contextValue = useMenu(props, rootMenuRef);
  const {
    inlineMode,
    verticalMode,
    horizontalMode,
    size,
    mode,
    inlineCollapsed,
    rootMenuScrollable,
    hideRootMenuSpacing,
    maxItemCountPerPage,
    autoItemCountPerPage,
    handleItemSelect,
    handleItemDeselect,
    handleMenuScrollRef,
  } = contextValue;
  const { elements, renderMenuWidget } = useMenuBase({
    mode,
    level: 1,
    eventKey: rootMenuKey,
    parentIsRootMenu: true,
    parentMenuOpen: true,
    hasScrollBar: rootMenuScrollable,
    menuHasIcon: false,
    children,
    onItemSelect: handleItemSelect,
    onItemDeselect: handleItemDeselect,
    onClick,
  });
  const menuStyles = useMemo(() => {
    if (styles) {
      const { wrapper, menu, menuScrollWrapper } = styles;
      return { wrapper, menu, menuScrollWrapper };
    }
  }, [styles]);
  const innerStyles = useStyles('menu', defaultStyles, menuStyles);
  const domProps = omit(props, allMenuProp);

  return (
    <MenuContext.Provider value={contextValue}>
      <StyledMenuWrapper
        {...domProps}
        ref={handleRef}
        theme={theme}
        $width={width}
        $height={height}
        $inlineMode={inlineMode}
        $verticalMode={verticalMode}
        $inlineCollapsed={inlineCollapsed!}
        className={[innerStyles.wrapper.className, className].join(' ').trim()}
        style={{ ...innerStyles.wrapper.style, ...style }}
        onScroll={onScroll}
      >
        <StyledMenu
          theme={theme}
          $size={size}
          $inlineMode={inlineMode}
          $horizontalMode={horizontalMode}
          $inlineCollapsed={inlineCollapsed}
          $sub={false}
          $hideRootMenuSpacing={hideRootMenuSpacing}
          $noSpacing={noSpacing}
          $hasScrollBar={rootMenuScrollable}
          $maxItemCountPerPage={maxItemCountPerPage}
          $autoItemCountPerPage={autoItemCountPerPage}
          {...innerStyles.menu}
        >
          <StyledMenuScrollWrapper ref={handleMenuScrollRef} {...innerStyles.menuScrollWrapper}>
            {elements.map(renderMenuWidget)}
          </StyledMenuScrollWrapper>
        </StyledMenu>
      </StyledMenuWrapper>
    </MenuContext.Provider>
  );
});

export default Menu;
