import styled, { css, keyframes } from 'styled-components';

import { IComponentSizeSpec, StyledSvg } from '@muya-ui/theme-light';

import Tooltip from '../Tooltip/Tooltip';
import ExpandWrapper from '../styled/components/ExpandWrapper';
import ellipsisStyle from '../styled/mixins/ellipsis';
import {
  IItemMixinToken,
  itemDisabledStyle,
  itemNormalStyle,
  itemSelectedStyle,
} from '../styled/mixins/item';
import { scrollBarStyle } from '../ScrollView/styled';
import { IThemedBaseProps } from '../types';
import addPx from '../utils/addPx';

/** styled component props */
export interface IStyledMenuWrapper extends IThemedBaseProps {
  $width?: number | string;
  $height?: number | string;
  $inlineMode: boolean;
  $verticalMode: boolean;
  $inlineCollapsed: boolean;
}

export interface IStyledMenuProps extends IThemedBaseProps {
  $size: IComponentSizeSpec;
  $inlineMode: boolean;
  $horizontalMode: boolean;
  $inlineCollapsed: boolean;
  $sub: boolean;
  $hideRootMenuSpacing: boolean;
  $noSpacing?: boolean;
  $maxItemCountPerPage?: number;
  $autoItemCountPerPage?: boolean;
  $hasScrollBar?: boolean;
}

export interface IStyledSubMenuProps extends IThemedBaseProps {
  $disabled: boolean;
  $menuHasIcon?: boolean;
  $level: number;
  $inlineMode: boolean;
  $inlineCollapsed: boolean;
  $selected: boolean;
  $horizontalMode: boolean;
  $isOpen: boolean;
}

export interface IStyledSubMenuTitleProps extends IThemedBaseProps {
  $selected: boolean;
}

export interface IStyledMenuItemGroupProps extends IThemedBaseProps {
  $level: number;
  $menuHasIcon?: boolean;
  $inlineMode: boolean;
  $inlineCollapsed: boolean;
}

export interface IStyledMenuItemProps extends IThemedBaseProps {
  $isSelected: boolean;
  $disabled: boolean;
  $menuHasIcon?: boolean;
  $level: number;
  $inlineMode: boolean;
  $horizontalMode: boolean;
  $inlineCollapsed: boolean;
}

export interface IItemStatusProps {
  $disabled: boolean;
  $selected: boolean;
  $itemToken: IItemMixinToken;
}

// expand 动画
export const expandedRotateKeyframes = keyframes`
  to {
    transform: rotate(270deg);
  }
`;

export const notExpandedRotateKeyframes = keyframes`
  to {
    transform: rotate(270deg);
  }
`;

const itemStatusStyle = (status: IItemStatusProps) => {
  const { $disabled, $selected, $itemToken } = status;
  return css`
    ${!$disabled && !$selected && itemNormalStyle($itemToken)}
    ${$selected && itemSelectedStyle($itemToken)}
    ${$disabled && itemDisabledStyle($itemToken)}
  `;
};

