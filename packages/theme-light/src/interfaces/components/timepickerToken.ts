import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';

export interface ITimePickerToken {
  inputIcon?: React.FunctionComponent<ISvgProps>;
  /** 面板和 input 的宽度 */
  width: number;
  panelPadding: string;
  rowHeight: number;
  itemHeight: number;
  itemWidth: number;

  itemBg: {
    hover: string;
    clicked: string;
    selected: string;
  };
  itemColor: {
    normal: string;
    selected: string;
    disabled: string;
  };
}
