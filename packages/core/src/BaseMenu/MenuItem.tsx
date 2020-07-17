import React, { cloneElement, Ref, useMemo, useEffect, useRef } from 'react';
import { isElement } from 'react-is';

import { SelectIcon } from '@muya-ui/theme-light';

import Spin from '../Spin';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { StyledBaseMenuItem } from './styled';
import { IBaseMenuItemProps } from './types';
import scrollIntoView from '../utils/scrollIntoView';
import { useForkRef } from '@muya-ui/utils';

const MenuItem = memoForwardRef((props: IBaseMenuItemProps, ref: Ref<HTMLDivElement>) => {
  const {
    size = 'm',
    children,
    selected = false,
    disabled = false,
    active = false,
    loading = false,
    loadingIcon,
    selectedIcon,
    ...restProps
  } = props;
  const theme = useTheme();
  const itemRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, itemRef);
  const {
    components: { BaseMenu: token },
  } = theme;

  let suffixIconNode;
  let SuffixIcon;
  if (loading) {
    suffixIconNode = loadingIcon || (
      <Spin
        style={{
          flexShrink: 0,
          marginLeft: token.iconMarginLeft,
          color: token.iconColor,
        }}
      />
    );
  } else if (selected) {
    SuffixIcon = token.selectedIcon || SelectIcon;
    suffixIconNode = selectedIcon || (
      <SuffixIcon
        style={{
          flexShrink: 0,
          marginLeft: token.iconMarginLeft,
          color: token.iconColor,
        }}
      />
    );
  }

  const finalChildren = useMemo(
    () =>
      isElement(children) ? (
        cloneElement(children, {
          size,
          theme,
        })
      ) : (
        <span>{children}</span>
      ),
    [children, size, theme],
  );

  useEffect(() => {
    if (active && itemRef.current) {
      scrollIntoView(itemRef.current, {
        onlyFirstScrollableParent: true,
        behavior: 'auto',
        isScrollable: (element: HTMLElement) => getComputedStyle(element).overflowY === 'auto',
        align: {
          top: 0.5,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <StyledBaseMenuItem
      ref={handleRef}
      theme={theme}
      $size={size}
      $active={active}
      $selected={selected}
      $disabled={disabled}
      {...restProps}
    >
      {finalChildren}
      {suffixIconNode}
    </StyledBaseMenuItem>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