export const StyledMenuItemTooltip = styled(Tooltip)`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

// menu
/* stylelint-disable selector-type-case, selector-type-no-unknown */
const menuCss = (props: IStyledMenuProps) => {
  const {
    theme: {
      transition: {
        pattern: { easing, duration },
      },
      colors: { pattern: colorsPattern },
      shadows,
      typography: {
        spec: { fontSize, lineHeight },
      },
      components: { Menu: token },
    },
    $size,
    $inlineMode,
    $horizontalMode,
    $inlineCollapsed,
    $sub,
    $noSpacing,
    $hideRootMenuSpacing,
    $hasScrollBar,
    $maxItemCountPerPage,
    $autoItemCountPerPage,
  } = props;
  let modeStyle;
  let spacingStyle;
  if ($noSpacing || ((!$inlineMode || $inlineCollapsed) && ($sub || $hideRootMenuSpacing))) {
    spacingStyle = css`
      ${StyledMenuItem} ${StyledMenuItemContent},
      ${StyledSubMenuTitle},
      ${StyledMenuItemGroup} ${StyledMenuItemGroupLabel},
      ${StyledMenuItemGroup} ${StyledMenuItem} ${StyledMenuItemContent} {
        margin: 0;
        padding: 0 ${token.item.verticalPaddingHorizontal}px;
      }
    `;
  }
  /**
   * 1. 放在 dropdown 中的一级
   * 2. 弹出的子菜单
   */
  if ((!$inlineMode || $inlineCollapsed) && ($sub || $hideRootMenuSpacing)) {
    modeStyle = css`
      box-shadow: ${shadows.pattern.popper.normal};
      min-width: ${token.subMenu.verticalMinWidth}px;
      padding: ${token.subMenu.verticalPaddingVertical}px 0;
      background: ${colorsPattern.background.higher};
      border-radius: ${token.verticalBorderRadius};
      ${$hasScrollBar && `padding-right: ${token.subMenu.scrollBarPadding}px`};
      ${StyledMenuScrollWrapper} {
        ${
          $autoItemCountPerPage
            ? `max-height: calc(100vh - ${token.subMenu.preventOverflowPadding}px)`
            : `max-height: ${$maxItemCountPerPage! * token.verticalHeight[$size]}px`
        };
        ${$hasScrollBar &&
          css`
            padding-right: ${token.subMenu.scrollBarPadding}px;
            ${scrollBarStyle(props)};
          `}
      }

      ${StyledMenuItemGroup} ${StyledMenuItemGroupLabel} {
        height: ${token.group.verticalHeight}px;
        padding-top: ${token.group.verticalpaddingTop}px;
      }

      ${StyledMenuItem} ${StyledMenuItemContent},
      ${StyledSubMenuTitle} {
        height: ${token.verticalHeight[$size]}px;
        line-height: ${token.verticalHeight[$size]}px;
        font-size: ${fontSize[token.verticalFontLevel[$size]]}px;
      }

      ${StyledSvg} {
        font-size: ${fontSize[token.verticalIconFontLevel[$size]]}px;
      }
    `;
    /**
     * 水平的一级菜单
     */
  } else if ($horizontalMode && !$sub) {
    modeStyle = css`
      white-space: nowrap;
      border-bottom: 1px solid ${colorsPattern.border.normal};
      ${StyledMenuItem} ${StyledMenuItemContent},
      ${StyledSubMenuTitle},
      ${StyledMenuItemGroup} ${StyledMenuItemGroupLabel},
      ${StyledMenuItemGroup} ${StyledMenuItem} ${StyledMenuItemContent} {
        margin: 0;
        padding: 0 ${token.item.horizontalPaddingHorizontal}px;
      }
      ${StyledMenuScrollWrapper} {
        overflow-x: auto;
      }
    `;
  }
  return css`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    font-size: ${fontSize[token.fontLevel]}px;
    line-height: ${lineHeight[token.fontLevel]}px;
    font-variant: tabular-nums;
    font-feature-settings: 'tnum';
    padding: 0;
    color: ${colorsPattern.text.text};
    background: ${token.background};
    outline: none;
    transition: all ${duration.status}ms ${easing.status};
    zoom: 1;
    ${StyledSvg} {
      margin-right: ${token.iconMarginRight}px;
      font-size: ${fontSize[token.iconFontLevel]}px;
      color: ${token.iconColor};
      transition: color ${duration.status}ms ${easing.status};
    }

    ${modeStyle}
    ${spacingStyle}
    ${ExpandWrapper} ${StyledSvg} {
      margin-right: 0;
    }
  `;
};
/* stylelint-enable */

export const StyledMenu = styled.div`
  ${menuCss};
`;

export const StyledMenuScrollWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

const subMenuTitleCss = (props: IStyledSubMenuTitleProps) => {
  const {
    theme: {
      components: { Menu: token },
      typography: {
        spec: { fontSize },
      },
      transition: {
        pattern: { easing, duration },
      },
    },
    $selected,
  } = props;

  return css`
    position: relative;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    height: ${token.height}px;
    line-height: ${token.height}px;
    margin: ${token.item.marginVertical}px ${token.item.marginHorizontal}px;
    padding: 0 ${token.item.paddingHorizontal}px;
    font-size: ${fontSize[token.fontLevel]}px;
    transition: all ${duration.status}ms ${easing.status};
    cursor: pointer;
    ${StyledSubMenuTitleAndIconWrapper} {
      display: block;
      margin-right: ${token.iconMarginRight}px;
      ${ellipsisStyle};
    }

    ${$selected &&
      css`
        ${StyledSvg} {
          color: ${token.highlightIconColor};
        }
      `}
  `;
};

export const StyledSubMenuTitle = styled.div`
  ${subMenuTitleCss}
`;

export const StyledSubMenuTitleAndIconWrapper = styled.div``;

export const StyledSubMenuTitleWrapper = styled.div`
  ${ellipsisStyle};
