import { useAfterEffect, useEventCallback } from '@muya-ui/utils';

import React, { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled from 'styled-components';

import Animation, { IAnimationBaseProps } from '../Animation';
import Img, { ImgContainer } from '../Img';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import { withThemeForStyled } from '../utils/withTheme';

import PagerButton from './PagerButton';
import { carouselCss, StyledIndexIndicator, StyledPagerNext, StyledPagerPrev } from './styled';
import { ICarouselProps } from './types';
import useMoveActive from './useMoveActive';
import { transformImgs } from './utils';

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimCarouselPure = memoForwardRef<HTMLDivElement, ICarouselProps>((props, ref) => {
  const {
    imgs,
    defaultIndex = 0,
    autoplay = 0,
    arrow = 'always',
    arrowEnabled = 'always',
    arrowSize = 'm',
    indicator = 'center',
    indicatorTrigger,
    duration = 300,
    onChange,
    animation = 'fade',
    lazy,
    styles,
    indicatorStyles,

    enableDiffChildren,
    children,
    onMouseEnter,
    onMouseLeave,
    ...otherProps
  } = props;
  const { imgs: innerImgs, isItems, imgItems } = useMemo(() => transformImgs(imgs), [imgs]);
  const defaultStyles = useMemo(
    () => ({
      pagerPrev: '',
      pagerPrevBtn: '',
      pagerNext: '',
      pagerNextBtn: '',
      indicator: '',
      swipe: '',
      img: '',
    }),
    [],
  );
  const innerStyles = useStyles('carousel', defaultStyles, styles);

  const [index, setIndex] = useState(defaultIndex);
  const canSwipe = innerImgs.length > 1;
  const { shouldActive, setMoveActive } = useMoveActive(arrowEnabled === 'always');
  const updateIndex = shouldActive((i: number) => {
    setIndex(i);
    onChange && onChange(innerImgs[i], i);
  });
  const onIndexChange = useCallback(
    (i: number) => {
      updateIndex(i);
    },
    [updateIndex],
  );

  const onPrev = useCallback(() => {
    if (index === 0) {
      updateIndex(innerImgs.length - 1);
    } else {
      updateIndex(index - 1);
    }
  }, [index, innerImgs.length, updateIndex]);
  const onNext = useCallback(() => {
    if (index === innerImgs.length - 1) {
      updateIndex(0);
    } else {
      updateIndex(index + 1);
    }
  }, [index, innerImgs.length, updateIndex]);
  const pagerNode = useMemo(
    () =>
      arrow !== 'none' && canSwipe ? (
        <>
          <StyledPagerPrev {...innerStyles.pagerPrev}>
            <PagerButton
              {...innerStyles.pagerPrevBtn}
              arrow="left"
              size={arrowSize}
              onClick={onPrev}
            />
          </StyledPagerPrev>
          <StyledPagerNext {...innerStyles.pagerNext}>
            <PagerButton
              {...innerStyles.pagerNextBtn}
              arrow="right"
              size={arrowSize}
              onClick={onNext}
            />
          </StyledPagerNext>
        </>
      ) : null,
    [
      arrow,
      arrowSize,
      canSwipe,
      innerStyles.pagerNext,
      innerStyles.pagerNextBtn,
      innerStyles.pagerPrev,
      innerStyles.pagerPrevBtn,
      onNext,
      onPrev,
    ],
  );

  const indicatorNode = useMemo(
    () =>
      indicator !== 'none' && canSwipe ? (
        <StyledIndexIndicator
          {...innerStyles.indicator}
          styles={indicatorStyles}
          trigger={indicatorTrigger}
          index={index}
          num={innerImgs.length}
          onChange={onIndexChange}
        />
      ) : null,
    [
      canSwipe,
      index,
      indicator,
      indicatorStyles,
      indicatorTrigger,
      innerImgs.length,
      innerStyles.indicator,
      onIndexChange,
    ],
  );

  const { onActive, onDisable } = useAfterEffect(onNext, autoplay * 1000);
  useEffect(() => {
    if (index > innerImgs.length) {
      updateIndex(innerImgs.length - 1);
    }
  });

  const checkRegion = useRef({
    top: -1,
    bottom: 1,
    left: -1,
    right: 1,
  });
  const mouseEnterHandler = useEventCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onDisable();
    onMouseEnter && onMouseEnter(e);
  }, []);
  const mouseLeaveHandler = useEventCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onActive();
    onMouseLeave && onMouseLeave(e);
  }, []);

  let Anim: ComponentType<IAnimationBaseProps>;
  if (animation === 'grow') {
    Anim = Animation.Grow;
  } else {
    Anim = Animation.Fade;
  }

  const settings = useMemo(() => ({ checkRegion: checkRegion.current }), []);

  return (
    <ImgContainer
      settings={settings}
      {...otherProps}
      ref={ref}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {innerImgs.map((imgSrc, i) => {
        const selected = index === i;
        let imgNode;
        if (isItems) {
          const currentItem = imgItems![index];
          imgNode = (
            <StyledImg {...innerStyles.img} src={imgSrc} lazy="off" {...currentItem.imgProps}>
              {currentItem.children}
            </StyledImg>
          );
        } else {
          imgNode = <StyledImg {...innerStyles.img} src={imgSrc} lazy="off" />;
        }

        return (
          <Anim key={i} timeout={duration} in={selected} onEntered={() => setMoveActive(true)}>
            {imgNode}
          </Anim>
        );
      })}
      {pagerNode}
      {children}
      {indicatorNode}
    </ImgContainer>
  );
});

const AnimCarousel = styled(AnimCarouselPure)`
  ${carouselCss}
`;

export default withThemeForStyled(AnimCarousel);
