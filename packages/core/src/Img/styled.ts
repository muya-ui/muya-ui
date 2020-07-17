import styled, { css, CSSObject } from 'styled-components';

import Skeleton from '../Skeleton';
import { skeletonNormalCss } from '../styled/mixins/skeleton';
import { IThemedBaseProps } from '../types';
import addPx from '../utils/addPx';
import { IImgAspectRatioType, IImgLoadStatus, IImgPureProps } from './types';

export interface IStyledNodeProps extends IThemedBaseProps {
  $width?: string | number;
  $height?: string | number;
  $loadingType?: IImgPureProps['loadingType'];
}
export interface IStyledBlockProps extends IStyledNodeProps {
  $aspectRatio?: IImgAspectRatioType;
  $status: IImgLoadStatus;
  $useDefaultImgAndIsFromTheme: boolean;
}
function rectCss(props: IStyledNodeProps) {
  const { $width, $height } = props;
  const cssObj: CSSObject = {};
  if ($width) {
    cssObj.width = addPx($width);
  }
  if ($height) {
    cssObj.height = addPx($height);
  }
  return cssObj;
}

const AspectRatioMap: Record<IImgAspectRatioType, number> = {
  '1:1': 1,
  '4:3': 3 / 4,
  '3:2': 2 / 3,
  '16:9': 9 / 16,
  '3:4': 4 / 3,
};

function blockCss(props: IStyledBlockProps) {
  const {
    $width,
    $height,
    $aspectRatio,
    $status,
    $loadingType,
    $useDefaultImgAndIsFromTheme,
    theme,
  } = props;
  let aspectCss;
  if ($aspectRatio) {
    const cssObj: CSSObject = {
      position: 'relative',
      height: 0,
    };
    const heightRatio = AspectRatioMap[$aspectRatio];
    if (typeof $width === 'number' && $width > 0) {
      cssObj.height = Math.floor($width * heightRatio);
    } else {
      cssObj.paddingBottom = `${heightRatio * 100}%`;
    }

    if ($width) {
      cssObj.width = addPx($width);
    }

    aspectCss = cssObj;
  } else if ($width !== undefined || $height !== undefined) {
    aspectCss = rectCss(props);
  }

  let loadingSkeletonCss;
  if ($status === 'none' && $loadingType === 'skeleton') {
    loadingSkeletonCss = css`
      position: relative;
    `;
  }

  let baseCss;
  if ($useDefaultImgAndIsFromTheme) {
    const token = theme.components.Img;
    baseCss = css`
      background-repeat: ${token.errorBgRepeat};
      background-size: ${token.errorBgSize};
    `;
  } else {
    baseCss = css`
      background-repeat: no-repeat;
      background-size: cover;
    `;
  }

  return css`
    ${aspectCss}
    ${loadingSkeletonCss}
    ${baseCss}
    background-position: center;
    transition: background-image ${theme.transition.spec.duration.normal}ms
      ${theme.transition.pattern.easing.enter};
  `;
}

function divCss(props: IStyledBlockProps) {
  const { $status, $loadingType, theme } = props;
  if ($status === 'none' && $loadingType === 'spin') {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.spec.brand};
      ${skeletonNormalCss}
    `;
  }
}
function spanCss(props: IStyledBlockProps) {
  const { $status, $loadingType, theme } = props;
  if ($status === 'none' && $loadingType === 'spin') {
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.spec.brand};
      ${skeletonNormalCss}
    `;
  }
  return css`
    display: inline-block;
  `;
}

export const BaseDiv = styled.div`
  ${blockCss}
  ${divCss}
`;
export const BaseImg = styled.img`
  ${rectCss}
`;
export const BaseSpan = styled.span`
  ${blockCss}
  ${spanCss}
`;

export const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;
