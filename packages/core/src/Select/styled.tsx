import styled, { css } from 'styled-components';

import BaseMenu from '../BaseMenu';
import { IThemedBaseProps } from '../types';

export const StyledMenuItemWithoutContent = styled(BaseMenu.Item)`
  ${(props: IThemedBaseProps) => css`
    && {
      color: ${props.theme.colors.pattern.text.placeholder};
      cursor: default;
      &:hover {
        color: ${props.theme.colors.pattern.text.placeholder};
        background: ${props.theme.colors.pattern.background.block};
      }
    }
  `}
`;

export const StyledNotFoundContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.theme.components.Select.notFoundPanelHeight}px;
`;
