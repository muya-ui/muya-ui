import React from 'react';
import styled, { css } from 'styled-components';

interface IStyledProps {
  $disabled?: boolean;
  $vertical?: boolean;
  /** 是否正在移动 */
  $moving?: boolean;
  /** 是否可以点击 */
  $disableClick?: boolean;
}
interface IStyledWithOffsetProps extends IStyledProps {
  $disabled?: boolean;
}

interface IStyledMarkPointProps extends IStyledWithOffsetProps {
  /** 是否包含 */
  $include: boolean;
}

function cursorCss(props: IStyledProps) {
  if (props.$disabled) {
    return css`
      cursor: not-allowed;
    `;
  }
  if (props.$moving) {
    return css`
      cursor: grabbing;
    `;
  }
  if (props.$disableClick) {
    return;
  }
  return css`
    cursor: pointer;
  `;
}

export const StyledRoot = styled.div<IStyledProps>`
  position: relative;
  box-sizing: border-box;
  ${cursorCss}
  ${props => {
    const {
      components: { Slider: token },
    } = props.theme;
    let hoverCss;
    if (!props.$disabled) {
      hoverCss = css`
        &:hover ${StyledBaseRootTrackInner} {
          background-color: ${token.trackHoverBgColor};
        }
      `;
    }
    if (props.$vertical) {
      return css`
        display: flex;
        padding: 0 ${token.rootPadding}px;
        ${hoverCss};
      `;
    }
    return css`
      padding: ${token.rootPadding}px 0;
      ${hoverCss};
    `;
  }}
`;

export const StyledRange = styled.div<IStyledWithOffsetProps>`
  position: absolute;
  ${cursorCss}
  ${props => {
    const {
      components: { Slider: token },
      size: {
        spec: { borderRadius },
      },
      colors,
    } = props.theme;
    const bgColor = props.$disabled ? colors.pattern.text.disabled : token.trackActiveBgColor;
    let directionCss;
    if (props.$vertical) {
      directionCss = css`
        width: 100%;
      `;
    } else {
      directionCss = css`
        height: 100%;
      `;
    }
    return css`
      border-radius: ${borderRadius.s5};
      background-color: ${bgColor};
      z-index: 1;
      ${directionCss}
    `;
  }}
`;

// 放 marks
const StyledMarkPointInner = styled.div<IStyledMarkPointProps>`
  position: absolute;
  box-sizing: border-box;
  ${cursorCss}
  ${props => {
    const {
      components: { Slider: token },
      size: {
        spec: { borderRadius },
      },
      colors,
    } = props.theme;
    let directionCss;
    if (props.$vertical) {
      directionCss = css`
        left: 50%;
      `;
    } else {
      directionCss = css`
        top: 50%;
      `;
    }
    let borderColor = colors.pattern.text.disabled;
    if (props.$include && !props.$disabled) {
      borderColor = token.markPointBorderColor;
    }
    return css`
      z-index: 2;
      height: ${token.circleSize}px;
      width: ${token.circleSize}px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      ${directionCss}

      &::before {
        content: '';
        display: block;
        box-sizing: border-box;
        height: ${token.markPointSize}px;
        width: ${token.markPointSize}px;
        border: ${token.markPointBorderSize}px solid ${borderColor};
        border-radius: ${borderRadius.s5};
        background-color: ${token.circleColor};
      }
    `;
  }}
`;
export const StyledMarkPoint = React.memo(StyledMarkPointInner);

const StyledMarksRowInner = styled.div<IStyledProps>`
  position: relative;
  ${props => {
    const {
      components: { Slider: token },
    } = props.theme;
    if (props.$vertical) {
      return css`
        height: 100%;
        flex: 1;
        margin-left: ${token.markRowGutter}px;
      `;
    }
    return css`
      width: 100%;
      margin-top: ${token.markRowGutter}px;
      height: 20px;
    `;
  }}
`;
export const StyledMarksRow = React.memo(StyledMarksRowInner);

const StyledMarkLabelInner = styled.div<IStyledWithOffsetProps>`
  position: absolute;
  transform: translate(-50%, 0);
  ${cursorCss}
  ${props => {
    if (props.$vertical) {
      return css`
        left: 0;
        transform: translate(0, -50%);
      `;
    }
    return css`
      transform: translate(-50%, 0);
      top: 0;
    `;
  }}
`;
export const StyledMarkLabel = React.memo(StyledMarkLabelInner);

const StyledCircleInner = styled.div<IStyledWithOffsetProps>`
  position: absolute;
  z-index: 3;
  box-sizing: content-box;
  ${cursorCss}
  ${props => {
    const {
      components: { Slider: token },
      colors,
    } = props.theme;
    const borderColor = props.$disabled ? colors.pattern.text.disabled : token.circleBorderColor;
    let hoverCss;
    const activeCss = css`
      width: ${token.circleActiveSize}px;
      height: ${token.circleActiveSize}px;
      box-shadow: ${token.circleActiveBoxShadow};
      &::before {
        border-color: ${token.circleBorderHoverColor};
      }
    `;
    if (!props.$disabled && !props.$moving) {
      hoverCss = css`
        &:hover {
          cursor: grab;
          ${activeCss}
        }
      `;
    } else if (!props.$disabled && props.$moving) {
      hoverCss = css`
        cursor: grabbing;
        padding: ${token.circleActiveBorderSize}px;
        background-color: ${token.circleActiveBorderColor};
        ${activeCss}
      `;
    }
    let directionCss;
    if (props.$vertical) {
      directionCss = css`
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    } else {
      directionCss = css`
        transform: translate(-50%, -50%);
        top: 50%;
      `;
    }
    return css`
      background-color: ${token.circleColor};
      width: ${token.circleSize}px;
      height: ${token.circleSize}px;
      border-radius: 50%;

      &::before {
        content: '';
        height: 100%;
        width: 100%;
        display: block;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: ${token.circleColor};
        border: ${token.circleBorderWidth}px solid ${borderColor};
      }

      ${hoverCss}
      ${directionCss}
    `;
  }}
`;
export const StyledCircle = React.memo(StyledCircleInner);

// 基础轨道
const StyledBaseRootTrackInner = styled.div<IStyledProps>`
  position: relative;
  box-sizing: border-box;
  user-select: none;
  ${cursorCss}
  ${props => {
    const {
      components: { Slider: token },
      size: {
        spec: { borderRadius },
      },
    } = props.theme;
    let directionCss;
    if (props.$vertical) {
      directionCss = css`
        width: ${token.trackHeight}px;
        height: 100%;
      `;
    } else {
      directionCss = css`
        width: 100%;
        height: ${token.trackHeight}px;
      `;
    }
    return css`
      background-color: ${token.trackBgColor};
      border-radius: ${borderRadius.s5};
      ${directionCss}
    `;
  }}
`;
export const StyledBaseRootTrack = React.memo(StyledBaseRootTrackInner);
