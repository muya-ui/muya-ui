import React, { cloneElement, forwardRef, Ref, useMemo, useRef } from 'react';

import {
  CloseIcon as DefaultCloseIcon,
  FullscreenIcon,
  GuildLeftIcon,
  GuildRightIcon,
  MagnifyIcon,
  ShrinkIcon,
} from '@muya-ui/theme-light';

import Button, { ButtonGroup } from '../Button';
import Dialog from '../Dialog';
import Result from '../Result';
import Spin from '../Spin';
import Swipe from '../Swipe';
import Tooltip from '../Tooltip';
import { ICustomStylePropMap } from '../types';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledCloseIconWrapper,
  StyledImg,
  StyledImgActions,
  StyledImgContainer,
  StyledImgPaginationWrapper,
  StyledImgPreview,
  StyledImgPreviewContainer,
  StyledImgViewerLayer,
  StyledImgWrapper,
  StyledLoadStateLayer,
  StyledPageButton,
  StyledPaginationButton,
  StyledPaginationImg,
} from './styled';
import { IImgPreviewProps, IImgPreviewStyleKeys } from './types';
import useImgPreview from './useImgPreview';

const ImgPreview = forwardRef((props: IImgPreviewProps, ref: Ref<HTMLDivElement>) => {
  const theme = useTheme();
  const {
    mode,
    open,
    loading,
    zoomInIcon,
    zoomOutIcon,
    resetZoomIcon,
    hideActions,
    paginationImgWidth,
    disableMaskClick,
    renderInImgNode,
    renderInImgContainer,
    renderCustomPageButton,
    renderCustomPagination,
    onClose,
    onExited,
    styles,
    style,
    className,
    ...restProps
  } = props;
  const imgRef = useRef<HTMLDivElement>(null);
  const imgScrollWrapperRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>();
  const defaultStyles = useMemo<ICustomStylePropMap<IImgPreviewStyleKeys>>(
    () => ({
      wrapper: '',
      closeIconWrapper: '',
      imgLayer: '',
      imgWrapper: '',
      imgContainer: '',
      img: '',
      paginationWrapper: '',
      paginationButton: '',
      paginationImg: '',
    }),
    [],
  );
  const innerStyles = useStyles('img-preview', defaultStyles, styles);
  const wrapperStyleItem = useMemo(
    () =>
      mergeStyleItem(
        {
          className,
          style,
        },
        innerStyles.wrapper,
      ),
    [className, innerStyles.wrapper, style],
  );
  const {
    imgUrl,
    imgs,
    imgIndex,
    onStepsChange,
    imgOverflow,
    imgLoading,
    imgLoadError,
    imgLoaded,
    loadingText,
    loadErrorText,
    zoomInText,
    zoomOutText,
    resetZoomText,
    stepIndex,
    hasPrevStep,
    hasNextStep,
    toPrevStep,
    toNextStep,
    hasPrevImg,
    hasNextImg,
    showPaginationButton,
    containerSize,
    updateOccupyHeight,
    showPagination,
    handleImgClick,
    handleImgLoaded,
    handleImgError,
    handleImgMouseDown,
    handleImgMouseMove,
    handleImgMouseUp,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleExited,
    toImgIndex,
    toPrevImg,
    toNextImg,
    handleMaskClick,
    handleCloseIconClick,
  } = useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef);
  const {
    spinColor,
    imgActions: {
      zoomInIcon: ZoomInIcon = MagnifyIcon,
      zoomOutIcon: ZoomOutIcon = ShrinkIcon,
      resetZoomIcon: ResetZoomIcon = FullscreenIcon,
    },
    closeIcon: { icon: CloseIcon = DefaultCloseIcon },
    pageButton: {
      leftIcon: PageLeftIcon = GuildLeftIcon,
      rightIcon: PageRightIcon = GuildRightIcon,
    },
  } = theme.components.ImgPreview;
  const zoomInIconNode = useMemo(() => zoomInIcon || <ZoomInIcon />, [zoomInIcon]);
  const zoomOutIconNode = useMemo(() => zoomOutIcon || <ZoomOutIcon />, [zoomOutIcon]);
  const resetZoomNode = useMemo(() => resetZoomIcon || <ResetZoomIcon />, [resetZoomIcon]);
  const handelPaginationRef = React.useCallback(
    instance => {
      paginationRef.current = instance;
      if (instance) {
        updateOccupyHeight(parseInt(getComputedStyle(instance).height!, 10) || 0);
      }
    },
    [updateOccupyHeight],
  );

  const actionsNode = useMemo(() => {
    return (
      <StyledImgActions theme={theme}>
        <ButtonGroup>
          <Tooltip title={zoomInText} placement="top">
            <Button type="strong" onClick={handleZoomIn}>
              {zoomInIconNode}
            </Button>
          </Tooltip>
          <Tooltip title={zoomOutText} placement="top">
            <Button type="strong" onClick={handleZoomOut}>
              {zoomOutIconNode}
            </Button>
          </Tooltip>
          <Tooltip title={resetZoomText} placement="top">
            <Button type="strong" onClick={handleResetZoom}>
              {resetZoomNode}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </StyledImgActions>
    );
  }, [
    handleResetZoom,
    handleZoomIn,
    handleZoomOut,
    resetZoomNode,
    resetZoomText,
    theme,
    zoomInIconNode,
    zoomInText,
    zoomOutIconNode,
    zoomOutText,
  ]);

  const pageButtonNode = useMemo(() => {
    if (typeof renderCustomPageButton === 'function') {
      return renderCustomPageButton({
        hasPrev: hasPrevImg,
        hasNext: hasNextImg,
        toPrevImg,
        toNextImg,
      });
    } else {
      return (
        <>
          <StyledPageButton
            theme={theme}
            onClick={toPrevImg}
            $disabled={!hasPrevImg}
            $direction="left"
            $height={containerSize.height}
            $imgOverflow={imgOverflow}
          >
            <PageLeftIcon />
          </StyledPageButton>
          <StyledPageButton
            theme={theme}
            onClick={toNextImg}
            $disabled={!hasNextImg}
            $direction="right"
            $height={containerSize.height}
            $imgOverflow={imgOverflow}
          >
            <PageRightIcon />
          </StyledPageButton>
        </>
      );
    }
  }, [
    containerSize.height,
    hasNextImg,
    hasPrevImg,
    imgOverflow,
    renderCustomPageButton,
    theme,
    toNextImg,
    toPrevImg,
  ]);

  const paginationNode = useMemo(() => {
    if (typeof renderCustomPagination === 'function') {
      const pagination = renderCustomPagination({
        imgIndex,
        toImgIndex,
      });
      return cloneElement(pagination, {
        ref: handelPaginationRef,
      });
    } else {
      return (
        <StyledImgPaginationWrapper
          ref={handelPaginationRef}
          {...innerStyles.paginationWrapper}
          theme={theme}
          $width={containerSize.width}
        >
          {showPaginationButton && (
            <StyledPaginationButton
              {...innerStyles.paginationButton}
              theme={theme}
              onClick={toPrevStep}
              disabled={!hasPrevStep}
              arrow="left"
              side="right"
            >
              <PageLeftIcon />
            </StyledPaginationButton>
          )}
          <Swipe stepIndex={stepIndex} onStepsChange={onStepsChange}>
            {imgs.map((imgSrc, i) => (
              <StyledPaginationImg
                {...innerStyles.paginationImg}
                key={i}
                data-i={i}
                theme={theme}
                $selected={imgIndex === i}
                $width={paginationImgWidth}
                onClick={() => toImgIndex(i)}
                src={imgSrc}
              ></StyledPaginationImg>
            ))}
          </Swipe>
          {showPaginationButton && (
            <StyledPaginationButton
              {...innerStyles.paginationButton}
              theme={theme}
              onClick={toNextStep}
              disabled={!hasNextStep}
              arrow="right"
              side="left"
            >
              <PageRightIcon />
            </StyledPaginationButton>
          )}
        </StyledImgPaginationWrapper>
      );
    }
  }, [
    containerSize.width,
    handelPaginationRef,
    hasNextStep,
    hasPrevStep,
    imgIndex,
    imgs,
    innerStyles.paginationButton,
    innerStyles.paginationImg,
    innerStyles.paginationWrapper,
    onStepsChange,
    paginationImgWidth,
    renderCustomPagination,
    showPaginationButton,
    stepIndex,
    theme,
    toImgIndex,
    toNextStep,
    toPrevStep,
  ]);
  return (
    <Dialog.Base
      ref={ref}
      open={open}
      disableSize
      lazyMount
      disableMaskClick={disableMaskClick!}
      onClose={onClose}
      onExited={handleExited}
      customDialogContainer={
        <StyledImgPreviewContainer {...wrapperStyleItem} ref={ref}>
          <StyledCloseIconWrapper
            theme={theme}
            onClick={handleCloseIconClick}
            {...innerStyles.closeIconWrapper}
          >
            <CloseIcon color={theme.components.ImgPreview.closeIcon.color} />
          </StyledCloseIconWrapper>
          {!imgLoadError && (
            <StyledImgViewerLayer {...innerStyles.imgLayer} onClick={handleMaskClick}>
              <StyledImgPreview ref={imgScrollWrapperRef} theme={theme}>
                <StyledImgContainer
                  theme={theme}
                  ref={imgWrapperRef}
                  $imgOverflow={imgOverflow}
                  $showPagination={showPagination}
                  $width={containerSize.width}
                  $height={containerSize.height}
                  {...innerStyles.imgContainer}
                >
                  <StyledImgWrapper {...innerStyles.imgWrapper}>
                    <StyledImg
                      {...restProps}
                      {...innerStyles.img}
                      ref={imgRef}
                      $imgOverflow={imgOverflow}
                      resizeMode="lfit"
                      suffixWidth={containerSize.width}
                      suffixHeight="auto"
                      wait="on"
                      theme={theme}
                      src={imgUrl}
                      onMouseDown={handleImgMouseDown}
                      onMouseMove={handleImgMouseMove}
                      onMouseUp={handleImgMouseUp}
                      onClick={handleImgClick}
                      onLoaded={handleImgLoaded}
                      onError={handleImgError}
                    >
                      {imgLoaded && renderInImgNode && renderInImgNode(imgUrl)}
                    </StyledImg>
                  </StyledImgWrapper>
                  {renderInImgContainer && renderInImgContainer(imgUrl)}
                </StyledImgContainer>
              </StyledImgPreview>
            </StyledImgViewerLayer>
          )}
          <StyledLoadStateLayer>
            <Spin
              spinning={imgLoading || !!loading}
              color={spinColor}
              desc={loadingText}
              styles={{
                desc: { color: spinColor },
              }}
            />
            {imgLoadError && !loading && <Result type="empty" subTitle={loadErrorText} />}
          </StyledLoadStateLayer>
          {!hideActions && !showPagination && imgLoaded && actionsNode}
          {mode === 'multiple' && pageButtonNode}
          {showPagination && paginationNode}
        </StyledImgPreviewContainer>
      }
    ></Dialog.Base>
  );
});

ImgPreview.defaultProps = {
  mode: 'single',
  defaultIndex: 0,
  disableMaskClick: false,
  hidePagination: false,
  overflowResize: false,
  hideActions: false,
  scaleStep: 1.25,
};

export default ImgPreview;
