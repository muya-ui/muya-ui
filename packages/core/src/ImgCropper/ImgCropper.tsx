import React, { forwardRef, useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';
import { MagnifyIcon, RotateIcon as DefaultRotateIcon, ShrinkIcon } from '@muya-ui/theme-light';

import { InlineButton } from '../Button';
import { Slider } from '../Slider';
import { BaseDiv } from '../styled/base';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledContainer,
  StyledContent,
  StyledCropper,
  StyledImg,
  StyledMask,
  StyledRotateCol,
  StyledRow,
  StyledSliderCol,
  StyledZoomCol,
} from './styled';
import { IImgCropperElement, IImgCropperProps } from './types';
import useImgCropper from './useImgCropper';

const defaultStyles = {
  container: '',
  content: '',
  mask: '',
  img: '',
  row: '',
  zoom: '',
  zoomButton: '',
  zoomOut: '',
  sliderContainer: '',
  slider: '',
  rotateContainer: '',
  rotateButton: '',
};

const ImgCropper = forwardRef<IImgCropperElement, IImgCropperProps>((props, ref) => {
  const {
    src,
    size,
    shape,
    scaleMax,
    scaleMin,
    wheelScaleStep,
    scaleStep = 0.1,
    defaultScale,
    backDelay,
    styles,
    boxPadding,
    sliderStyles,
    ...otherProps
  } = props;
  const theme = useTheme();
  const {
    rotateIcon: RotateIcon = DefaultRotateIcon,
    zoomIcon: ZoomIcon = MagnifyIcon,
    zoomOutIcon: ZoomOutIcon = ShrinkIcon,
    defaultSize,
  } = theme.components.ImgCropper;
  const [$width, $height] = size || defaultSize;
  const maskRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<IImgCropperElement>(null);
  const innerStyles = useStyles('img-cropper', defaultStyles, styles);
  const {
    moving,
    imgSrc,
    imgStyle,
    getImg,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseEnter,
    handleWheel,
    handleSliderChange,
    rotateImg,
    handleZoom,
    handleZoomOut,
    finalScaleMin,
    finalScaleMax,
    finalScale,
  } = useImgCropper(props, maskRef, imgRef);
  const handleRef = useForkRef(ref, rootRef, {
    getImg,
  });
  const finalImgStyle = useMemo(
    () => ({
      ...innerStyles.img.style,
      ...imgStyle,
    }),
    [imgStyle, innerStyles.img.style],
  );
  return (
    <BaseDiv {...otherProps} ref={handleRef}>
      <StyledCropper
        $width={$width}
        $height={$height}
        $padding={boxPadding}
        theme={theme}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <StyledContainer $moving={moving} {...innerStyles.container}>
          <StyledMask
            theme={theme}
            $moving={moving}
            $shape={shape}
            ref={maskRef}
            {...innerStyles.mask}
          />
          <StyledContent {...innerStyles.content}>
            {imgSrc && (
              <StyledImg
                ref={imgRef}
                theme={theme}
                $transition={moving ? 'off' : 'on'}
                style={finalImgStyle}
                className={innerStyles.img.className}
              />
            )}
          </StyledContent>
        </StyledContainer>
      </StyledCropper>
      {/** 操作区域 */}
      <StyledRow {...innerStyles.row}>
        <StyledZoomCol {...innerStyles.zoomOut} theme={theme}>
          <InlineButton {...innerStyles.zoomButton} weakLevel={1} onClick={handleZoomOut}>
            <ZoomOutIcon />
          </InlineButton>
        </StyledZoomCol>
        <StyledSliderCol {...innerStyles.sliderContainer} theme={theme}>
          <Slider
            {...innerStyles.slider}
            styles={sliderStyles}
            min={finalScaleMin}
            max={finalScaleMax}
            step={scaleStep}
            value={finalScale}
            onChange={handleSliderChange}
          />
        </StyledSliderCol>
        <StyledZoomCol {...innerStyles.zoom} theme={theme}>
          <InlineButton {...innerStyles.zoomButton} weakLevel={1} onClick={handleZoom}>
            <ZoomIcon />
          </InlineButton>
        </StyledZoomCol>
        <StyledRotateCol {...innerStyles.rotateContainer} theme={theme}>
          <InlineButton {...innerStyles.rotateButton} weakLevel={1} onClick={rotateImg}>
            <RotateIcon />
          </InlineButton>
        </StyledRotateCol>
      </StyledRow>
    </BaseDiv>
  );
});

export default ImgCropper;
