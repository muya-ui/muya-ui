import { ReactNode } from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps } from '../types';

export type ITagShape = 'circle' | 'rect';
/**
 * Tag style keys
 * @styles childrenWrapper 子节点容器
 * @styles closeIcon 关闭按钮
 */
export type ITagStyleKeys = 'childrenWrapper' | 'closeIcon';

interface ITagBaseProps {
  /**
   * 最大宽度
   */
  maxWidth?: number;
  /**
   * 形状
   * @default 'circle'
   */
  shape?: ITagShape;
  /**
   * 禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否有边框
   * @default false
   */
  bordered?: boolean;
  /**
   * 边框颜色
   */
  borderColor?: string;
  /**
   * 子节点
   */
  children: ReactNode;
}

export interface ITagPureProps
  extends ISizeSpecBaseProps,
    ITagBaseProps,
    ICustomStyleBaseProps<ITagStyleKeys> {
  /** 颜色 */
  color?: string;
  /**
   * 彩色低显示亮色
   * @default true
   */
  colorInverse?: boolean;
  /**
   * 是否可关闭
   * @default false
   **/
  closable?: boolean;
  /**
   * hover 是否高亮标签
   * @default true
   **/
  hoverable?: boolean;
  /**
   * 是否可见
   * @default true
   **/
  visible?: boolean;
  /**
   * 关闭的回调
   */
  onClose?: React.MouseEventHandler;
}

export type ITagProps = ITagPureProps & React.HTMLAttributes<HTMLSpanElement>;

export interface ICheckableTagPureProps extends ISizeSpecBaseProps, ITagBaseProps {
  /**
   * 是否选中
   * @default false
   */
  checked: boolean;
  /**
   * 改变的回调
   */
  onChange?: (checked: boolean) => void;
  /**
   * 子节点
   */
  children: ReactNode;
}

export type ICheckableTagProps = ICheckableTagPureProps & React.HTMLAttributes<HTMLSpanElement>;
