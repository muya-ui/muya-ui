import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IFeatureSpec } from '../specs';
import { ITypographyTitleLevel } from './typographyToken';

export interface INotificationToken {
  containerCenterTop: number;
  containerTop: number;
  containerBottom: number;
  toast: {
    itemMarginBottom: number;
    minHeight: number;
    contentStyle: {
      minWidth: number;
      maxWidth: number;
      padding: string;
      fontSize: number;
      lineHeight: number;
    };
    /**
     * 除内容外的额外高度，用于预测最大高度
     */
    extraPadding: number;
    lineMaxChar: number;
    iconStyle: {
      size: number;
      padding: string;
      width: number;
    };
    shadow: string;
    easing: string;
    // 已有默认值，如果要设置，可以自己改
    queueSetting: {
      interval: number;
      timeout: number;
      max: number;
    };
  };
  notification: {
    titleLevel: ITypographyTitleLevel;
    itemMarginBottom: number;
    titleMarginBottom: number;
    borderRadius: string;
    width: number;
    minHeight: number;
    lineMaxChar: number;
    contentStyle: {
      lineHeight: number;
      plainPadding: string;
      iconPadding: string;
    };
    closeBtn?: React.FunctionComponent<ISvgProps>;
    iconStyle: {
      size: number;
      top: number;
      left: number;
    };
    closeStyle: {
      size: number;
      top: number;
      right: number;
    };
    // 已有默认值，如果要设置，可以自己改
    queueSetting: {
      interval: number;
      timeout: number;
      max: number;
    };
    easing: string;
    shadow: string;
  };
  icon?: Record<IFeatureSpec, React.FunctionComponent<ISvgProps>>;
  iconBgColor: Record<IFeatureSpec, string>;
}
