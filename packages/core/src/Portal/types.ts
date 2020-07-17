import React from 'react';

import { IReactElementWithRef } from '../types';

export type PortalContainer = React.ReactInstance | (() => React.ReactInstance) | null;

export interface IPortalProps {
  /**
   * 子元素
   *
   * @type {(IReactElementWithRef)}
   * @memberof IPortalProps
   */
  children: IReactElementWithRef;
  /**
   * Portal子元素渲染的容器
   *
   * @default document.body
   * @type {PortalContainer}
   * @memberof IPortalProps
   */
  container?: PortalContainer;
  /**
   * 禁用Portal
   *
   * @type {boolean}
   * @default false
   * @memberof IPortalProps
   */
  disablePortal?: boolean;
  /**
   * 渲染完成后，触发该事件
   *
   * @memberof IPortalProps
   */
  onRendered?: () => void;
}
