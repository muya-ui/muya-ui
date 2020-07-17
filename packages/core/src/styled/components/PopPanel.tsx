import styled, { css } from 'styled-components';

export const StyledPopPanel = styled.div`
  ${props => {
    const { shadows, size } = props.theme;
    return css`
      border-radius: ${size.spec.borderRadius.s1};
      box-shadow: ${shadows.pattern.popper.normal};
    `;
  }}
`;
