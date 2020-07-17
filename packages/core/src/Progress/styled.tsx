import styled, { css } from 'styled-components';

export interface IStyledProgressLineProps {
  $bgColor: string;
}

export const StyledProgressLine = styled.div<IStyledProgressLineProps>`
  ${props => css`
    width: 100%;
    height: ${props.theme.components.Progress.height}px;
    background: ${props.$bgColor};
    border-radius: ${props.theme.components.Progress.borderRadius};

    ${StyledProgressBg} {
      height: 100%;
      border-radius: ${props.theme.components.Progress.borderRadius};
    }
  `}
`;

export const StyledProgressBg = styled.div``;
