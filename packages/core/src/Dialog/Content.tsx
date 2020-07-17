import React from 'react';
import styled, { css } from 'styled-components';

import { ClearIcon, InformIcon, ReminderIcon, SuccessIcon } from '@muya-ui/theme-light';

import { IThemedBaseProps } from '../types';
import Typography from '../Typography';
import useTheme from '../utils/useTheme';
import { IDialogContentProps, IDialogContentType } from './types';
import memoForwardRef from '../utils/memoForwardRef';

interface IStyledDialogContentProps extends IThemedBaseProps {
  $hideDividers?: boolean;
  $type?: IDialogContentType;
  $fullWidth?: boolean;
}

function makeContentStyle(props: IStyledDialogContentProps) {
  const {
    components: { Dialog: token },
  } = props.theme;
  let borderStyle;
  let paddingStyle = css`
    padding: ${token.content.padding} ${token.content.paddingHorizontal};
  `;

  if (!props.$hideDividers) {
    borderStyle = css`
      border-bottom: 1px solid ${token.content.borderColor};
    `;
  }

  if (props.$type) {
    paddingStyle = css`
      padding: ${token.content.paddingWithType};
    `;
  }

  if (props.$fullWidth) {
    paddingStyle = css`
      padding: ${token.content.padding} ${token.content.fullWidthPaddingHorizontal};
    `;
  }

  return css`
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    ${borderStyle}
    ${paddingStyle}
  `;
}

const StyledDialogContent = styled.div<IStyledDialogContentProps>`
  ${makeContentStyle}
`;

const StyledContentTitleWrapper = styled(Typography.Title)`
  position: relative;
  margin-bottom: ${props => props.theme.components.Dialog.content.titleMarginBottom}px;
`;

const StyledIconWrapper = styled.span<IStyledDialogContentProps>`
  position: absolute;
  top: ${props => props.theme.components.Dialog.content.iconMarginTop}px;
  left: -${props => props.theme.components.Dialog.content.iconMarginLeft}px;
  transform: translateX(-100%);
  color: ${props => props.$type && props.theme.colors.pattern.feature[props.$type]};
`;

export default memoForwardRef<HTMLDivElement, IDialogContentProps>((props, ref) => {
  const { children, hideDividers, title, text, type, icon, fullWidth, size, ...other } = props;
  const theme = useTheme();

  if (!type) {
    return (
      <StyledDialogContent
        ref={ref}
        theme={theme}
        $hideDividers={hideDividers}
        $type={type}
        $fullWidth={fullWidth!}
        {...other}
      >
        {children}
      </StyledDialogContent>
    );
  }
  const typeIcon = {
    success: SuccessIcon,
    info: InformIcon,
    warning: ReminderIcon,
    error: ClearIcon,
    ...theme.components.Dialog.content.typeIcon,
  };
  const { typeIconBgColor, defaultTitleLevel } = theme.components.Dialog.content;
  const Icon = typeIcon[type];
  const iconBgColor = typeIconBgColor[type];
  return (
    <StyledDialogContent
      ref={ref}
      theme={theme}
      $type={type}
      $fullWidth={fullWidth!}
      $hideDividers
      {...other}
    >
      <StyledContentTitleWrapper theme={theme} level={defaultTitleLevel}>
        <StyledIconWrapper theme={theme} $type={type}>
          {icon || <Icon bgColor={iconBgColor} />}
        </StyledIconWrapper>
        {title}
      </StyledContentTitleWrapper>
      <Typography.Paragraph as="div" fontSize="s2" color="assistant">
        {text}
      </Typography.Paragraph>
    </StyledDialogContent>
  );
});
