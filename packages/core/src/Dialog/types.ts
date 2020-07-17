import { IComponentSizeSpec, ITypographyTitleLevel } from '@muya-ui/theme-light';

import React, { HTMLAttributes, ReactNode } from 'react';

import { IButtonProps, IButtonType } from '../Button';
import { IPortalProps, PortalContainer } from '../Portal';
import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit, IThemedBaseProps } from '../types';

export type IDialogContentType = 'success' | 'info' | 'error' | 'warning';
/**
 * @styles content 内容区
 * @styles actions 操作区
 */
export type IDialogAlertStyleKeys = 'content' | 'actions';
export type IDialogAlertActionFn = (e: React.MouseEvent) => any | Promise<any>;

export interface IDialogBasePureProps extends ISizeSpecBaseProps {
  /**
   * 对话框子元素
   *
   * @type {React.ReactNode}
   * @memberof IDialogBasePureProps
   */
  children?: React.ReactNode;
  /**
   * 是否打开对话框
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   * @default false
   */
  open?: boolean;
  /**
   * 对话框全屏
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  fullScreen?: boolean;
  /**
   * 是否以最大宽度展示对话框
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  fullWidth?: boolean;
  /**
   * 禁用默认的size，自定义对话框大小时会用到
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  disableSize?: boolean;
  /**
   * 对话框渲染节点，同Portal container，默认为document.body
   *
   * @type {PortalContainer}
   * @memberof IDialogBasePureProps
   */
  container?: PortalContainer;
  /**
   * 是否隐藏对话框蒙层
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  hideMask?: boolean;
  /**
   * 是否禁用点击蒙层触发onClose的行为
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  disableMaskClick?: boolean;
  /**
   * 是否禁用ESC键触发onClose的行为
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  disableEscapeKeyDown?: boolean;
  /**
   * 禁用Portal，对话框的节点将渲染到当前节点中
   *
   * @type {IPortalProps['disablePortal']}
   * @memberof IDialogBasePureProps
   */
  disablePortal?: IPortalProps['disablePortal'];
  /**
   * 键盘、点击蒙层关闭弹窗时，触发onClose回调
   *
   *
   * @memberof IDialogBasePureProps
   */
  onClose?: (
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    reason: 'maskClick' | 'escapeKeyDown',
  ) => void;
  /**
   * 渲染完毕的回调
   *
   * @type {IPortalProps['onRendered']}
   * @memberof IDialogBasePureProps
   */
  onRendered?: IPortalProps['onRendered'];
  /**
   * 点击蒙层的回调
   *
   * @type {React.ReactEventHandler<{}>}
   * @memberof IDialogBasePureProps
   */
  onMaskClick?: React.ReactEventHandler<{}>;
  /**
   * 按下ESC键的回调
   *
   * @type {React.ReactEventHandler<{}>}
   * @memberof IDialogBasePureProps
   */
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  /**
   * 设置内部DialogContainer的props
   *
   * @type {HTMLAttributes<HTMLDivElement>}
   * @memberof IDialogBasePureProps
   */
  dialogContainerProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * 获取root节点的ref
   *
   * @type {React.Ref<HTMLDivElement>}
   * @memberof IDialogBasePureProps
   */
  rootRef?: React.Ref<HTMLDivElement>;
  /**
   * 进入动画的事件
   *
   * @memberof IDialogBasePureProps
   */
  onEntered?: () => void;
  /**
   * 退出动画的事件
   *
   * @memberof IDialogBasePureProps
   */
  onExited?: () => void;
  /**
   * 自定义内部DialogContainer节点
   *
   * @type {React.ReactNode}
   * @memberof IDialogBasePureProps
   */
  customDialogContainer?: React.ReactNode;
  /**
   * 关闭时销毁 Dialog 里的子元素
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  destroyOnClose?: boolean;
  /**
   * 设置内部容器宽度
   *
   * @type {(string | number)}
   * @memberof IDialogBasePureProps
   */
  width?: string | number;
  /**
   * 设置内部容器高度
   *
   * @type {(string | number)}
   * @memberof IDialogBasePureProps
   */
  height?: string | number;
  /**
   * 设置内部容器最大高度
   *
   * @type {(string | number)}
   * @memberof IDialogBasePureProps
   */
  maxHeight?: string | number;
  /**
   * 懒加载，弹窗首次出现之前不会渲染子节点
   *
   * @type {boolean}
   * @default false
   * @memberof IDialogBasePureProps
   */
  lazyMount?: boolean;
  /**
   * 自定义Dialog z-index层级
   *
   * @type {number}
   * @memberof IDialogBasePureProps
   */
  zIndex?: number;
}

/**
 * @include
 */
export type IDialogBaseProps = IDialogBasePureProps & HTMLAttributes<HTMLDivElement>;

