import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export interface ITagToken {
  height: Record<IComponentSizeSpec, number>;
  paddingHorizontal: {
    circle: Record<IComponentSizeSpec, number>;
    rect: Record<IComponentSizeSpec, number>;
  };
  borderRadius: {
    circle: string;
    rect: string;
  };
  background: {
    plain: string;
    hover: string;
    checked: string;
    checkedHover: string;
    checkedClicked: string;
  };
  fontSize: Record<IComponentSizeSpec, number>;
  color: {
    plain: string;
    hover: string;
    click: string;
    checked: string;
  };
  iconSpacing: Record<IComponentSizeSpec, number>;
  iconSize: Record<IComponentSizeSpec, number>;
  marginRight: number;
  closeIcon?: React.FunctionComponent<ISvgProps>;
  inverseHoverOpacity: number;
  defaultBordered: boolean;
  defaultShape: 'rect' | 'circle';
}
