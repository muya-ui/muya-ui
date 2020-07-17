import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export interface IBreadcrumbsToken {
  separator?: React.FunctionComponent<ISvgProps>;
  separatorSize: Record<IComponentSizeSpec, number>;
  separatorHeadWidth: number;
  separatorWidth: number;
  separatorColor: string;
}
