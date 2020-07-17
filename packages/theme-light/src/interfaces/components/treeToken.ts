import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IItemInteractionStatus, IItemStatus } from '../../interfaces';
import { IComponentSizeSpec } from '../specs';

export interface ITreeToken {
  background: Record<IItemInteractionStatus, string>;
  color: Record<IItemInteractionStatus, string>;
  fontWeight: Record<IItemStatus, number>;
  fontSize: Record<IComponentSizeSpec, number>;
  lineHeight: Record<IComponentSizeSpec, number>;
  dragNodeHighlightOpacity: number;
  nodeHeight: Record<IComponentSizeSpec, number>;
  firstNodePaddingLeft: Record<IComponentSizeSpec, number>;
  contentPaddingRight: Record<IComponentSizeSpec, number>;
  contentMargin: number;
  childIndent: number;
  dragOverGapColor: string;
  rootLevelColor: string;
  dragOverBgColor: string;
  iconFontSize: Record<IComponentSizeSpec, number>;
  iconWrapperMarginRight: number;
  checkboxMarginRight: number;
  expandIcon?: React.FunctionComponent<ISvgProps>;
  expandIconWidth?: number;
  expandIconHeight?: number;
  expandIconColor?: string;
  expandIconWrapperWidth: number;
  expandIconWrapperMarginRight: number;
  lineVertical: {
    top: number;
    bottom: number;
    firstLevelLeft: number;
    otherLevelLeft: number;
  };
  lineHorizontal: {
    left: number;
    beforeLeft: number;
    beforeTop: number;
    beforeWidth: number;
  };
  lineSize: number;
}
