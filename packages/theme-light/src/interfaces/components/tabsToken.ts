import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

type TabIconType = 'next' | 'prev';

export interface ITabsToken {
  height: Record<IComponentSizeSpec, number>;
  marginRight: Record<IComponentSizeSpec, number>;
  padding: Record<IComponentSizeSpec, string>;
  indicator: {
    activeColor: string;
    activeHeight: number;
    bgColor: string;
    bgHeight: number;
  };
  icon?: Record<TabIconType, React.FunctionComponent<ISvgProps>>;
  iconSize: Record<IComponentSizeSpec, number>;
  card: {
    marginRight: number;
    height: Record<IComponentSizeSpec, number>;
    padding: Record<IComponentSizeSpec, number>;
    dividerSize: Record<IComponentSizeSpec, number>;
    borderRadius: string;
    bgColor: string;
    bgSelectedColor: string;
    bgHoverColor: string;
  };
}
