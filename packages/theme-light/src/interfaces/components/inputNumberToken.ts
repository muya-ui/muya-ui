import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export interface IInputNumberToken {
  arrowSuffixNodeWrapperBorder: string;
  arrowClickBgColor: string;
  arrowBorderColor: string;
  arrowIconSize: Record<IComponentSizeSpec, number>;
  width: Record<IComponentSizeSpec, number>;
  iconMargin: string;
  upArrowIcon?: React.FunctionComponent<ISvgProps>;
  downArrowIcon?: React.FunctionComponent<ISvgProps>;
}
