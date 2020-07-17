import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';

import { useForkRef } from '@muya-ui/utils';

import SpinIcon from '../Spin/SpinIcon';
import { ICustomStyleItem } from '../types';
import memoForwardRef from '../utils/memoForwardRef';
import mergeStyle from '../utils/mergeStyle';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { BaseDiv, BaseImg, BaseSpan, StyledSkeleton } from './styled';
import { IImgImgProps, IImgNode, IImgProps, IImgSpanProps } from './types';
import useImg from './useImg';

const defaultStyles = {
  loading: '',
  error: '',
  blank: '',
  loaded: '',
};
const ImgPure = memoForwardRef<IImgNode, IImgProps>((props, ref) => {
  const {
    // IOSSImgSuffix
    width,
    height,
    suffixHeight,
    suffixWidth,
    webp,
    format,
    resizeMode,
    ratio,
    blur,
    q,
    Q,
    external,
    // IOSSImgOption
    wait,
    resize,
    clean,
    oss,
    suffix,
    lazy,
    // props
    src,
    aspectRatio,
    onLoaded,
    onError,
    defaultImg,
    component,
    defaultImgStyle,
    loadingType,
    loadingDelay,
    // 其余的
    children,
    style,
    styles,
    className,
    ...otherProps
  } = props;
  const imgRef = useRef<IImgNode>(null);
  const handleRef = useForkRef<IImgNode>(imgRef, ref);
  const theme = useTheme();
  const { imgState, imgPool } = useImg({
    imgRef,
    suffixs: {
      width: suffixWidth,
      height: suffixHeight,
      webp,
      format,
      resizeMode,
      ratio,
      blur,
      q,
      Q,
      external,
    },
    options: {
      wait,
      resize,
      clean,
      oss,
      suffix,
      lazy,
    },
    src,
    onError,
    onLoaded,
    loadingDelay,
  });
  const { imgSrc, loadStatus } = imgState;
  const innerStyles = useStyles('img', defaultStyles, styles);
  const loading = loadStatus === 'none';
  const finalDefaultImg =
    defaultImg || imgPool.settings.defaultImg || theme.components.Img.errorImg;

  let useDefaultImgAndIsFromTheme = false;
  let innerImgSrc = imgSrc;
  if (
    (loading && loadingType === 'default-img' && finalDefaultImg) ||
    (loadStatus === 'error' && finalDefaultImg)
  ) {
    innerImgSrc = finalDefaultImg;
    useDefaultImgAndIsFromTheme = finalDefaultImg === theme.components.Img.errorImg;
  }
  let styleItem: ICustomStyleItem | undefined;

  if (loading) {
    styleItem = innerStyles.loading;
  } else if (loadStatus === 'blank') {
    styleItem = innerStyles.blank;
  } else if (loadStatus === 'error') {
    styleItem = innerStyles.error;
  } else if (loadStatus === 'loaded') {
    styleItem = innerStyles.loaded;
  }
  const innerStyle = useMemo(() => {
    let moreStyle;
    if (defaultImg && defaultImgStyle) {
      moreStyle = defaultImgStyle;
    } else if (
      finalDefaultImg === imgPool.settings.defaultImg &&
      imgPool.settings.defaultImgStyle
    ) {
      moreStyle = imgPool.settings.defaultImgStyle;
    }
    const styleItemStyle = styleItem ? styleItem.style : undefined;

    return mergeStyle(moreStyle, styleItemStyle, style);
  }, [
    defaultImg,
    defaultImgStyle,
    finalDefaultImg,
    imgPool.settings.defaultImg,
    imgPool.settings.defaultImgStyle,
    style,
    styleItem,
  ]);

  const imgStyle = useMemo(() => {
    if (innerImgSrc) {
      return {
        ...innerStyle,
        backgroundImage: `url('${innerImgSrc}')`,
      };
    }
    return innerStyle;
  }, [innerImgSrc, innerStyle]);

  const innerClassName = useMemo(() => {
    const classnames: string[] = [];
    if (className) {
      classnames.push(className);
    }
    if (styleItem) {
      classnames.push(styleItem.className);
    }

    return classnames.length > 0 ? classnames.join(' ') : undefined;
  }, [className, styleItem]);

  const finalChildren = useMemo(() => {
    if (loading && loadingType === 'skeleton') {
      return <StyledSkeleton>{children}</StyledSkeleton>;
    } else if (loading && loadingType === 'spin') {
      return <SpinIcon color="currentColor" />;
    }

    return children;
  }, [children, loading, loadingType]);

  if (component === 'img') {
    return (
      <BaseImg
        {...otherProps}
        className={innerClassName}
        theme={theme}
        $width={width}
        $height={height}
        style={innerStyle}
        src={innerImgSrc}
        ref={handleRef as (el: HTMLImageElement) => void}
      />
    );
  }

  if (component === 'span') {
    return (
      <BaseSpan
        {...otherProps}
        className={innerClassName}
        theme={theme}
        $width={width}
        $height={height}
        $aspectRatio={aspectRatio}
        $loadingType={loadingType}
        $useDefaultImgAndIsFromTheme={useDefaultImgAndIsFromTheme}
        $status={loadStatus}
        style={imgStyle}
        ref={handleRef}
      >
        {finalChildren}
      </BaseSpan>
    );
  }
  return (
    <BaseDiv
      {...otherProps}
      className={innerClassName}
      theme={theme}
      $width={width}
      $height={height}
      $aspectRatio={aspectRatio}
      $loadingType={loadingType}
      $status={loadStatus}
      $useDefaultImgAndIsFromTheme={useDefaultImgAndIsFromTheme}
      style={imgStyle}
      ref={handleRef as (el: HTMLDivElement) => void}
    >
      {finalChildren}
    </BaseDiv>
  );
});

const ImgNoTheme = styled(ImgPure)``;
const Img = withThemeForStyled(ImgNoTheme);

const ImgDiv = Img;
const Picture = Img;
const ImgSpan = React.forwardRef<HTMLSpanElement, IImgSpanProps>((props, ref) => {
  const { component, ...otherProps } = props;

  return <Img {...otherProps} ref={ref} component="span" />;
});

const ImgImg = React.forwardRef<HTMLImageElement, IImgImgProps>((props, ref) => {
  const { component, ...otherProps } = props;

  return <Img {...otherProps} ref={ref} component="img" />;
});

export default Img;
export { ImgPure, ImgDiv, ImgSpan, Picture, ImgImg };
