import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export interface ISelectToken {
  wrapperPadding: string;
  contentPaddingRight: number;
  tag: {
    margin: string;
    outerPadding: number;
  };
  ctrlHeight: Record<IComponentSizeSpec, number>;
  ctrlPaddingLeft: Record<IComponentSizeSpec, number>;
  fontSize: Record<IComponentSizeSpec, number>;
  borderRadius: string;
  offset: Record<IComponentSizeSpec, number>;
  groupPaddingLeft: Record<IComponentSizeSpec, number>;
  groupItemIndent: number;
  iconRight: Record<IComponentSizeSpec, number>;
  expandIcon?: React.FunctionComponent<ISvgProps>;
  notFoundPanelHeight: number;
}
