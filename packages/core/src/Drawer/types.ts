import { HTMLAttributes } from 'react';

import { ISlideAnimationDirection, ISlideAnimationProps } from '../Animation';
import { IDialogBasePureProps } from '../Dialog';
import { Omit } from '../types';

export interface IDrawerPureProps extends IDialogBasePureProps {
  /**
   * 抽屉出现的方向
   *
   * @type {ISlideAnimationDirection}
   * @memberof IDrawerProps
   * @default 'left'
   */
  direction?: ISlideAnimationDirection;
  /**
   * 抽屉的宽度，对左、右位置的抽屉生效
   *
   * @default '30%'
   * @type {(string | number)}
   * @memberof IDrawerProps
   */
  width?: string | number;
  /**
   * 抽屉的高度，做上、下位置的抽屉生效
   *
   * @default '40%'
   * @type {(string | number)}
   * @memberof IDrawerProps
   */
  height?: string | number;
  /**
   * 内部Slide动画组件的props
   *
   * @type {ISlideAnimationProps}
   * @memberof IDrawerProps
   */
  slideProps?: ISlideAnimationProps;
}

export type IDrawerProps = Omit<IDrawerPureProps, 'fullWidth' | 'fullScreen' | 'disableSize'> &
  HTMLAttributes<HTMLDivElement>;
