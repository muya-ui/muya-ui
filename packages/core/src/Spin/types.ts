import { ISvgProps } from '@muya-ui/theme-light';

import { IDialogBaseProps } from '../Dialog';
import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

export type ISpinStyleKeys = 'button' | 'desc';

export interface ISpinProps
  extends ISizeSpecBaseProps,
    Omit<ISvgProps, 'children'>,
    ICustomStyleBaseProps<ISpinStyleKeys> {
  /**
   * 是否处于加载中
   *
   * @default true
   * @type {boolean}
   * @memberof ISpinProps
   */
  spinning?: boolean;
  /**
   * 是否开启全屏加载
   *
   * @type {boolean}
   * @memberof ISpinProps
   */
  fullscreen?: boolean;
  /**
   * 内容的布局方向，分为row 和 column
   *
   * @default 'column'
   * @type {('row' | 'column')}
   * @memberof ISpinProps
   */
  direction?: 'row' | 'column';
  /**
   * 描述文案
   *
   * @type {React.ReactNode}
   * @memberof ISpinProps
   */
  desc?: React.ReactNode;
  /**
   * 取消按钮的文案
   *
   * @type {string}
   * @memberof ISpinProps
   */
  cancelText?: string;
  /**
   * 取消按钮点击事件
   *
   * @type {React.ReactEventHandler<{}>}
   * @memberof ISpinProps
   */
  onCancel?: React.ReactEventHandler<{}>;
  /**
   * 设置区域加载的节点
   *
   * @type {IDialogBaseProps['container']}
   * @memberof ISpinProps
   */
  container?: IDialogBaseProps['container'];
  /**
   * 区域加载/全屏加载时，设置内部 Dialog的属性
   *
   * @default {}
   * @type {IDialogBaseProps}
   * @memberof ISpinProps
   */
  dialogProps?: Partial<IDialogBaseProps>;
  /**
   * 设置颜色
   *
   * @type {string}
   * @memberof ISpinProps
   */
  color?: string;
  /**
   * 单独使用时，可以设置通过fontSize设置图标大小
   *
   * @type {number}
   * @memberof ISpinProps
   */
  fontSize?: number;
  /**
   * 若传入了children，`Spin`会使用children作为区域加载的节点
   *
   * @type {React.ReactElement}
   * @memberof ISpinProps
   */
  children?: React.ReactElement;
}
