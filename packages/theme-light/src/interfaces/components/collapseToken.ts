import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IStatusColor } from '../colors';

export interface ICollapseToken {
  expandIcon?: React.FunctionComponent<ISvgProps>;
  disableOpacity: number;
  background: IStatusColor;
  headerPadding: string;
  contentPadding: string;
  panelMarginBottom: number;
}
