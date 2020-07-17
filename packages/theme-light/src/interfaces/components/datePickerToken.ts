import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';

export interface IDatePickerToken {
  /** @deprecated 暂时不用了 */
  panelBorderRadius: number | string;
  inputIcon?: React.FunctionComponent<ISvgProps>;
}
