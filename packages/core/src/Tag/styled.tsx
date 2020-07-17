/* stylelint-disable no-descending-specificity */
import { IComponentSizeSpec } from '@muya-ui/theme-light';

import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import ellipsisStyle from '../styled/mixins/ellipsis';

import { ICheckableTagProps, ITagProps } from './types';

export interface IStyledTagCloseIconProps extends IThemedBaseProps {
  $color?: string;
  $colorInverse?: boolean;
  $size: IComponentSizeSpec;
}

export const StyledTagText = styled.span``;

export const tagCss = (props: ITagProps & IThemedBaseProps) => {
  const {
    theme: {
      colors: { pattern: colorsPattern },
      opacity,
      transition: { pattern: transitionPattern },
      components: { Tag: token },
    },
  } = props;
  const {
    disabled = false,
    borderColor,
    bordered = token.defaultBordered,
    closable = false,
    shape = token.defaultShape,
    size = 'm',
    color,
    colorInverse = true,
    maxWidth,
    hoverable = true,
  } = props;
  const clickable = 'onClick' in props || 'onChange' in props;
  const fontSize = token.fontSize[size];
  const inverseColor = !!color && colorInverse;
  let borderStyle;
  let disabledStyle;
  let hoverStyle;
  if (bordered) {
    borderStyle = css`
      border: 1px solid ${borderColor || colorsPattern.border.normal};
    `;
  }
  if (disabled) {
    disabledStyle = css`
      opacity: ${opacity.pattern.disabled};
      cursor: default;
    `;
  } else if (hoverable) {
    hoverStyle = css`
      &:hover {
        color: ${inverseColor ? colorsPattern.text.inverse : token.color.hover};
        background-color: ${color || token.background.hover};
        opacity: ${inverseColor ? token.inverseHoverOpacity : 1};
      }
      a:hover {
        color: ${token.color.hover};
      }
    `;
  }

  return css`
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    max-width: ${maxWidth ? `${maxWidth}px` : 'none'};
    color: ${inverseColor ? colorsPattern.text.inverse : token.color.plain};
    background-color: ${color || token.background.plain};
    transition: all ${transitionPattern.duration.status}ms ${transitionPattern.easing.status};
    padding: 0 ${token.paddingHorizontal[shape!][size!]}px;
    margin-right: ${token.marginRight}px;
    font-size: ${fontSize}px;
    line-height: 1;
    height: ${token.height[size!]}px;
    white-space: nowrap;
    border-radius: ${token.borderRadius[shape!]};
    cursor: ${clickable ? 'pointer' : 'default'};
    vertical-align: middle;

    ${StyledTagText} {
      ${ellipsisStyle};
    }

    ${borderStyle};
    ${!closable && hoverStyle};
    ${disabledStyle};
  `;
};

const closeIconCss = (props: IStyledTagCloseIconProps) => {
  const {
    $size,
    $color,
    $colorInverse,
    theme: {
      colors: { pattern: colorsPattern },
      transition: { pattern: transitionPattern },
      components: { Tag: token },
    },
  } = props;
  const inverseColor = !!$color && $colorInverse;
  let colorCss = css`
    color: ${colorsPattern.icon.normal};
    &:hover {
      color: ${colorsPattern.icon.hover};
    }
    &:active {
      color: ${colorsPattern.icon.click};
    }
  `;
  if (inverseColor) {
    colorCss = css`
      color: ${colorsPattern.icon.inverse};
    `;
  }
  return css`
    margin-left: ${token.iconSpacing[$size!]}px;
    cursor: pointer;
    transition: all ${transitionPattern.duration.status}ms ${transitionPattern.easing.status};
    flex-shrink: 0;
    display: inline-flex;
    width: ${token.iconSize[$size!]}px;
    height: ${token.iconSize[$size!]}px;
    ${colorCss};
    svg {
      width: ${token.iconSize[$size!]}px;
      height: ${token.iconSize[$size!]}px;
    }
  `;
};

const checkedCss = (props: ICheckableTagProps & IThemedBaseProps) => {
  const {
    theme: {
      components: { Tag: token },
    },
  } = props;
  return css`
    color: ${token.color.checked};
    background-color: ${token.background.checked};
    &:hover {
      color: ${token.color.checked};
      background: ${token.background.checkedHover};
    }
    &:active {
      color: ${token.color.checked};
      background: ${token.background.checkedClicked};
    }
  `;
};

export const checkableTagCss = (props: ICheckableTagProps & IThemedBaseProps) => {
  const {
    theme: {
      components: { Tag: token },
    },
    checked,
  } = props;
  return css`
    color: ${token.color.plain};
    background-color: ${token.background.plain};
    &:hover {
      color: ${token.color.hover};
    }
    &:active {
      color: ${token.color.click};
    }

    ${checked && checkedCss};
  `;
};

export const StyledCloseIcon = styled.span`
  ${closeIconCss};
`;
