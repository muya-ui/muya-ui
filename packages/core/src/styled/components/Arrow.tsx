import styled, { css, CSSObject } from 'styled-components';
import { ITriggerProps } from '@muya-ui/core';

export type IMainPlacements = 'top' | 'right' | 'bottom' | 'left';
export type ISubPlacements = 'start' | 'end' | undefined;

export const defaultArrowWidth = 12;
export const defaultArrowHeight = 6;
export const defaultArrowMargin = 16;

export const StyledArrow = styled.div`
  ${makeArrowStyle}
`;

export function makeArrowStyle(props: Pick<ITriggerProps, 'placement' | 'offset' | 'arrowStyle'>) {
  const { placement = 'top', arrowStyle = {} } = props;
  const { width, color, height, margin, ...otherStyle } = arrowStyle;
  const mainPlacement = placement.split('-')[0] as IMainPlacements;
  const subPlacement = placement.split('-')[1] as ISubPlacements;
  const arrowColor = color || '#fff';
  const arrowWidth = width || defaultArrowWidth;
  const arrowHeight = height || defaultArrowHeight;
  const arrowMargin = margin || defaultArrowMargin;

  let arrowMarginStyle;
  let arrowSizeStyle;

  if (mainPlacement === 'bottom' || mainPlacement === 'top') {
    arrowSizeStyle = css`
      border-width: ${arrowHeight}px ${arrowWidth / 2}px;
    `;

    if (subPlacement === 'start') {
      // top-start or bottom-start 靠左
      arrowMarginStyle = css`
        left: ${arrowMargin}px;
      `;
    } else if (subPlacement === 'end') {
      // top-end or bottom-end 靠右
      arrowMarginStyle = css`
        right: ${arrowMargin}px;
      `;
    } else {
      // 第二个位置不传，默认相对于Trigger内容居中
      arrowMarginStyle = css`
        left: 50%;
        transform: translateX(-50%);
      `;
    }
  } else {
    arrowSizeStyle = css`
      border-width: ${arrowWidth / 2}px ${arrowHeight}px;
    `;

    if (subPlacement === 'start') {
      // left-start or right-start 靠左
      arrowMarginStyle = css`
        top: ${arrowMargin}px;
      `;
    } else if (subPlacement === 'end') {
      // left-end or right-end 靠右
      arrowMarginStyle = css`
        bottom: ${arrowMargin}px;
      `;
    } else {
      // 第二个位置不传，默认相对于Trigger内容居中
      arrowMarginStyle = css`
        top: 50%;
        transform: translateY(-50%);
      `;
    }
  }

  return css`
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    ${{
      [mainPlacement]: '100%',
      [`border-${mainPlacement}-color`]: arrowColor,
    }};
    ${arrowMarginStyle}
    ${arrowSizeStyle}
    ${otherStyle as CSSObject}
  `;
}