`;

// submenu
const subMenuCss = (props: IStyledSubMenuProps) => {
  const {
    $disabled,
    $menuHasIcon,
    $level,
    $inlineMode,
    $horizontalMode,
    $inlineCollapsed,
    $selected,
    $isOpen,
    theme: {
      colors: { pattern: colorsPattern },
      typography: {
        spec: { lineHeight },
      },
      transition: {
        pattern: { easing, duration },
      },
      components: { Menu: token },
    },
  } = props;
  let $subMenuToken = token.subMenu;
  let disabledStyle;
  if ($disabled) {
    disabledStyle = css`
      color: ${colorsPattern.text.disabled};
      cursor: not-allowed;
      > a {
        color: ${colorsPattern.text.disabled};
        pointer-events: none;
      }
    `;
  }
  let indentStyle;
  if ($level > 1 && $inlineMode && !$inlineCollapsed) {
    indentStyle = css`
      padding-left: ${$menuHasIcon ? token.subMenu.indentWithIcon : token.subMenu.indent}px;
    `;
  }
  let inlineCollapsedStyle;
  if ($level === 1 && $inlineCollapsed) {
    inlineCollapsedStyle = css`
      ${StyledSubMenuTitleAndIconWrapper} {
        margin-right: 0;
      }
      ${StyledSvg} {
        margin-right: 0;
      }
    `;
  }
  let horizontalStyle;
  if ($horizontalMode && $level === 1) {
    $subMenuToken = {
      ...$subMenuToken,
      background: $subMenuToken.horizontalBackground,
      color: $subMenuToken.horizontalColor,
    };
    horizontalStyle = css`
      position: relative;
      top: 1px;
      display: inline-block;
      vertical-align: bottom;
      border-bottom: 2px solid transparent;
      margin-top: -1px;
      ${($selected || $isOpen) &&
        css`
          border-bottom: 2px solid ${colorsPattern.text.highlight};
        `}
      ${!$disabled &&
        css`
          &:hover {
            border-bottom: 2px solid ${colorsPattern.text.highlight};
          }
        `}
      & > ${StyledSubMenuTitleWrapper} {
        ${StyledSubMenuTitle} {
          align-items: flex-start;
          line-height: ${lineHeight[token.fontLevel]}px;
          ${!$disabled &&
            css`
              &:hover ${StyledSvg} {
                color: ${token.highlightIconColor};
                transition: color ${duration.status}ms ${easing.status};
              }
            `}
          ${$isOpen &&
            css`
              color: ${colorsPattern.text.highlight};
              ${StyledSvg} {
                color: ${token.highlightIconColor};
                transition: color ${duration.status}ms ${easing.status};
              }
            `}
        }
      }
    `;
  }
  return css`
    position: relative;
    transition: all ${duration.status}ms ${easing.status};
    & > ${StyledSubMenuTitleWrapper} {
      ${StyledSubMenuTitle} {
        ${itemStatusStyle({
          $disabled,
          $selected,
          $itemToken: $subMenuToken,
        })};
      }
    }

    ${indentStyle};
    ${disabledStyle};
    ${inlineCollapsedStyle};
    ${horizontalStyle};
  `;
};

export const StyledSubMenu = styled.div`
  ${subMenuCss}
`;

export const StyledMenuItemContent = styled.div``;

export const StyledMenuItemText = styled.span`
  opacity: 1;
