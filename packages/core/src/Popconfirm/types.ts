import React from 'react';

import { IPopconfirmIconType } from '@muya-ui/theme-light';

import { IButtonType } from '../Button';
import { IPopoverCardProps } from '../PopoverCard';

export interface IPopconfirmProps extends IPopoverCardProps {
  /**
   * 取消按钮的文案
   *
   * @type {string}
   * @memberof IPopconfirm
   */
  cancelText?: string;
  /**
   * 确认按钮的文案
   *
   * @type {string}
   * @memberof IPopconfirm
   */
  confirmText?: string;
  /**
   * 取消按钮type
   * @type {(IButtonType)}
   * @memberof IPopconfirm
   */
  cancelButtonType?: IButtonType;
  /**
   * 确认按钮type
   * @default 'primary'
   * @type {(IButtonType)}
   * @memberof IPopconfirm
   */
  confirmButtonType?: IButtonType;
  /**
   * 是否使用线性按钮
   * @default false
   * @type {boolean}
   * @memberof IPopconfirm
   */
  useInlineButton?: boolean;
  /**
   * 自定义 Icon 图标
   *
   * @type {React.ReactNode}
   * @memberof IPopconfirm
   */
  icon?: React.ReactNode;
  /**
   * 点击取消按钮的回调
   *
   * @memberof IPopconfirm
   */
  onCancel?: (e: React.MouseEvent) => void;
  /**
   * 点击确认按钮的回调
   *
   * @memberof IPopconfirm
   */
  onConfirm?: (e: React.MouseEvent) => void;
  /**
   * 确认框类型
   *
   * @type {IPopconfirmIconType}
   * @memberof IPopconfirmProps
   */
  type?: IPopconfirmIconType;
}
