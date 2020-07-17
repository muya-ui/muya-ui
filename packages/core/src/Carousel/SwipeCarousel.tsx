import React, { useMemo } from 'react';
import styled from 'styled-components';

import Img, { ImgContainer } from '../Img';
import { LoopSwipe } from '../Swipe';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import { withThemeForStyled } from '../utils/withTheme';
import PagerButton from './PagerButton';
import { carouselCss, StyledIndexIndicator, StyledPagerNext, StyledPagerPrev } from './styled';
import { ICarouselProps } from './types';
import useSwipeCarousel from './useSwipeCarousel';

const StyledImg = styled(Img)`
  height: 100%;
`;

const StyledSwipe = styled(LoopSwipe)`
  height: 100%;
`;

const defaultStyles = {
  pagerPrev: '',
  pagerPrevBtn: '',
  pagerNext: '',
  pagerNextBtn: '',
  indicator: '',
  swipe: '',
  img: '',
};

const imgContainerSettings = {
  checkRegion: {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1,
  },
};

const SwipeCarouselPure = memoForwardRef<HTMLDivElement, ICarouselProps>((props, ref) => {
  const {
    canSwipe,
    isItems,
    imgItems,
    innerImgs,
    currentIndex,
    imgLength,

    // 处理函数
    handlePrev,
    handleNext,
    handleGoTo,
    handleMouseEnter,
    handleMouseLeave,
    handleTransitionEnd,

    // 直接往下传
    arrowSize,
    arrow,
    enableDiffChildren,
    lazy,
    duration,
    indicatorTrigger,
    indicator,
    children,

    otherProps,
    styles,
    indicatorStyles,
  } = useSwipeCarousel(props);

  const innerStyles = useStyles('carousel', defaultStyles, styles);

  const pagerNode = useMemo(
    () =>
      arrow !== 'none' && canSwipe ? (
        <>
          <StyledPagerPrev {...innerStyles.pagerPrev}>
            <PagerButton
              {...innerStyles.pagerPrevBtn}
              arrow="left"
              size={arrowSize}
              onClick={handlePrev}
            />
          </StyledPagerPrev>
          <StyledPagerNext {...innerStyles.pagerNext}>
            <PagerButton
              {...innerStyles.pagerNextBtn}
              arrow="right"
              size={arrowSize}
              onClick={handleNext}
            />
          </StyledPagerNext>
        </>
      ) : null,
    [
      arrow,
      arrowSize,
      canSwipe,
      handleNext,
      handlePrev,
      innerStyles.pagerNext,
      innerStyles.pagerNextBtn,
      innerStyles.pagerPrev,
      innerStyles.pagerPrevBtn,
    ],
  );

  const indicatorNode = useMemo(
    () =>
      indicator !== 'none' && canSwipe ? (
        <StyledIndexIndicator
          {...innerStyles.indicator}
          styles={indicatorStyles}
          trigger={indicatorTrigger}
          index={currentIndex}
          num={imgLength}
          onChange={handleGoTo}
        />
      ) : null,
    [
      canSwipe,
      currentIndex,
      handleGoTo,
      imgLength,
      indicator,
      indicatorStyles,
      indicatorTrigger,
      innerStyles.indicator,
    ],
  );
  const imgNodes = useMemo(() => {
    if (innerImgs.length <= 0) {
      return;
    }
    return innerImgs.map((imgSrc, index) => {
      if (isItems) {
        const currentItem = imgItems![index];
        return (
          <StyledImg
            {...innerStyles.img}
            key={index}
            src={imgSrc}
            lazy={lazy}
            {...currentItem.imgProps}
          >
            {currentItem.children}
          </StyledImg>
        );
      }

      return <StyledImg {...innerStyles.img} key={index} src={imgSrc} lazy={lazy} />;
    });
  }, [imgItems, innerImgs, innerStyles.img, isItems, lazy]);

  const swipeNode = useMemo(() => {
    if (innerImgs.length > 0) {
      return (
        <StyledSwipe
          {...innerStyles.swipe}
          equalNum={1}
          duration={duration}
          stepIndex={currentIndex}
          onTransitionEnd={handleTransitionEnd}
          enableDiffChildren={enableDiffChildren}
        >
          {imgNodes}
        </StyledSwipe>
      );
    }
  }, [
    currentIndex,
    duration,
    enableDiffChildren,
    handleTransitionEnd,
    imgNodes,
    innerImgs.length,
    innerStyles.swipe,
  ]);

  return (
    <ImgContainer
      settings={imgContainerSettings}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...otherProps}
      ref={ref}
    >
      {pagerNode}
      {swipeNode}
      {children}
      {indicatorNode}
    </ImgContainer>
  );
});

const SwipeCarousel = styled(SwipeCarouselPure)`
  ${carouselCss}
`;

export default withThemeForStyled(SwipeCarousel);
