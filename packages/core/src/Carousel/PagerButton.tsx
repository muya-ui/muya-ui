import React from 'react';
import styled, { css } from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import {
  colorUtils,
  GuildUpIcon,
  GuildDownIcon,
  GuildLeftIcon,
  GuildRightIcon,
} from '@muya-ui/theme-light';

import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { ICarouselPagerButtonProps } from './types';

const BaseNode = styled.button``;

const PagerButtonPure = memoForwardRef<HTMLButtonElement, ICarouselPagerButtonProps>(
  (props, ref) => {
    const {
      size,
      disabled,
      shape,
      transparent,
      arrow = 'left',
      side,
      icon,
      onClick,
      ...otherProps
    } = props;
    let iconNode = icon;
    const theme = useTheme();
    if (!iconNode) {
      const arrowIcon = {
        top: GuildUpIcon,
        bottom: GuildDownIcon,
        left: GuildLeftIcon,
        right: GuildRightIcon,
        ...theme.components.Carousel.PagerButton.arrowIcon,
      };
      const Icon = arrowIcon[arrow];
      iconNode = <Icon />;
    }
    const handleClick = useEventCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!disabled) {
          onClick && onClick(e);
        } else {
          e.preventDefault();
        }
      },
      [disabled],
    );

    return (
      <BaseNode {...otherProps} disabled={disabled} onClick={handleClick} ref={ref}>
        {iconNode}
      </BaseNode>
    );
  },
);

const PagerButton = styled(PagerButtonPure)<ICarouselPagerButtonProps>`
  /* 相对定位 */
  position: relative;

  /* flex + inline */
  display: inline-flex;

  /* 内部元素水平&垂直居中 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  outline: 0;
  margin: 0;
  border: none;
  font-family: inherit;
  text-transform: none;
  overflow: visible;
  box-sizing: border-box;
  appearance: button;
  ${props => {
    const {
      size = 'm',
      shape = 'rect',
      transparent,
      disabled,
      arrow = 'left',
      side,
      theme,
    } = props;
    const innerSide = side || arrow;
    const { opacity } = theme;
    const token = theme.components.Carousel.PagerButton;
    const width = token.width[size];
    const height = token.height[size];
    const iconSize = token.iconSize[size];
    let shapeCss;
    if (shape === 'rect') {
      const isH = arrow === 'left' || arrow === 'right';
      const innerWidth = isH ? width : height;
      const innerHeight = isH ? height : width;

      let sideCss;
      if (innerSide === 'left') {
        sideCss = css`
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        `;
      } else if (innerSide === 'right') {
        sideCss = css`
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        `;
      } else if (innerSide === 'top') {
        sideCss = css`
          border-top-right-radius: 0;
          border-top-left-radius: 0;
        `;
      } else {
        sideCss = css`
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        `;
      }
      shapeCss = css`
        width: ${innerWidth}px;
        height: ${innerHeight}px;
        border-radius: ${token.borderRadius};
        ${sideCss}
      `;
    } else {
      shapeCss = css`
        width: ${height}px;
        height: ${height}px;
        border-radius: 50%;
      `;
    }
    let statusCss;
    if (disabled) {
      const color = colorUtils.transparentize(opacity.pattern.disabled, token.iconColor);
      statusCss = css`
        color: ${color};
        cursor: not-allowed;
      `;
    } else if (transparent) {
      statusCss = css`
        color: ${token.iconColor};
      `;
    } else {
      const bgAHColor = colorUtils.transparentize(token.opacity, token.bgColor);
      statusCss = css`
        color: ${token.iconColor};
        &:hover,
        &:active {
          background-color: ${bgAHColor};
        }
      `;
    }
    let bgCss;
    if (!transparent) {
      const bgColor = colorUtils.transparentize(token.hoverOpacity, token.bgColor);
      bgCss = css`
        background-color: ${bgColor};
      `;
    } else {
      bgCss = css`
        background-color: transparent;
      `;
    }

    return css`
      font-size: ${iconSize}px;
      ${shapeCss}
      ${bgCss}
      ${statusCss}
    `;
  }}
`;

export default withThemeForStyled(PagerButton);