`;

// menuitem
const menuItemCss = (props: IStyledMenuItemProps) => {
  const {
    $isSelected,
    $disabled,
    $menuHasIcon,
    $inlineMode,
    $horizontalMode,
    $inlineCollapsed,
    $level,
    theme: {
      transition: {
        pattern: { duration, easing },
      },
      colors: { pattern: colorsPattern },
      typography: {
        spec: { fontSize, lineHeight },
      },
      components: { Menu: token },
    },
  } = props;
  let $itemToken = token.item;
  let indentStyle;
  if ($level > 1 && $inlineMode && !$inlineCollapsed) {
    indentStyle = css`
      padding-left: ${$menuHasIcon ? $itemToken.indentWithIcon : $itemToken.indent}px;
    `;
  }
  let inlineCollapsedStyle;
  if ($level === 1 && $inlineCollapsed) {
    inlineCollapsedStyle = css`
      ${StyledSvg} {
        margin-right: 0;
      }
      ${StyledMenuItemText} {
        display: inline-block;
        max-width: 0;
        opacity: 0;
      }
    `;
  }
  let horizontalStyle;
  if ($level === 1 && $horizontalMode) {
    $itemToken = {
      ...$itemToken,
      background: $itemToken.horizontalBackground,
      color: $itemToken.horizontalColor,
    };
    horizontalStyle = css`
      position: relative;
      top: 1px;
      display: inline-block;
      vertical-align: bottom;
      border-bottom: 2px solid transparent;
      margin-top: -1px;
      ${$isSelected &&
        css`
          border-bottom: 2px solid ${colorsPattern.text.highlight};
        `}

      ${StyledMenuItemContent} {
        line-height: ${lineHeight[token.fontLevel]}px;
      }

      ${!$disabled &&
        css`
          &:hover {
            border-bottom: 2px solid ${colorsPattern.text.highlight};
          }
          ${StyledMenuItemContent} {
            &:hover ${StyledSvg} {
              color: ${token.highlightIconColor};
              transition: color ${duration.status}ms ${easing.status};
            }
          }
        `}
    `;
  }
  return css`
    position: relative;
    display: flex;
    ${StyledMenuItemContent} {
      box-sizing: border-box;
      flex: 1;
      height: ${token.height}px;
      line-height: ${token.height}px;
      margin: ${token.item.marginVertical}px ${token.item.marginHorizontal}px;
      padding: 0 ${token.item.paddingHorizontal}px;
      font-size: ${fontSize[token.fontLevel]}px;
      transition: all ${duration.status}ms ${easing.status};
      cursor: pointer;
      ${ellipsisStyle};
      ${indentStyle};
      ${inlineCollapsedStyle};
      ${$isSelected &&
        css`
          ${StyledSvg} {
            color: ${token.highlightIconColor};
          }
        `}
      ${itemStatusStyle({
        $disabled,
        $selected: $isSelected,
        $itemToken,
      })};
    }
    ${StyledMenuItemText} {
      transition: opacity ${duration.status}ms ${easing.status},
        width ${duration.status}ms ${easing.status};
      &:only-child a {
        display: block;
      }
    }

    ${horizontalStyle};
    a {
      color: inherit;
      text-decoration: none;
      ${ellipsisStyle};
      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: transparent;
        content: '';
      }
    }
  `;
};

export const StyledMenuItem = styled.div`
  ${menuItemCss};
`;

export const StyledMenuItemGroup = styled.div<IStyledMenuItemGroupProps>`
  ${props => {
    const {
      $menuHasIcon,
      $level,
      $inlineMode,
      $inlineCollapsed,
      theme: {
        typography: {
          spec: { fontSize, lineHeight },
        },
        components: { Menu: token },
      },
    } = props;
    const { group: groupToken } = token;
    let indentStyle;
    if ($level > 1 && $inlineMode && !$inlineCollapsed) {
      indentStyle = css`
        padding-left: ${$menuHasIcon ? groupToken.indentWithIcon : groupToken.indent}px;
      `;
    }
    return css`
      ${indentStyle};
      ${StyledMenuItemGroupLabel} {
        display: block;
        box-sizing: border-box;
        font-size: ${fontSize[groupToken.fontLevel]}px;
        line-height: ${lineHeight[groupToken.fontLevel]}px;
        height: ${groupToken.height}px;
        background: ${groupToken.background};
        color: ${groupToken.color};
        padding: ${groupToken.paddingTop}px ${groupToken.paddingHorizontal}px 0;
        ${ellipsisStyle};
      }
      & > ${StyledMenuItem} ${StyledMenuItemContent} {
        padding-left: ${groupToken.itemPaddingInGroup}px;
      }
    `;
  }}
`;

export const StyledMenuItemGroupLabel = styled.div`
  user-select: none;
`;

export const StyledMenuDivider = styled.div`
  height: 1px;
`;

export const StyledMenuWrapper = styled.div<IStyledMenuWrapper>`
  ${props => {
    const {
      $width,
      $height,
      $inlineMode,
      $verticalMode,
      $inlineCollapsed,
      theme: {
        colors,
        shadows,
        transition: {
          pattern: { easing, duration },
        },
        components: {
          Menu: { wrapper: wrapperToken, divider: dividerToken },
        },
      },
    } = props;
    return css`
      height: 100%;
      background: ${wrapperToken.background};
      border-radius: ${wrapperToken.borderRadius};
      padding: 0;
      overflow: auto;
      transition: all ${duration.status}ms ${easing.status};
      ${$inlineMode && `width: 100%`};
      ${$width && `width: ${addPx($width)}`};
      ${$height && `height: ${addPx($height)}`};
      ${$verticalMode && `box-shadow: ${shadows.pattern.popper.normal}`};
      ${$inlineCollapsed && `width: ${wrapperToken.inlineCollapsedWidth}px`};
      ${scrollBarStyle(props)}

      ${StyledMenuDivider} {
        background: ${colors.pattern.background.divider};
        margin: ${dividerToken.paddingVertical}px ${dividerToken.paddingHorizontal}px;
      }
    `;
  }}
`;
