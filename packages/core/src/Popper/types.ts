import PopperJS, { Placement, PopperOptions, ReferenceObject } from 'popper.js';
import { TransitionProps } from 'react-transition-group/Transition';

import { IPortalProps } from '../Portal';
import { Omit } from '../types';

export type IPopperPlacement = Placement;

export interface IPopperChildProps {
  /**
   * 弹出支持的位置
   */
  placement?: IPopperPlacement;
  transitionProps?: Partial<TransitionProps>;
}

export interface IPopperPureProps {
  /**
   * 弹出支持的位置
   */
  placement?: IPopperPlacement;
  /**
   * 触发器元素，弹出层会依据元素来做定位
   *
   * @memberof IPopperPureProps
   */
  anchorEl?: ReferenceObject | (() => ReferenceObject);
  /**
   * 弹出层的内容
   *
   * @memberof IPopperPureProps
   */
  children: React.ReactNode | ((props: IPopperChildProps) => React.ReactNode);
  /**
   * 弹出层会使用Porta组件渲染到组件外，container默认为body
   *
   * @type {IPortalProps['container']}
   * @memberof IPopperPureProps
   */
  container?: IPortalProps['container'];
  /**
   * 禁用Portal
   *
   * @type {IPortalProps['disablePortal']}
   * @memberof IPopperPureProps
   */
  disablePortal?: IPortalProps['disablePortal'];
  /**
   * 总是渲染弹出层节点
   *
   * @type {boolean}
   * @memberof IPopperPureProps
   */
  keepMounted?: boolean;
  /**
   * Popper.js中的modifiers
   *
   * @type {PopperOptions['modifiers']}
   * @memberof IPopperPureProps
   */
  modifiers?: PopperOptions['modifiers'];
  /**
   * 是否展示弹出层
   *
   * @type {boolean}
   * @memberof IPopperPureProps
   */
  open: boolean;
  /**
   * Popper.js配置
   *
   * @type {PopperOptions}
   * @memberof IPopperPureProps
   */
  popperOptions?: PopperOptions;
  /**
   * 获取Popper.js实例
   *
   * @type {(React.Ref<PopperJS | null>)}
   * @memberof IPopperPureProps
   */
  popperRef?: React.Ref<PopperJS | null>;
  /**
   * 是否使用过渡动画
   *
   * @type {boolean}
   * @memberof IPopperPureProps
   */
  transition?: boolean;
  /**
   * 预防提前渲染无用的节点
   *
   * @type {boolean}
   * @memberof IPopperPureProps
   */
  lazyMount?: boolean;
  /**
   * 自定义过渡动画组件的props
   *
   * @type {Partial<TransitionProps>}
   * @memberof IPopperPureProps
   */
  transitionProps?: Partial<TransitionProps>;
  /**
   * 设置弹出层的层级
   *
   * @type {(number)}
   * @memberof IPopperPureProps
   */
  zIndex?: number;
}

export type IPopperProps = IPopperPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
