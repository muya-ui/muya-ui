import React from 'react';
import styled, { css } from 'styled-components';

import { IImgCropperPureProps } from './types';

function layerCss() {
  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  `;
}

interface IStyledCursor {
  $moving?: boolean;
}

interface IStyledSize {
  $width: number;
  $height: number;
}

interface IStyledMaskProps extends IStyledCursor {
  $shape?: IImgCropperPureProps['shape'];
}

const StyledMaskInner = styled.div<IStyledMaskProps>`
  ${layerCss}
  ${props => {
    const { $moving } = props;
    const { $shape = 'normal', theme } = props;
    const { maskColor, borderColor, borderRadius } = theme.components.ImgCropper;
    let cursorCss;
    if (!$moving) {
      cursorCss = css`
        &:hover {
          cursor: grab;
        }
      `;
    } else {
      cursorCss = css`
        cursor: grabbing;
      `;
    }
    return css`
      ${cursorCss}
      border: 1px solid ${borderColor};
      border-radius: ${borderRadius[$shape]};
      box-shadow: 0 0 0 10000px ${maskColor};
      z-index: 1;
    `;
  }}
`;
export const StyledMask = React.memo(StyledMaskInner);

const StyledContentInner = styled.div`
  ${layerCss}
`;
export const StyledContent = React.memo(StyledContentInner);

export const StyledContainer = styled.div<IStyledCursor>`
  position: relative;
  width: 100%;
  height: 100%;
  ${props => {
    const { $moving } = props;
    if (!$moving) {
      return;
    }
    return css`
      cursor: grabbing;
    `;
  }}
`;

interface IStyledCropperProps extends IStyledSize {
  $padding?: React.CSSProperties['padding'];
}
const StyledCropperInner = styled.div<IStyledCropperProps>`
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
  ${props => {
    const { $width, $height, $padding, theme } = props;
    const { cropperMarginBottom } = theme.components.ImgCropper;
    let cropperPadding = $padding;
    if (!$padding) {
      const paddingLeftRight = (3 / 14) * $width;
      const paddingTopBottom = (3 / 14) * $height;
      cropperPadding = `${paddingTopBottom}px ${paddingLeftRight}px`;
    }
    return css`
      width: ${$width}px;
      height: ${$height}px;
      padding: ${cropperPadding};
      margin-bottom: ${cropperMarginBottom}px;
    `;
  }}
`;
export const StyledCropper = React.memo(StyledCropperInner);

const RCol = styled.div`
  font-size: 0;
  ${props =>
    css`
      padding-left: ${props.theme.components.ImgCropper.rotatePaddingLeft}px;
    `}
`;
export const StyledRotateCol = React.memo(RCol);

const ZCol = styled.div`
  font-size: 0;
`;
export const StyledZoomCol = React.memo(ZCol);
const SCol = styled.div`
  flex: 1;
  ${props =>
    css`
      padding: 0 ${props.theme.components.ImgCropper.sliderPadding}px;
    `}
`;
export const StyledSliderCol = React.memo(SCol);

const StyledRowInner = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledRow = React.memo(StyledRowInner);

interface IStyledImgProps {
  $transition: 'on' | 'off';
}

export const StyledImg = styled.div<IStyledImgProps>`
  background-size: cover;
  transform-origin: center;
  position: absolute;
  ${props => {
    const { $transition, theme } = props;
    const { easing, duration } = theme.transition.spec;
    if ($transition !== 'on') {
      return false;
    }
    return css`
      transition: transform ${duration.fast}ms ${easing.easeInOut};
    `;
  }}
`;
