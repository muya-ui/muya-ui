import styled, { css } from 'styled-components';

import { IPopconfirmIconType } from '@muya-ui/theme-light';

import { InlineButton } from '../Button';
import { IThemedBaseProps } from '../types';

export interface IStyledIconWrapperProps extends IThemedBaseProps {
  $type?: IPopconfirmIconType;
}

function makeIconWrapperStyle(props: IStyledIconWrapperProps) {
  const {
    theme: {
      colors,
      components: { Popconfirm: token },
    },
    $type,
  } = props;
  const colorStyle =
    $type &&
    css`
      color: ${colors.pattern.feature[$type]};
    `;

  return css`
    position: absolute;
    right: 100%;
    top: 0;
    transform: translateX(${token.translateX}px);
    ${colorStyle}
  `;
}
export const StyledTitleWrapper = styled.div`
  position: relative;
`;

export const StyledIconWrapper = styled.span`
  ${makeIconWrapperStyle}
`;

export const StyledInlineButton = styled(InlineButton)`
  && {
    padding: 0;
  }
`;
