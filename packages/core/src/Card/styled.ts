import styled, { css } from 'styled-components';
import { IThemedBaseProps } from '../types';
import { isValidProps } from '../utils/props';
import { Typography } from '../Typography';

interface IStyledProps {
  $padding?: string | number;
  $bordered?: boolean;
  $space?: number | string;
  $shadowed?: boolean;
  $hoverShadowed?: boolean;
}

export const StyledCard = styled.div`
  ${(props: IThemedBaseProps & IStyledProps) => {
    const { theme, $bordered, $shadowed, $hoverShadowed } = props;
    const { Card: cardToken } = theme.components;
    const border = $bordered ? cardToken.border : '';
    const shadow = $shadowed ? cardToken.boxShadow.normal : '';
    return css`
      position: relative;
      border-radius: ${cardToken.borderRadius}px;
      box-shadow: ${shadow};
      border: ${border};
      overflow: hidden;
      &:hover {
        box-shadow: ${$hoverShadowed ? cardToken.boxShadow.hover : ''};
      }
    `;
  }}
`;

export const StyledCardHeader = styled.div``;

export const StyledCardContent = styled.div`
  ${(props: IThemedBaseProps & IStyledProps) => {
    const { theme, $padding } = props;
    const { Card: cardToken } = theme.components;
    let padding = isValidProps($padding) && String($padding);
    return css`
      padding: ${padding ? padding : cardToken.content.padding};
    `;
  }}
`;

export const StyledCardActions = styled.div`
  ${(props: IThemedBaseProps & IStyledProps) => {
    const { theme, $padding, $bordered } = props;
    const { Card: cardToken } = theme.components;
    let padding = isValidProps($padding) && String($padding);
    return css`
      display: flex;
      padding: ${padding ? padding : cardToken.actions.padding};
      border-top: ${$bordered && cardToken.actions.topBorder};
    `;
  }}
`;

export const StyleCardExtra = styled.div`
  ${(props: IThemedBaseProps) => {
    const { theme } = props;
    const { Card: cardToken } = theme.components;
    return css`
      position: absolute;
      top: ${cardToken.extra.topPadding}px;
      right: ${cardToken.extra.rightPadding}px;
    `;
  }}
`;

export const StyleCardMeta = styled.div``;

export const StyleCardTitle = styled(Typography.Title)`
  ${(props: IThemedBaseProps & IStyledProps) => {
    const { $space } = props;
    return css`
      margin-bottom: ${$space}px;
    `;
  }}
`;

export const StyleCardCheckBox = styled.div`
  ${(props: IThemedBaseProps) => {
    const { theme } = props;
    const { Card: cardToken } = theme.components;
    return css`
      position: absolute;
      top: ${cardToken.checkbox.topPadding}px;
      right: ${cardToken.checkbox.rightPadding}px;
    `;
  }}
`;
