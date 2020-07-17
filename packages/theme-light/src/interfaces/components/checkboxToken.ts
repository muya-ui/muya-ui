import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

type checkboxIconType = 'checked' | 'unChecked' | 'indeterminate';

export interface ICheckboxToken {
  marginRightInGroup: number;
  icons?: Record<checkboxIconType, React.FunctionComponent<ISvgProps>>;
  iconFontSize: Record<IComponentSizeSpec, number>;
  textIconSpacing: Record<IComponentSizeSpec, number>;
  fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  labelColor: string;
  iconBgColor: string;
  iconColor: {
    unChecked: {
      normal: string;
      hover: string;
      click: string;
    };
    checked: {
      normal: string;
      hover: string;
      click: string;
    };
    indeterminate: {
      normal: string;
      hover: string;
      click: string;
    };
  };
}
