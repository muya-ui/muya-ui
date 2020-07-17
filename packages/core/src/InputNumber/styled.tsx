import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';

import { IInputNumberArrowStatusProps } from './innerTypes';
import { IInputNumberBaseProps } from './types';

export interface IStyledArrowProps extends IInputNumberBaseProps, IThemedBaseProps {
  $arrowDisabled?: IInputNumberArrowStatusProps;
  $entered?: boolean;
  $hiddenArrow?: boolean;
  $iconSize?: number;
}

export const StyledArrowSuffixNodeWrapper = styled.div<IInputNumberBaseProps & IThemedBaseProps>`
  ${props => {
    const { theme } = props;
    const {
      components: { InputNumber: InputNumberToken },
    } = theme;
    return css`
      width: 20px;
      display: flex;
      flex-direction: column;
      border-left: ${InputNumberToken.arrowSuffixNodeWrapperBorder};
      text-align: center;
      height: 100%;
    `;
  }}
`;

export function styledArrowWrapper(props: IStyledArrowProps) {
  const { theme, size, $entered, $iconSize } = props;
  const { hover, normal } = theme.colors.pattern.icon;
  const {
    components: { InputNumber: InputNumberToken },
  } = theme;
  return css`
    color: ${normal};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${InputNumberToken.iconMargin};
    flex: ${!$entered ? 1 : 0};
    flex-basis: auto;
    width: 100%;
    &:hover {
      color: ${hover};
      height: 100%;
    }
    &:active {
      color: ${hover};
      height: 100%;
      background-color: ${InputNumberToken.arrowClickBgColor};
    }
    &:not(:last-child) {
      border-bottom: ${InputNumberToken.arrowSuffixNodeWrapperBorder};
    }
    & > svg {
      position: relative;
      width: ${!$iconSize ? InputNumberToken.arrowIconSize[size!] : $iconSize}px;
      height: ${!$iconSize ? InputNumberToken.arrowIconSize[size!] : $iconSize}px;
    }
  `;
}

export const StyledUpArrow = styled.div<IStyledArrowProps>`
  ${props => {
    const { $arrowDisabled, theme } = props;
    return css`
      ${styledArrowWrapper}
      ${$arrowDisabled!.up &&
        css`
          cursor: not-allowed;
          background-color: ${theme.colors.pattern.background.disabled};
        `}
    `;
  }}
`;

export const StyledDownArrow = styled.div<IStyledArrowProps>`
  ${props => {
    const { $arrowDisabled, theme } = props;
    return css`
      ${styledArrowWrapper}
      ${$arrowDisabled!.down &&
        css`
          cursor: not-allowed;
          background-color: ${theme.colors.pattern.background.disabled};
        `}
    `;
  }}
`;
