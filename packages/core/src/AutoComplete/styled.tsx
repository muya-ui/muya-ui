import styled, { css } from 'styled-components';

import ellipsisStyle from '../styled/mixins/ellipsis';

export const StyledAutoCompleteInputWrapper = styled.span`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const StyledPirmaryField = styled.span`
  ${ellipsisStyle};
`;

export const StyledSecondaryField = styled.span`
  flex-shrink: 0;
  margin-left: 12px;
`;

export const StyledAutoCompleteItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${props => css`
    ${StyledSecondaryField} {
      color: ${props.theme.colors.pattern.text.assistant};
    }
  `};
`;
