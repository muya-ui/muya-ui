import React from 'react';

import { ISvgProps } from '../../components/SvgIcon';
import { IShadowsSpecRecord } from '../shadows';

export interface IImgPreviewToken {
  spinColor: string;
  responsiveWidth: number[];
  imgWrapper: {
    marginTop: number;
    scrollBarSize: number;
  };
  imgPagination: {
    paddingVertical: number;
    height: number;
    itemWidth: number;
    itemHeight: number;
    itemMrginRight: number;
    itemOpacity: number;
    itemActiveBorderSize: number;
    buttonWidth: number;
    buttonHeight: number;
    buttonFontSize: number;
    buttonOffset: number;
    borderActiveColor: string;
  };
  pageButton: {
    fontSize: number;
    color: string;
    boxShadow: IShadowsSpecRecord;
    opacity: number;
    spacing: number;
    leftIcon?: React.FunctionComponent<ISvgProps>;
    rightIcon?: React.FunctionComponent<ISvgProps>;
  };
  closeIcon: {
    icon?: React.FunctionComponent<ISvgProps>;
    top: number;
    right: number;
    fontSize: number;
    color: string;
  };
  imgActions: {
    bottom: number;
    zoomInIcon?: React.FunctionComponent<ISvgProps>;
    zoomOutIcon?: React.FunctionComponent<ISvgProps>;
    resetZoomIcon?: React.FunctionComponent<ISvgProps>;
  };
}
