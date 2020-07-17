import styled, { css } from 'styled-components';

import { PagerButton } from '../Carousel';
import Img from '../Img';
import { scrollBarStyle } from '../ScrollView/styled';
import { IThemedBaseProps } from '../types';

export interface IStyledImgWrapperProps extends IThemedBaseProps {
  $showPagination: boolean;
  $imgOverflow: boolean;
  $width: number;
  $height: number;
}

export interface IStyledImgProps extends IThemedBaseProps {
  $imgOverflow: boolean;
}

export interface IStyledPageButtonProps extends IThemedBaseProps {
  $direction: 'left' | 'right';
  $disabled: boolean;
  $height: number;
  $imgOverflow: boolean;
}

export interface IStyledPaginationImgProps extends IThemedBaseProps {
  $selected: boolean;
  $width?: number;
}

export interface IStyledImgPaginationWrapperProps extends IThemedBaseProps {
  $width: number;
}

export const StyledImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledImgContainer = styled.div`
  ${(props: IStyledImgWrapperProps) => {
    const {
      theme: {
        transition: {
          pattern: { duration, easing },
        },
        components: {
          ImgPreview: { imgWrapper: imgWrapperToken },
        },
      },
      $width,
      $height,
      $imgOverflow,
      $showPagination,
    } = props;
    const scrollBarSize = $imgOverflow ? imgWrapperToken.scrollBarSize : 0;
    return css`
      position: relative;
      margin: auto;
      width: ${$width + scrollBarSize}px;
      height: ${$height + scrollBarSize}px;
      margin-top: ${imgWrapperToken.marginTop}px;
      transition: height ${duration.status}ms ${easing.status};
      ${StyledImgWrapper} {
        ${$showPagination && 'overflow: auto'};
        ${scrollBarStyle(props)};
      }
    `;
  }}
`;

export const StyledImg = styled(Img)`
  ${(props: IStyledImgProps) => {
    const {
      theme: {
        transition: {
          pattern: { duration, easing },
        },
        components: {
          ImgPreview: { imgWrapper: imgWrapperToken },
        },
      },
      $imgOverflow,
    } = props;
    return css`
      position: absolute;
      left: 50%;
      top: calc(50% - ${imgWrapperToken.marginTop / 2}px);
      transform: translate(-50%, -50%);
      background-size: contain;
      transform-origin: center center;
      transition: all ${duration.status}ms ${easing.status};
      ${$imgOverflow &&
        css`
          top: 0;
          transform: translate(-50%, 0);
          cursor: grab;
        `}
    `;
  }}
`;

export const StyledImgPreviewContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
`;

export const StyledImgViewerLayer = styled.div`
  height: 100%;
`;

export const StyledLoadStateLayer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledImgPreview = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  white-space: nowrap;
  box-sizing: border-box;
  ${scrollBarStyle};
`;

export const StyledImgActions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${props => props.theme.components.ImgPreview.imgActions.bottom}px;
  margin: auto;
  z-index: 1;
`;

export const StyledCloseIconWrapper = styled.div`
  ${props => {
    const { closeIcon: closeIconToken } = props.theme.components.ImgPreview;
    return css`
      position: absolute;
      right: ${closeIconToken.right}px;
      top: ${closeIconToken.top}px;
      font-size: ${closeIconToken.fontSize}px;
      cursor: pointer;
      z-index: 1;
    `;
  }}
`;

export const StyledPageButton = styled.div`
  ${(props: IStyledPageButtonProps) => {
    const { theme, $disabled, $direction, $height, $imgOverflow } = props;
    const { opacity } = theme;
    const {
      pageButton: pageButtonToken,
      imgWrapper: imgWrapperToken,
    } = theme.components.ImgPreview;
    return css`
      position: absolute;
      top: ${$imgOverflow
        ? `calc(${imgWrapperToken.marginTop}px + ${$height / 2}px)`
        : `calc(${imgWrapperToken.marginTop / 2}px + ${$height / 2}px)`};
      transform: translate(0, -50%);
      font-size: ${pageButtonToken.fontSize}px;
      color: ${pageButtonToken.color};
      cursor: pointer;
      &:hover {
        opacity: ${pageButtonToken.opacity};
      }
      ${$disabled &&
        css`
          opacity: ${opacity.pattern.disabled};
          cursor: not-allowed;
          &:hover {
            opacity: ${opacity.pattern.disabled};
          }
        `}
      ${`${$direction}: ${pageButtonToken.spacing}px`};
    `;
  }}
`;

export const StyledImgPaginationWrapper = styled.div<IStyledImgPaginationWrapperProps>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  ${props => {
    const { $width, theme } = props;
    const { imgPagination: paginationToken } = theme.components.ImgPreview;
    return css`
      box-sizing: border-box;
      width: ${$width}px;
      height: ${paginationToken.height}px;
      padding: ${paginationToken.paddingVertical}px 0;
    `;
  }}
`;

export const StyledPaginationImg = styled(Img)<IStyledPaginationImgProps>`
  ${props => {
    const {
      theme: {
        components: {
          ImgPreview: { imgPagination: imgPaginationToken },
        },
        transition: {
          pattern: { duration, easing },
        },
      },
      $selected,
      $width,
    } = props;
    return css`
      position: relative;
      width: ${$width ? $width : imgPaginationToken.itemWidth}px;
      height: ${imgPaginationToken.itemHeight}px;
      margin-right: ${imgPaginationToken.itemMrginRight}px;
      cursor: pointer;
      opacity: ${imgPaginationToken.itemOpacity};
      transition: opacity ${duration.status}ms ${easing.status};
      &::after {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        content: '';
      }
      ${$selected &&
        css`
          opacity: 1;
          &::after {
            border: ${imgPaginationToken.itemActiveBorderSize}px solid
              ${imgPaginationToken.borderActiveColor};
            transition: border ${duration.status}ms ${easing.status};
          }
        `}
    `;
  }}
`;

export const StyledPaginationButton = styled(PagerButton)`
  ${props => {
    const {
      theme: {
        components: {
          ImgPreview: { imgPagination: imgPaginationToken },
        },
      },
      arrow,
    } = props;
    return css`
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: ${imgPaginationToken.buttonWidth}px;
      height: ${imgPaginationToken.buttonHeight}px;
      font-size: ${imgPaginationToken.buttonFontSize}px;
      ${`${arrow}: ${imgPaginationToken.buttonOffset}px`};
    `;
  }}
`;

export const StyledPagination = styled.div`
  display: flex;
`;
