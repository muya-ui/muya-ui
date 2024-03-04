import React from 'react';
import styled, { css } from 'styled-components';

import BaseMenu from '../BaseMenu/index';
import { IThemedBaseProps } from '../types';

export const StyledMenuItemWithoutContent = styled(props => <BaseMenu.Item {...props} />)`
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
