import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import { ISwitchProps } from './types';

export interface IStyledSwitchProps
  extends Pick<ISwitchProps, 'disabled' | 'checked' | 'loading' | 'size'>,
    IThemedBaseProps {}

export const StyledSwitchChildrenWrapper = styled.div`
  display: block;
`;

export const StyledLoadingIconWrapper = styled.span`
  z-index: 1;
  font-size: 12px;
  background: transparent;
`;

export const switchCss = (props: IStyledSwitchProps) => {
  const {
    size,
    theme: {
      colors: { pattern: colorsPattern },
      opacity: { pattern: opacityPattern },
      transition: {
        pattern: { duration, easing },
      },
      components: { Switch: token },
    },
    checked,
    disabled,
  } = props;
  const iconFontSize = token.height[size!] - 12;
  return css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: ${token.height[size!]}px;
    line-height: ${token.height[size!] - 4}px;
    min-width: ${token.minWidth[size!]}px;
    background-color: ${checked ? token.background.checked : token.background.unChecked};
    border-radius: 999rem;
    vertical-align: middle;
    border: 2px solid transparent;
    opacity: ${disabled ? opacityPattern.disabled : 1};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    user-select: none;
    transition: all ${duration.status}ms ${easing.status};
    outline: none;
    &:active {
      box-shadow: ${token.activeBoxShadow};
    }
    &::after,
    ${StyledLoadingIconWrapper} {
      position: absolute;
      top: 0;
      left: 0;
      width: ${token.height[size!] - 4}px;
      height: ${token.height[size!] - 4}px;
      background-color: ${token.circleBackground};
      border-radius: 50%;
      transition: all ${duration.status}ms ${easing.status};
      content: ' ';
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      ${checked &&
        css`
          left: 100%;
          transform: translateX(-100%);
        `}
    }

    ${StyledLoadingIconWrapper} {
      text-align: center;
      font-size: ${iconFontSize}px;
      ${iconFontSize < 12 &&
        css`
          /** 小于 12 像素的文字居中问题 */
          svg {
            vertical-align: unset;
          }
        `}
    }

    ${StyledSwitchChildrenWrapper} {
      margin-left: ${checked
        ? token.childrenMarginLeft.checked
        : token.childrenMarginLeft.unChecked}px;
      margin-right: ${checked
        ? token.childrenMarginRight.checked
        : token.childrenMarginRight.unChecked}px;
      color: ${colorsPattern.icon.inverse};
      font-size: ${token.fontSize[size!]}px;
    }
  `;
};

export const StyledSwitch = styled.div`
  ${switchCss};
`;
