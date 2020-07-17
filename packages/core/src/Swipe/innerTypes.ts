// 把一些不要export出去的types放这里
import { ReactNode, RefObject } from 'react';

import { IThemedBaseProps } from '../types';
import { ISwipeBaseProps, ISwipePureProps } from './types';

export type IDirection = Required<Pick<ISwipePureProps, 'direction'>>;
export interface ISwipePanelPureProps extends IThemedBaseProps, IDirection {
  transition: 'on' | 'off';
  duration: number;
}
export type ISwipePanelProps = ISwipePanelPureProps & React.HTMLAttributes<HTMLDivElement>;

type PropsFromBaseProps = Pick<ISwipeBaseProps, 'gutter' | 'equalNum' | 'direction'>;

export interface ISwipeBaseHookState extends PropsFromBaseProps {
  containerRect?: ClientRect;
  children: ReactNode;
  status: 'init' | 'clone_init' | 'done';
  cloneNum: number;
}

export interface ISwipeBaseHookArgs extends PropsFromBaseProps {
  containerRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  /**
   * 是否开启检查子节点变更
   * 开启了以后要注意，传到 Swipe 中的 children 需使用 React.useMemo 包裹
   */
  enableDiffChildren?: boolean;
  duration?: number;
  /**
   * 是否循环
   */
  loop?: boolean;
  onRectChange: (
    itemRects: ClientRect[],
    containerRect: ClientRect,
    cloneItemRects: ClientRect[],
  ) => void;
}

export interface ISwipeCloneResult {
  refs: RefObject<HTMLDivElement>[];
  cloneRefs: RefObject<HTMLDivElement>[];
  nodes: ReactNode;
}
