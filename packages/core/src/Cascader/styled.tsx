import React from 'react';
import styled, { css } from 'styled-components';

import { IFontSizeSpec } from '@muya-ui/theme-light';

import { StyledCheckboxLabel } from '../Checkbox/styled';
import { itemDisabledStyle, itemNormalStyle, itemSelectedStyle } from '../styled/mixins/item';
import listResetStyle from '../styled/mixins/listReset';
import { scrollBarStyle } from '../ScrollView/styled';
import { ISizeSpecBaseProps, IThemedBaseProps } from '../types';

/**
 * styled components props
 */
export interface IStyledCascaderMenuProps extends IThemedBaseProps, ISizeSpecBaseProps {
  /**
   * 配置的菜单宽度
   */
  menuWidth?: number;
}

export interface IStyledCascaderMenuItemProps extends IThemedBaseProps, ISizeSpecBaseProps {
  $disabled: boolean;
  $selected: boolean;
  $multiple: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export interface IStyledCascaderMenuItemWrapperProps extends IThemedBaseProps {
  /**
   * 菜单是否反向
   */
  menuReverse: boolean;
}

export interface IStyledCascaderMenuBorderBoxProps extends IThemedBaseProps {
  /**
   * 是否有滚动条
   */
  hasScrollBar: boolean;
  /**
   * 菜单是否反向
   */
  menuReverse: boolean;
}

const menuItemCss = (props: IStyledCascaderMenuItemProps) => {
  const {
    size,
    $selected,
    $disabled,
    $multiple,
    theme: {
      typography: {
        spec: { fontSize },
      },
      transition: {
        pattern: { duration, easing },
      },
    },
  } = props;
  const token = props.theme.components.Cascader.item;
  const fontLevel = token.fontLevel[size!] as IFontSizeSpec;
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    font-size: ${fontSize[fontLevel]}px;
    line-height: 1;
    height: ${token.height[size!]}px;
    cursor: pointer;
    transition: background-color ${duration.status}ms ${easing.status},
      color ${duration.status}ms ${easing.status};
    ${itemNormalStyle(token)}
    ${$selected && !$multiple && itemSelectedStyle(token)}
    ${$selected &&
      $multiple &&
      css`
        font-weight: ${token.multipleSelectFontWeight};
      `}
    ${$disabled && itemDisabledStyle(token)}

    ${StyledCheckboxLabel} {
      margin-right: ${token.checkboxMarginRight}px;
    }
  `;
};

export const StyledCascaderMenuItem = styled.li`
  ${listResetStyle};
  ${menuItemCss};
`;

export const StyledCascaderMenuItemContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

/**
 * menu
 */
const menuCss = (props: IStyledCascaderMenuProps) => {
  const { size, menuWidth, theme } = props;
  const {
    components: { Cascader: token },
  } = theme;
  return css`
    position: relative;
    max-height: ${token.maxHeight[size!]}px;
    margin: ${token.menuMarginVertical}px 0;
    background: ${token.background};
    overflow-y: auto;
    overflow-x: hidden;
    ${menuWidth ? `width: ${menuWidth}px` : 'min-width: 111px'};
    ${scrollBarStyle({ theme })};
  `;
};

export const StyledCascaderMenu = styled.ul<IStyledCascaderMenuProps>`
  ${listResetStyle};
  ${menuCss};
`;

// 滚动条和菜单反向的样式
const menuReverseCss = css`
  border-left: 1px solid ${props => props.theme.colors.pattern.border.normal};
  &:last-child {
    border-left: none;
  }
`;

const menuNoReverseCss = css`
  border-right: 1px solid ${props => props.theme.colors.pattern.border.normal};
  &:last-child {
    border-right: none;
  }
`;

const menuBoxCss = (props: IStyledCascaderMenuBorderBoxProps) => {
  const {
    hasScrollBar,
    menuReverse,
    theme: {
      components: { Cascader: token },
    },
  } = props;
  let scrollBarCss;
  if (hasScrollBar) {
    scrollBarCss = css`
      ${StyledCascaderMenu} {
        margin-right: ${token.menuMarginRight - 1}px;
      }
      ${StyledCascaderMenuItem} {
        padding-left: ${token.item.paddingHorizontal}px;
        margin-right: ${token.item.marginRight}px;
      }

      ${menuReverse
        ? css`
            &:first-child {
              ${StyledCascaderMenu} {
                margin-right: ${token.menuMarginRight}px;
              }
            }
          `
        : css`
            &:last-child {
              ${StyledCascaderMenu} {
                margin-right: ${token.menuMarginRight}px;
              }
            }
          `};
    `;
  } else {
    scrollBarCss = css`
      ${menuReverse
        ? css`
            ${StyledCascaderMenuItem} {
              padding-left: ${token.item.paddingHorizontal - 1}px;
              padding-right: ${token.item.paddingHorizontal}px;
            }
            &:last-child {
              ${StyledCascaderMenuItem} {
                padding-left: ${token.item.paddingHorizontal}px;
              }
            }
          `
        : css`
            ${StyledCascaderMenuItem} {
              padding-left: ${token.item.paddingHorizontal}px;
              padding-right: ${token.item.paddingHorizontal - 1}px;
            }
            &:last-child {
              ${StyledCascaderMenuItem} {
                padding-right: ${token.item.paddingHorizontal}px;
              }
            }
          `};
    `;
  }
  return css`
    background: ${token.background};
    &:first-child {
      border-top-left-radius: ${token.borderRadius};
      border-bottom-left-radius: ${token.borderRadius};
    }
    &:last-child {
      border-top-right-radius: ${token.borderRadius};
      border-bottom-right-radius: ${token.borderRadius};
    }

    ${menuReverse ? menuReverseCss : menuNoReverseCss}
    ${scrollBarCss}
  `;
};

export const StyledCascaderMenuBorderBox = styled.div`
  ${menuBoxCss};
`;

const menuWrapperCss = (props: IStyledCascaderMenuItemWrapperProps) => {
  const {
    menuReverse,
    theme: { shadows },
  } = props;
  return css`
    display: flex;
    flex-direction: ${menuReverse ? 'row-reverse' : 'row'};
    box-shadow: ${shadows.pattern.popper.normal};
  `;
};

export const StyledCascaderPanel = styled.div`
  ${listResetStyle};
  ${menuWrapperCss};
`;
