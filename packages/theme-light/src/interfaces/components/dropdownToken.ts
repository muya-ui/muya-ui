import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export interface IDropdownToken {
  offset: Record<IComponentSizeSpec, number>;
  expandIcon?: React.FunctionComponent<ISvgProps>;
  groupExpandIcon?: React.FunctionComponent<ISvgProps>;
}
