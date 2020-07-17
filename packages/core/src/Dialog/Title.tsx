import React from 'react';
import styled, { css } from 'styled-components';

import { CloseIcon } from '@muya-ui/theme-light';

import IconButton from '../IconButton';
import { IThemedBaseProps } from '../types';
import Typography from '../Typography';
import { StyledTitle } from '../Typography/Title';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { IDialogTitleProps } from './types';

const StyledDialogTitle = styled.div<IThemedBaseProps & IDialogTitleProps>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 auto;
  ${props => {
    const token = props.theme.components.Dialog.title;
    return css`
      border-bottom: ${token.borderBottom};
      padding: ${token.paddingVertical}px ${token.paddingHorizontal}px;
      ${props.fullWidth && `padding: ${token.fullWidthPadding}`};
    `;
  }}
  ${StyledTitle} {
    margin-bottom: 0;
  }
`;

const StyledIconWrapper = styled(IconButton)`
  && {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${props => props.theme.components.Dialog.title.paddingHorizontal}px;
    padding: 0;
  }
`;

export default memoForwardRef<HTMLDivElement, IDialogTitleProps>((props, ref) => {
  const theme = useTheme();
  const titleToken = theme.components.Dialog.title;
  const Close = titleToken.closeIcon || CloseIcon;
  const {
    children,
    onClose,
    hideClose,
    disableTypography,
    closeIcon,
    closeButtonSize,
    level = titleToken.defaultTitleLevel,
    ...other
  } = props;

  return (
    <StyledDialogTitle ref={ref} theme={theme} {...other}>
      {disableTypography ? children : <Typography.Title level={level}>{children}</Typography.Title>}
      {!hideClose && (
        <StyledIconWrapper size={closeButtonSize} theme={theme} onClick={onClose}>
          {closeIcon || <Close />}
        </StyledIconWrapper>
      )}
    </StyledDialogTitle>
  );
});
