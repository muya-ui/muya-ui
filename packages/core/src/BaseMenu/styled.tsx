import styled, { css } from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import ellipsisStyle from '../styled/mixins/ellipsis';
import { itemDisabledStyle, itemNormalStyle, itemSelectedStyle } from '../styled/mixins/item';
import { scrollBarStyle } from '../ScrollView/styled';
import { IThemedBaseProps } from '../types';

export interface IStyledBaseMenuProps extends IThemedBaseProps {
  $size?: IComponentSizeSpec;
  $width?: number;
  $maxItemCountPerPage?: number;
  $hasScrollBar: boolean;
}

export interface IStyledMenuItemProps extends IThemedBaseProps {
  $size?: IComponentSizeSpec;
  $active: boolean;
  $disabled: boolean;
  $selected: boolean;
}

export const menuItemCss = (props: IStyledMenuItemProps) => {
  const {
    $size,
    $active,
    $selected,
    $disabled,
    theme: {
      transition: {
        pattern: { duration, easing },
      },
    },
  } = props;
  const token = props.theme.components.BaseMenu.item;
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 0 ${token.paddingHorizontal}px;
    font-size: ${token.fontSize[$size!]}px;
    line-height: ${token.height[$size!]}px;
    height: ${token.height[$size!]}px;
    cursor: pointer;
    transition: background-color ${duration.status}ms ${easing.status},
      color ${duration.status}ms ${easing.status};
    ${itemNormalStyle(token)}
    span {
      ${ellipsisStyle}
    }

    ${$active &&
      css`
        color: ${token.color.hover};
        background-color: ${token.background.hover};
        &:hover {
          color: ${token.color.hover};
          background-color: ${token.background.hover};
        }
        &:active {
          color: ${token.color.hover};
          background-color: ${token.background.hover};
        }
      `}
    ${$selected && itemSelectedStyle(token)}
    ${$disabled && itemDisabledStyle(token)}
  `;
};

export const StyledBaseMenuItem = styled.div`
  ${menuItemCss};
`;

export const StyledBaseMenuItemGroupLabel = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: default;
`;

export const StyledBaseMenuItemGroup = styled.div``;

export const StyledBaseMenuItemDivider = styled.div`
  height: 1px;
`;

export const StyledBaseMenuWrapper = styled.div`
  overflow-y: auto;
`;
export const baseMenuCss = (props: IStyledBaseMenuProps) => {
  const {
    $size,
    $width,
    $hasScrollBar,
    $maxItemCountPerPage,
    theme: { colors, shadows },
  } = props;
  const token = props.theme.components.BaseMenu;
  const {
    wrapper: wrapperToken,
    item: itemToken,
    divider: dividerToken,
    group: groupToken,
  } = token;
  return css`
    box-shadow: ${shadows.pattern.popper.normal};
    background: ${colors.pattern.background.higher};
    border-radius: ${wrapperToken.borderRadius};
    padding: ${wrapperToken.paddingVertical}px 0;
    overflow: hidden;
    ${$width && `width: ${$width}px`};
    ${$hasScrollBar && `padding-right: ${wrapperToken.paddingRight}px`};

    ${StyledBaseMenuWrapper} {
      ${$maxItemCountPerPage && `max-height: ${$maxItemCountPerPage * itemToken.height[$size!]}px`};
      ${$hasScrollBar &&
        css`
          padding-right: ${wrapperToken.innerPaddingRight}px;
          ${scrollBarStyle(props)};
        `}
    }

    ${StyledBaseMenuItemDivider} {
      background: ${colors.pattern.background.divider};
      margin: ${dividerToken.paddingVertical}px ${$hasScrollBar ? 0 : dividerToken.paddingRight}px
        ${dividerToken.paddingVertical}px ${dividerToken.paddingLeft[$size!]}px;
    }

    ${StyledBaseMenuItemGroup} {
      ${StyledBaseMenuItem} {
        padding-left: ${groupToken.paddingLeft[$size!] + groupToken.itemIndent}px;
      }
    }

    ${StyledBaseMenuItemGroupLabel} {
      font-size: ${groupToken.fontSize}px;
      line-height: ${groupToken.height}px;
      height: ${groupToken.height}px;
      background: ${groupToken.background};
      color: ${groupToken.color};
      padding-left: ${groupToken.paddingLeft[$size!]}px;
    }
  `;
};

export const StyledBaseMenu = styled.div`
  ${baseMenuCss};
`;
