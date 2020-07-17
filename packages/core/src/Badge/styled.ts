import styled, { css } from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { IThemedBaseProps } from '../types';

export interface IStyledBadgeProps extends IThemedBaseProps {
  $detached: boolean;
  $isStroke: boolean;
  $value?: number | string;
  $showZero: boolean;
  $dot: boolean;
  $size: IComponentSizeSpec;
  $color?: string;
}

const badgePositionCSS = (props: IStyledBadgeProps) => {
  const { theme, $detached, $value, $showZero, $dot } = props;
  const {
    Badge: { offset, zIndex },
  } = theme.components;
  const visible = $value || $showZero || $dot;
  const scaleCSS = `scale(${visible ? 1 : 0})`;
  let positionCSS;
  if ($detached) {
    positionCSS = `
      top: 50%;
      left: 100%;
      transform: translate(${offset}px, -50%) ${scaleCSS};
    `;
  } else {
    positionCSS = `
      top: 0;
      right: 0;
      transform: translate(50%, -50%) ${scaleCSS};
    `;
  }

  return css`
    position: absolute;
    ${positionCSS}
    z-index: ${zIndex};
  `;
};

const badgeCoreCSS = (props: IStyledBadgeProps) => {
  const { theme, $size, $dot, $isStroke, $color } = props;
  const {
    components: { Badge: token },
    transition: {
      pattern: { duration, easing },
    },
  } = theme;

  let height;
  let padding;
  if ($dot) {
    height = token.height.dot[$size!];
    padding = 0;
  } else {
    height = token.height.text[$size!];
    padding = token.padding[$size!];
  }

  const fontSize = token.fontSize[$size!];
  const { borderColor } = token;
  const lineHeight = $isStroke ? height - 2 : height;
  const color = $isStroke ? token.borderColor : token.color;
  const backgroundColor = $color || token.backgroundColor[$isStroke ? 'stroke' : 'fill'];

  return css`
    display: inline-block;
    height: ${height}px;
    line-height: ${lineHeight}px;
    text-align: center;
    padding: 0 ${padding}px;
    color: ${color};
    font-size: ${fontSize}px;
    background-color: ${backgroundColor};
    border: ${$isStroke ? `1px solid ${borderColor}` : 'none'};
    border-radius: ${height / 2}px;
    white-space: nowrap;
    transform-origin: center center;
    transition: all ${duration.status}ms ${easing.status};
    ${$dot && `width: ${height}px`};
  `;
};

export const StyledBadge = styled.span`
  ${badgePositionCSS}
  ${badgeCoreCSS}
`;

export const StyledIndependentBadge = styled.span`
  ${badgeCoreCSS}
`;

// used for mock font-size less than 12px in chrome
export const StyledBadgeInnerText = styled.span`
  display: inline-block;
  font-style: normal;
  vertical-align: top;
  transform-origin: center center;
`;

export const StyledBadgeContainer = styled.span`
  display: inline-block;
  position: relative;
`;
