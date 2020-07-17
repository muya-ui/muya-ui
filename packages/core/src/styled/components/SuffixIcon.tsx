import styled, { css } from 'styled-components';

export const StyledSuffixIcon = styled.span`
  ${props => {
    const { colors } = props.theme;
    return css`
      color: ${colors.pattern.icon.normal};
    `;
  }}
`;
