import styled, { css } from 'styled-components';

export const StyledCardWrapper = styled.div`
  box-sizing: border-box;
  ${props => {
    const { colors, shadows } = props.theme;
    const token = props.theme.components.PopoverCard.card;
    return css`
      background: ${colors.pattern.background.higher};
      box-shadow: ${shadows.pattern.popper.normal};
      padding: ${token.paddingVertical}px ${token.paddingHorizontal}px;
      border-radius: ${token.borderRadius};
    `;
  }}
`;

export const StyledTitleWrapper = styled.div`
  margin-bottom: ${props => props.theme.components.PopoverCard.title.marginBottom}px;
`;

export const StyledActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  ${props => {
    const token = props.theme.components.PopoverCard.actions;
    return css`
      margin-top: ${token.marginTop}px;
      & > * + * {
        margin-left: ${token.marginLeft}px;
      }
    `;
  }}
`;
