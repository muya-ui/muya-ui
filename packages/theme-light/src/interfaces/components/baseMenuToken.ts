import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

export type IItemStatus = 'normal' | 'selected' | 'disabled';

export type IItemInteractionStatus =
  | IItemStatus
  | 'hover'
  | 'clicked'
  | 'selectedHover'
  | 'selectedClicked';

export interface IBaseMenuToken {
  item: {
    background: Record<IItemInteractionStatus, string>;
    color: Record<IItemInteractionStatus, string>;
    fontWeight: Record<IItemStatus, number>;
    fontSize: Record<IComponentSizeSpec, number>;
    height: Record<IComponentSizeSpec, number>;
    paddingHorizontal: number;
  };
  iconMarginLeft: number;
  expandIcon?: React.FunctionComponent<ISvgProps>;
  selectedIcon?: React.FunctionComponent<ISvgProps>;
  iconColor: string;
  group: {
    color: string;
    background: string;
    fontSize: number;
    height: number;
    paddingLeft: Record<IComponentSizeSpec, number>;
    itemIndent: number;
  };
  divider: {
    paddingLeft: Record<IComponentSizeSpec, number>;
    paddingRight: number;
    paddingVertical: number;
  };
  wrapper: {
    paddingRight: number;
    paddingVertical: number;
    borderRadius: string;
    innerPaddingRight: number;
  };
}
