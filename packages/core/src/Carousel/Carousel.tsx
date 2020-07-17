import React from 'react';

import AnimCarousel from './AnimCarousel';
import SwipeCarousel from './SwipeCarousel';
import { ICarouselProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

const Carousel = memoForwardRef<HTMLDivElement, ICarouselProps>((props, ref) => {
  const { animation = 'swipe' } = props;
  if (animation === 'swipe') {
    return <SwipeCarousel {...props} ref={ref} />;
  }
  return <AnimCarousel {...props} ref={ref} />;
});

export default Carousel;
