import React, { Ref } from 'react';

import BaseAnimation from './BaseAnimation';
import { IAnimationBaseHooks, IAnimationBaseProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

export const withAnimation = (
  makeStyles: IAnimationBaseProps['makeStyles'],
  hooksProps?: IAnimationBaseHooks,
) => {
  return memoForwardRef((props: IAnimationBaseProps, ref: Ref<unknown>) => (
    <BaseAnimation ref={ref} {...props} {...hooksProps} makeStyles={makeStyles} />
  ));
};
