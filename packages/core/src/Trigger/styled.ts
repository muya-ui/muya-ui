import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { ITriggerProps } from './types';

export type IMainPlacements = 'top' | 'right' | 'bottom' | 'left';
export type ISubPlacements = 'start' | 'end' | undefined;

export const defaultArrowWidth = 12;
export const defaultArrowHeight = 6;
export const defaultOffset = 6;
export const defaultArrowMargin = 16;

export function makeTriggerWrapperStyle(
  props: Pick<ITriggerProps, 'placement' | 'offset' | 'arrowStyle' | 'hideArrow'>,
) {
  const { placement = 'top', offset = defaultOffset, arrowStyle = {}, hideArrow } = props;
  const mainPlacement = placement.split('-')[0] as IMainPlacements;
  const arrowHeight = arrowStyle.height || defaultArrowHeight;

  const margin = hideArrow ? offset : offset + arrowHeight;

  const placementStyles: Record<IMainPlacements, FlattenSimpleInterpolation> = {
    top: css`
      margin-bottom: ${margin}px;
    `,
    right: css`
      margin-left: ${margin}px;
    `,
    bottom: css`
      margin-top: ${margin}px;
    `,
    left: css`
      margin-right: ${margin}px;
    `,
  };
  return css`
    position: relative;
    ${placementStyles[mainPlacement]}
  `;
}

export const StyledTriggerWrapper = styled.div`
  ${makeTriggerWrapperStyle}
`;
