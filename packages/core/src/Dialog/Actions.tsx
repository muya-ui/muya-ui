import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import useTheme from '../utils/useTheme';
import { IDialogActionsProps } from './types';

const StyledDialogActions = styled.div<IDialogActionsProps>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 auto;
  justify-content: ${props => (props.tipAction ? 'space-between' : 'flex-end')};
  ${props => {
    if (props.fullWidth) {
      return css`
        padding: ${props.theme.components.Dialog.actions.fullWidthPadding};
      `;
    }
    return css`
      padding: ${props.theme.components.Dialog.actions.complexPadding};
    `;
  }}
`;

const StyledChildrenWrapper = styled.span`
  && > * + * {
    margin-left: ${props => props.theme.components.Dialog.actions.childrenSpacing}px;
  }
`;

export default forwardRef<HTMLDivElement, IDialogActionsProps>((props, ref) => {
  const { tipAction, children, ...other } = props;
  const theme = useTheme();
  const actions = tipAction ? (
    <>
      <span>{tipAction}</span>
      <StyledChildrenWrapper theme={theme}>{children}</StyledChildrenWrapper>
    </>
  ) : (
    <StyledChildrenWrapper theme={theme}>{children}</StyledChildrenWrapper>
  );

  return (
    <StyledDialogActions ref={ref} theme={theme} tipAction={tipAction} {...other}>
      {actions}
    </StyledDialogActions>
  );
});
