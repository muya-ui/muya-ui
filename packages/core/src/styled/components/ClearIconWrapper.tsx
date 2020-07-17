import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../../types';
import { withThemeForStyled } from '../../utils/withTheme';

interface IClearIconWrapperProps extends IThemedBaseProps, HTMLAttributes<HTMLDivElement> {
  $fontSize: number;
}

const clearIconWrapperStyle = (props: IClearIconWrapperProps) => {
  const {
    theme: {
      colors: {
        pattern: { icon: iconPattern },
      },
    },
    $fontSize,
  } = props;
  return css`
    line-height: 0;
    font-size: ${$fontSize + 2}px;
    margin: 0 -1px;
    display: inline-flex;
    outline: none;
    cursor: pointer;
    pointer-events: auto;
    color: ${iconPattern.normal};
    &:hover {
      color: ${iconPattern.hover};
    }
    &:active {
      color: ${iconPattern.click};
    }
  `;
};

const ClearIconWrapper = styled.span`
  ${clearIconWrapperStyle}
`;

export default withThemeForStyled(ClearIconWrapper);
