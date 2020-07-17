import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import { StyledTitle } from '../Typography/Title';
import { Icons } from './Result';
import { IResultIconType, IResultProps } from './types';

export interface IStyledResult extends IThemedBaseProps {
  $vertical?: boolean;
  $type?: Required<IResultProps>['type'];
  $iconSize?: number;
}

export const StyledResult = styled.div`
  ${(props: IStyledResult) => {
    const { $vertical } = props;
    if ($vertical) {
      return css`
        text-align: center;
      `;
    } else {
      return css`
        display: flex;
        justify-content: center;
      `;
    }
  }}
`;

export const StyledIcon = styled.div`
  ${(props: IStyledResult) => {
    const { theme, $vertical, $type, $iconSize } = props;
    const marginRight = $vertical ? 0 : theme.components.Result.iconMarginRight;
    if (Icons.includes($type!)) {
      return css`
        margin-right: ${marginRight}px;
        color: ${theme.colors.pattern.feature[$type! as IResultIconType]};
        height: ${$iconSize}px;
      `;
    } else {
      return css`
        margin-right: ${marginRight}px;
        height: ${$iconSize}px;
      `;
    }
  }}
`;

export const StyleTitle = styled.div`
  ${(props: IStyledResult) => {
    const { theme, $vertical, $iconSize } = props;
    const top = $vertical ? theme.components.Result.titleMarginTop : $iconSize! / 2 - 12;
    return css`
      margin-top: ${top}px;
      ${StyledTitle} {
        margin-bottom: 0;
      }
    `;
  }}
`;

export const StyleSubTitle = styled.div`
  ${(props: IStyledResult) => {
    const { theme } = props;
    return css`
      margin-top: ${theme.components.Result.subTitleMarginTop}px;
    `;
  }}
`;

export const StyleReason = styled.div`
  ${(props: IStyledResult) => {
    const { theme } = props;
    return css`
      margin-top: ${theme.components.Result.reasonMarginTop}px;
    `;
  }}
`;

export const StyleButton = styled.div`
  ${(props: IStyledResult) => {
    const { theme } = props;
    return css`
      margin-top: ${theme.components.Result.buttonMarginTop}px;
    `;
  }}
`;
