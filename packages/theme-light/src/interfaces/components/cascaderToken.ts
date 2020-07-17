import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IItemInteractionStatus, IItemStatus } from '../../interfaces';
import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

export interface ICascaderToken {
  menuMarginVertical: number;
  menuMarginRight: number;
  borderRadius: string;
  offset: Record<IComponentSizeSpec, number>;
  maxHeight: Record<IComponentSizeSpec, number>;
  background: string;
  item: {
    marginRight: number;
    paddingHorizontal: number;
    height: Record<IComponentSizeSpec, number>;
    fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
    iconMargin: string;
    background: Record<IItemInteractionStatus, string>;
    color: Record<IItemInteractionStatus, string>;
    fontWeight: Record<IItemStatus, number>;
    checkboxMarginRight: number;
    multipleSelectFontWeight: number;
  };
  menuExpandIcon?: React.FunctionComponent<ISvgProps>;
  expandIcon?: React.FunctionComponent<ISvgProps>;
}
