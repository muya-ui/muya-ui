import { ISpacingSpec } from '@muya-ui/theme-light';

import React from 'react';
import { ICustomStyleBaseProps } from '../types';

/**
 * @styles wrapper 最外层容器
 * @styles item 每一个child的容器
 */
export type ISpaceStyleKeys = 'wrapper' | 'item';

export interface ISpaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ICustomStyleBaseProps<ISpaceStyleKeys> {
  /**
   * 设置间距大小
   *
   * @default 's4'
   * @type {(ISpacingSpec | number)}
   * @memberof ISpaceProps
   */
  spacing?: ISpacingSpec | number;
  /**
   * 间距方向
   *
   * @default -
   * @type {('vertical' | 'horizontal')}
   * @memberof ISpaceProps
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * block: true时为flex布局，block为: false时为inline-flex布局
   *
   * @default false
   * @type {boolean}
   * @memberof ISpaceProps
   */
  block?: boolean;
}
