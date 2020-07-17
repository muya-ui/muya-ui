import React from 'react';
import Tour from 'reactour';
import styled, { createGlobalStyle, css } from 'styled-components';

import { InlineButton } from '../Button';
import { IThemedBaseProps } from '../types';
import { StyledTitle } from '../Typography/Title';
import { IGuideStepPosition } from './types';

interface IStyledProps extends IThemedBaseProps {
  $placement?: IGuideStepPosition;
  $tooltipsClassName?: string;
}

export const CloseIconWrapper = styled(InlineButton)`
  ${(props: IThemedBaseProps) => {
    const { top, right, color } = props.theme.components.Guide.closeIcon;
    return css`
      position: absolute;
      right: ${right}px;
      top: ${top}px;
      color: ${color};
    `;
  }}
`;

export const ToolTipsContent = styled.div`
  ${(props: IThemedBaseProps) => {
    const { padding, minWidth } = props.theme.components.Guide.toolTips;
    return css`
      position: relative;
      padding: ${padding};
      min-width: ${minWidth}px;
      ${StyledTitle} {
        margin-bottom: 0;
      }
    `;
  }}
`;

export const ButtonWrapper = styled.div`
  ${(props: IThemedBaseProps) => {
    return css`
      margin-top: ${props.theme.components.Guide.nextButton.marginTop}px;
      display: flex;
      flex-direction: row-reverse;
    `;
  }}
`;

export const GlobalStyle = createGlobalStyle`
  /*
    这么写是为了防止 styled-components 产生相同的ID，
    详见：https://github.com/styled-components/styled-components/issues/3097
  */
  #___reactour {
    & > div:first-child {
      opacity: ${props => props.theme.components.Guide.mask.opacity};
      color: ${props => props.theme.components.Guide.mask.color};
    }
  }
`;

function getSpaceByPlacementOnTop(props: IStyledProps) {
  const { space } = props.theme.components.Guide.toolTips;
  if (props.$placement === 'top') {
    return -space;
  }
  return space;
}
/*
  这么写是为了防止 styled-components 产生相同的ID，
  详见：https://github.com/styled-components/styled-components/issues/3097
*/
const ToolTipsArrowOnTopStyle = createGlobalStyle`
  /* 箭头在上的样式 */
  .${(props: IStyledProps) => props.$tooltipsClassName} {
    top: ${getSpaceByPlacementOnTop}px !important;
  }
`;
function getSpaceByPlacementOnLeft(props: IStyledProps) {
  const { space } = props.theme.components.Guide.toolTips;
  if (props.$placement === 'left') {
    return -space;
  }
  return space;
}
const ToolTipsArrowOnLeftStyle = createGlobalStyle`
  /* 箭头在左的样式 */
  .${(props: IStyledProps) => props.$tooltipsClassName} {
    left: ${getSpaceByPlacementOnLeft}px !important;
  }
`;

export const TooltipsArrowStyle = (props: IStyledProps) => {
  if (props.$placement === 'left' || props.$placement === 'right') {
    return <ToolTipsArrowOnLeftStyle {...props} />;
  }
  return <ToolTipsArrowOnTopStyle {...props} />;
}

export const TourWrapper = styled(Tour)`
  ${(props: IThemedBaseProps) => {
    const { borderRadius, boxShadow } = props.theme.components.Guide.toolTips;
    return css`
      padding: 0;
      border-radius: ${borderRadius}px;
      box-shadow: ${boxShadow};
    `;
  }}
`;

export const SkipWrapper = styled.div`
  ${(props: IThemedBaseProps) => {
    return css`
      position: absolute;
      left: 0;
      right: 0;
      bottom: ${props.theme.components.Guide.skip.bottom}px;
      margin: 0 auto;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    `;
  }}
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const StyledIcon = styled.span`
  ${(props: IThemedBaseProps) => {
    const { marginRight, color } = props.theme.components.Guide.informIcon;
    return css`
      margin-right: ${marginRight}px;
      color: ${color};
    `;
  }}
`;

export const TitleWrapper = styled.div``;
