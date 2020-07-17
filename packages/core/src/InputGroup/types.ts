import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { HTMLAttributes } from 'react';

export interface IInputGroupPureProps {
  /**
   * 对InputGroup下的所有组件设置统一的尺寸
   *
   * @type {IComponentSizeSpec}
   * @memberof IInputGroupProps
   * @default 'm'
   */
  size?: IComponentSizeSpec;
  /**
   * 禁用InputGroup
   *
   * @type {boolean}
   * @default false
   * @memberof IInputGroupProps
   */
  disabled?: boolean;
}

export type IInputGroupProps = IInputGroupPureProps & HTMLAttributes<HTMLDivElement>;
