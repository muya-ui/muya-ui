import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { ITypographyTitleLevel } from '../../interfaces';

export interface IGuideToken {
  titleLevel: ITypographyTitleLevel;
  closeIcon: {
    right: number;
    top: number;
    color: string;
    Icon?: React.FunctionComponent<ISvgProps>;
    fontSize?: number;
  };
  toolTips: {
    minWidth: number;
    padding: string;
    space: number;
    boxShadow: string;
    borderRadius: number;
  };
  nextButton: {
    marginTop: number;
  };
  mask: {
    opacity: number;
    color: string;
  };
  informIcon: {
    marginRight: number;
    color: string;
    Icon?: React.FunctionComponent<ISvgProps>;
  };
  skip: {
    bottom: number;
  };
}
