import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export interface ITreeSelectToken {
  offset: Record<IComponentSizeSpec, number>;
  popupPadding: number;
  treeHeight: number;
  selectedIconMarginLeft: number;
  selectedIcon?: React.FunctionComponent<ISvgProps>;
  selectedIconColor: string;
}
