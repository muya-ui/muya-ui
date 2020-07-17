import styled, { css } from 'styled-components';

interface IStyledStickyProps {
  $height?: number | null;
  $fixed?: boolean;
  $offsetTop?: number;
  $transform?: number;
}

export const StyledContainer = styled.div<IStyledStickyProps>`
  ${props => {
    const { $height } = props;
    if ($height) {
      return css`
        height: ${$height}px;
      `;
    }
  }}
`;

export const StyledSticky = styled.div<IStyledStickyProps>`
  ${props => {
    if (props.$fixed) {
      return css`
        position: fixed;
        top: 0;
        z-index: 99;
      `;
    }
  }}
`;