export interface IDialogActionsBaseProps {
  /**
   * 左侧辅助行动点的内容，可以传React节点
   *
   * @type {React.ReactNode}
   * @memberof IDialogActionsProps
   */
  tipAction?: React.ReactNode;
  /**
   * 是否以最大宽度展示对话框
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  fullWidth?: boolean;
}

export type IDialogActionsProps = IDialogActionsBaseProps & HTMLAttributes<HTMLDivElement>;

export interface IDialogTitleBaseProps {
  /**
   * 隐藏标题上的关闭按钮
   *
   * @type {boolean}
   * @memberof IDialogTitleProps
   */
  hideClose?: boolean;
  /**
   * 组件默认会将children使用Typography包裹一次，该属性可以禁用此行为
   *
   * @type {boolean}
   * @memberof IDialogTitleProps
   */
  disableTypography?: boolean;
  /**
   * 点击关闭按钮时的回调函数
   *
   * @type {React.ReactEventHandler<{}>}
   * @memberof IDialogTitleProps
   */
  onClose?: React.ReactEventHandler<{}>;
  /**
   * 内部排版组件Title的等级
   *
   * @type {ITypographyTitleLevel}
   * @memberof IDialogTitleBaseProps
   */
  level?: ITypographyTitleLevel;
  /**
   * 关闭按钮的大小
   *
   * @type {IComponentSizeSpec}
   * @memberof IDialogTitleBaseProps
   */
  closeButtonSize?: IComponentSizeSpec;
  /**
   * 自定义关闭图标
   *
   * @type {React.ReactNode}
   * @memberof IDialogTitleBaseProps
   */
  closeIcon?: React.ReactNode;
  /**
   * 是否以最大宽度展示对话框
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  fullWidth?: boolean;
}

export type IDialogTitleProps = IDialogTitleBaseProps & HTMLAttributes<HTMLDivElement>;

export interface IDialogContentBaseProps extends ISizeSpecBaseProps {
  /**
   * 隐藏内容区域的上下分割线
   *
   * @type {boolean}
   * @memberof IDialogContentProps
   */
  hideDividers?: boolean;
  /**
   * 提示类型
   *
   * @memberof IDialogContentInfoProps
   * @default 'info'
   */
  type?: IDialogContentType;
  /**
   * 标题
   *
   * @type {ReactNode}
   * @memberof IDialogContentProps
   */
  title?: ReactNode;
  /**
   * 提示的文字内容
   *
   * @type {React.ReactNode}
   * @memberof IDialogContentInfoProps
   */
  text?: ReactNode;
  /**
   * 指定type时，可以自定义标题上的图标
   *
   * @type {React.ReactNode}
   * @memberof IDialogContentProps
   */
  icon?: React.ReactNode;
  /**
   * 是否以最大宽度展示对话框
   *
   * @type {boolean}
   * @memberof IDialogBasePureProps
   */
  fullWidth?: boolean;
}

export type IDialogContentProps = IDialogContentBaseProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export interface IDialogAlertProps
  extends Pick<IDialogContentProps, 'title' | 'text' | 'icon'>,
    Required<Pick<IDialogContentProps, 'type'>>,
    Omit<IDialogBaseProps, 'title' | 'children' | 'onClose'>,
    Pick<IDialogActionsBaseProps, 'tipAction'>,
    ISizeSpecBaseProps,
    ICustomStyleBaseProps<IDialogAlertStyleKeys> {
  /**
   * 确认按钮的文案
   *
   * @default '确认'
   * @type {string}
   * @memberof IDialogAlertProps
   */
  confirmText?: string;
  /**
   * 取消按钮的文案
   *
   * @type {string}
   * @memberof IDialogAlertProps
   */
  cancelText?: string;
  /**
   * 确认按钮type，默认为primary
   *
   * @type {IButtonType}
   * @memberof IDialogAlertProps
   * @default 'primary‘
   */
  confirmButtonType?: IButtonType;
  /**
   *
   * 1. 点击确认按钮的回调，返回true可关闭弹窗，
   * 2. 返回Promise会自动设置按钮loading状态，Promise resolve后自动关闭弹窗
   *
   * @memberof IDialogAlertProps
   */
  onConfirm?: IDialogAlertActionFn;
  /**
   *
   * 1. 点击取消按钮的回调，返回true可关闭弹窗，
   * 2. 返回Promise会自动设置按钮loading状态，Promise resolve后自动关闭弹窗
   *
   * @memberof IDialogAlertProps
   */
  onCancel?: IDialogAlertActionFn;
  /**
   * 隐藏的关闭按钮
   *
   * @type {boolean}
   * @memberof IDialogAlertProps
   * @default true
   */
  hideClose?: boolean;
  /**
   * 1. 点击关闭按钮时的回调函数，默认关闭按钮是隐藏的，需要搭配hideClose使用
   * 2. 返回true可关闭弹窗，返回Promise resolve/reject后自动关闭弹窗
   *
   * @type {React.ReactEventHandler<{}>}
   * @memberof IDialogTitleProps
   */
  onClose?: IDialogAlertActionFn;
  /**
   * 自定义关闭图标
   *
   * @type {React.ReactNode}
   * @memberof IDialogTitleBaseProps
   */
  closeIcon?: React.ReactNode;
  /**
   * 自定义确认按钮的props
   *
   * @type {IButtonProps}
   * @memberof IDialogAlertProps
   * @typeText
   */
  confirmButtonProps?: IButtonProps;
  /**
   * 自定义取消按钮的props
   *
   * @type {IButtonProps}
   * @memberof IDialogAlertProps
   * @typeText
   */
  cancelButtonProps?: IButtonProps;
  /**
   * 关闭弹窗的执行函数，关闭弹窗时会执行该函数
   *
   * @type {Function}
   * @memberof IDialogAlertProps
   */
  closeFn?: Function;
}

export interface IDialogAlertSugarProps extends IDialogAlertProps, IThemedBaseProps {
  locale?: any;
}

export interface IDialogItem {
  update: (newConfig: Partial<IDialogAlertProps>) => void;
  close: () => void;
  open: () => void;
  destroy: () => boolean;
  getConfig: () => IDialogAlertProps;
}
