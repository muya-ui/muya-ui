import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

type ArrowIconType = 'top' | 'bottom' | 'left' | 'right';

export interface ICarouselToken {
  indicator: {
    bottom: number;
    padding: string;
  };
  PagerButton: {
    bgColor: string;
    iconColor: string;
    arrowIcon?: Record<ArrowIconType, React.FunctionComponent<ISvgProps>>;
    width: Record<IComponentSizeSpec, number>;
    height: Record<IComponentSizeSpec, number>;
    iconSize: Record<IComponentSizeSpec, number>;
    borderRadius: string;
    opacity: number;
    hoverOpacity: number;
  };
  IndexIndicator: {
    borderWidth: number;
    selectedSize: number;
    size: number;
    color: string;
    gutter: number;
    opacity: number;
    hoverOpacity: number;
  };
}
