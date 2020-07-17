import React from 'react';
import { ITabsProps, ITabProps } from '../Tabs';
import { Omit } from '../types';
import { IScrollViewProps } from '../ScrollView';

export type IAnchorContainer = HTMLElement | Window;

export interface IAnchorProviderProps {
  /**
   * 子节点
   *
   * @type {React.ReactNode}
   * @memberof IAnchorProviderProps
   */
  children?: React.ReactNode;
  /**
   * 距离窗口顶部达到指定偏移量后触发
   *
   * @type {number}
   * @memberof IAnchorProviderProps
   */
  offsetTop?: number;
  /**
   * 禁用后点击锚点不会修改location.hash
   *
   * @type {boolean}
   * @memberof IAnchorProviderProps
   */
  disableHash?: boolean;
  /**
   * 滚动动画过渡时间
   *
   * @default 300
   * @type {number}
   * @memberof IAnchorProviderProps
   */
  duration?: number;
  /**
   * 锚点的方向
   *
   * @default 'vertical'
   * @type {('vertical' | 'horizontal')}
   * @memberof IAnchorProviderProps
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 锚点区域边界
   *
   * @default 5
   * @type {number}
   * @memberof IAnchorProviderProps
   */
  bounds?: number;
  /**
   * 锚点变化事件
   *
   * @memberof IAnchorProviderProps
   */
  onChange?: (currentActiveLink: string) => void;
}

export type IAnchorScrollViewProps = IScrollViewProps;
export type IAnchorTabsProps = ITabsProps;
export interface IAnchorTabProps extends Omit<ITabProps, 'title'> {
  /**
   * 锚点索引，格式为`#{dom-id}`
   *
   * @type {string}
   * @memberof IAnchorTabProps
   */
  index?: string;
  /**
   * 锚点内容
   *
   * @type {React.ReactNode}
   * @memberof IAnchorTabProps
   */
  title?: React.ReactNode;
}

export interface IAnchorBag {
  /**
   * 当前激活的锚点
   *
   * @type {(string | null)}
   * @memberof IAnchorBag
   */
  activeLink: string | null;
  /**
   * 同 IAnchorProviderProps.hash
   *
   * @type {boolean}
   * @memberof IAnchorBag
   */
  disableHash: boolean;
  /**
   * 同 IAnchorProviderProps.direction
   *
   * @type {('vertical' | 'horizontal')}
   * @memberof IAnchorBag
   */
  direction: 'vertical' | 'horizontal';
  /**
   * 垂直锚点中，指示器距离顶部的宽度
   *
   * @type {number}
   * @memberof IAnchorBag
   */
  indicatorTop: number;
  /**
   * 垂直锚点中，指示器的高度
   *
   * @type {number}
   * @memberof IAnchorBag
   */
  indicatorHeight: number;
  /**
   * 注册锚点，通常在组件mount后执行
   *
   * @memberof IAnchorBag
   */
  registerLink: (link: string) => void;
  /**
   * 注销锚点，通常在组件卸载时执行
   *
   * @memberof IAnchorBag
   */
  unregisterLink: (link: string) => void;
  /**
   * 获取自定义容器节点
   *
   * @memberof IAnchorBag
   */
  getContainer: (node: HTMLElement | null) => void;
  /**
   * 设置activeLink的值
   *
   * @memberof IAnchorBag
   */
  setCurrentActiveLink: (link: string) => void;
  /**
   * 根据当前页面的滚动情况，得到计算后处于激活态的锚点
   *
   * @memberof IAnchorBag
   */
  getCurrentAnchor: (offsetTop: number, bounds: number) => string;
  /**
   * 滚动到指定锚点
   *
   * @memberof IAnchorBag
   */
  handleScrollTo: (link: string) => void;
  /**
   * 处理滚动事件的函数
   *
   * @memberof IAnchorBag
   */
  handleScroll: () => void;
  /**
   * 更新内部indicator指示器的位置
   *
   * @memberof IAnchorBag
   */
  updateIndicator: (top: number, height: number) => void;
}
