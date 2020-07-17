import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { ReactNode } from 'react';

import { IImgProps } from '../Img';
import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

export interface ICarouselPagerButtonPureProps extends ISizeSpecBaseProps {
  /**
   * 箭头方向
   * @default 'left'
   */
  arrow?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * 贴边的方向
   */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * 按钮的形状
   */
  shape?: 'rect' | 'circle';
  /**
   * 设置背景透明
   */
  transparent?: boolean;
  /**
   * 自定义 icon 节点
   */
  icon?: ReactNode;
  /**
   * 按钮是否禁用
   */
  disabled?: boolean;
  /**
   * 重置一下 onClick
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
}
export type ICarouselPagerButtonProps = ICarouselPagerButtonPureProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick'>;

/**
 * @styles index 默认样式
 * @styles active 激活状态
 */
export type ICarouselIndexIndicatorStyleKeys = 'index' | 'active';
export interface ICarouselIndexIndicatorPureProps
  extends ICustomStyleBaseProps<ICarouselIndexIndicatorStyleKeys> {
  /**
   * 当前索引
   */
  index: number;
  /**
   * 索引的数量
   */
  num: number;
  /**
   * 索引的颜色
   */
  color?: string;
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click';
  /**
   * 索引变化
   */
  onChange?: (index: number) => void;
}
export type ICarouselIndexIndicatorProps = ICarouselIndexIndicatorPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

/**
 * @styles pagerPrev Prev分页按钮容器
 * @styles pagerPrevBtn Prev分页按钮
 * @styles pagerNext Next分页按钮容器
 * @styles pagerNextBtn Next分页按钮
 * @styles swipe swipe
 * @styles indicator 指示器
 * @styles img 图片节点
 */
export type ICarouselStyleKeys =
  | 'pagerPrev'
  | 'pagerPrevBtn'
  | 'pagerNext'
  | 'pagerNextBtn'
  | 'swipe'
  | 'indicator'
  | 'img';

export interface ICarouselImgItem {
  /** 图片地址 */
  imgSrc: string;
  /** 图片子节点 */
  children?: React.ReactNode;
  /** 改图片的props */
  imgProps?: IImgProps;
}

export type ICarouselImg = ICarouselImgItem | string;

export interface ICarouselPureProps extends ICustomStyleBaseProps<ICarouselStyleKeys> {
  /**
   * 图片数组
   */
  imgs: ICarouselImg[];
  /**
   * 单位秒
   * @default 0
   */
  autoplay?: number;
  /**
   * 切换动画的时长，单位毫秒
   * @default 300ms
   */
  duration?: number;
  /**
   * 箭头显示模式
   * * `always` 永远显示
   * * `hover` hover显示
   * * `none` 不显示
   *
   * @default 'always'
   */
  arrow?: 'always' | 'hover' | 'none';

  /**
   * 控制箭头是否可用，当为 `transition-end` 时，只有动画结束才可用
   * @default 'always'
   */
  arrowEnabled?: 'always' | 'transition-end';
  /**
   * 箭头的尺寸设置
   *
   * @default 'm'
   */
  arrowSize?: IComponentSizeSpec;
  /**
   * 图片是否设置懒加载，只有 swipe 有用
   */
  lazy?: 'on' | 'off';
  /**
   * 索引指示器位置
   * @default 'center'
   */
  indicator?: 'center' | 'left' | 'right' | 'none';
  /**
   * indicator样式重置
   */
  indicatorStyles?: ICarouselIndexIndicatorPureProps['styles'];
  /**
   * 索引指示器触发方式
   */
  indicatorTrigger?: ICarouselIndexIndicatorPureProps['trigger'];
  /**
   * 动画形式
   * * `fade` 渐隐渐现
   * * `grow` grow
   * * `swipe` 滑动
   */
  animation?: 'fade' | 'grow' | 'swipe';
  /**
   * 默认图片的位置
   * @default 0
   */
  defaultIndex?: number;
  /**
   * 是否开启检查子节点变更
   * 开启了以后要注意，传到 Swipe 中的 children 需使用 React.useMemo 包裹
   * 注意只在 `animation="swipe"` 起作用
   */
  enableDiffChildren?: boolean;
  /** 轮播发生变化 */
  onChange?(src: string, index: number): void;
}

export type ICarouselProps = ICarouselPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
