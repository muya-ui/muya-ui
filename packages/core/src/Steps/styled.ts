import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import { IStepProps } from './types';

interface IStepCircleProps extends IStepProps {
  $bordered?: boolean;
}

function makeStepContentStyle(props: IStepProps & IThemedBaseProps) {
  const { status, onClick, theme, size } = props;
  const { color, background, fontSize, lineHeight, fontWeight } = theme.components.Steps.content;
  const titleToken = theme.components.Steps.title;

  const titleColor = titleToken.color[status!];
  const finalColor = color[status!];
  const finalBgColor = background[status!];
  const hasBg = finalBgColor !== 'transparent' && finalBgColor !== theme.colors.spec.light;
  const colorStyle =
    status !== 'wait' &&
    css`
      color: ${finalColor};

      & ${StyledCircle} {
        border-color: ${hasBg ? finalBgColor : finalColor};
        background: ${finalBgColor};
      }
      & ${StyledTitle} {
        color: ${titleColor};
      }
    `;

  /**
   * 可点击状态
   * 1. 传入了onChange事件
   * 2. 当前不处于process状态
   * 3. 当前不处于error状态
   */
  const canClick = onClick && status !== 'process' && status !== 'error';

  const canClickStyle =
    canClick &&
    css`
      &:hover {
        color: ${color.hover};
        ${StyledCircle} {
          border-color: ${hasBg ? background.hover : color.hover};
          background: ${background.hover};
        }
        ${StyledTitle} {
          color: ${titleToken.color.hover};
        }
      }
      &:active {
        color: ${color.clicked};
        ${StyledCircle} {
          border-color: ${hasBg ? background.clicked : color.clicked};
          background: ${background.clicked};
        }
        ${StyledTitle} {
          color: ${titleToken.color.clicked};
        }
      }

      cursor: pointer;
    `;

  return css`
    display: flex;
    align-items: center;
    position: relative;
    color: ${color.wait};
    font-size: ${fontSize[size!]}px;
    line-height: ${lineHeight}px;
    font-weight: ${fontWeight};
    cursor: default;
    ${colorStyle}
    ${canClickStyle}
    &>* {
      ${props => {
        const {
          theme: { transition },
        } = props;
        return css`
          transition: all ${transition.pattern.easing.status}
            ${transition.pattern.duration.status}ms;
        `;
      }}
    }
  `;
}

export const StyledProgressLine = styled.div<IStepProps>`
  position: absolute;
  top: 50%;
  left: 100%;
  width: 9999px;
  height: 1px;
  transform: translateY(-50%);
  background-color: ${props => {
    const { status, theme } = props;
    const token = theme.components.Steps.progressLine;
    return status === 'finish' ? token.finishBgColor : token.bgColor;
  }};
`;

export const StyledStepWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  overflow: hidden;
  flex: 1;
  margin-right: ${props => props.theme.spacing.spec.s4}px;

  &:last-child {
    flex: none;
    ${StyledProgressLine} {
      display: none;
    }
  }
`;

export const StyledCircle = styled.span<IStepCircleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 50%;
  user-select: none;
  ${props => {
    const { theme, size, $bordered = true } = props;
    const borderStyle =
      $bordered &&
      css`
        border: 1px solid ${theme.colors.pattern.background.divider};
      `;
    const token = theme.components.Steps.circle;
    return css`
      margin-right: ${token.marginRight[size!]}px;
      width: ${token.size[size!]}px;
      height: ${token.size[size!]}px;
      ${borderStyle}
    `;
  }}
`;

export const StyledTitle = styled.span<IStepProps>`
  margin-right: ${props => props.theme.spacing.spec.s1}px;
`;

export const StyledStepContent = styled.div<IStepProps>`
  ${makeStepContentStyle}
`;

export const StyledDescriptionWrapper = styled.div<IStepProps>`
  ${props => {
    const token = props.theme.components.Steps.description;
    return css`
      margin-left: ${token.marginLeft[props.size!]}px;
      padding-left: ${token.paddingLeft[props.size!]}px;
      margin-top: ${token.marginTop}px;
      max-width: ${token.maxWidth}px;
      overflow: hidden;
    `;
  }}
`;

export const StyledStepsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0;
`;
