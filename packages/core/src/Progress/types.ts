import { ISvgProps } from '@muya-ui/theme-light';

import { CSSProperties } from 'react';

import { Omit } from '../types';

export interface IProgressProps extends Omit<ISvgProps, 'children'> {
  /**
   * 进度条类型
   * @default 'line'
   */
  type?: 'line' | 'circle';
  /**
   * 进度条状态
   *
   * @type {('normal' | 'success' | 'error')}
   * @memberof IProgressProps
   * @default 'normal'
   */
  status?: 'normal' | 'success' | 'error';
  /**
   * 进度条的百分比值
   *
   * @type {number}
   * @memberof IProgressProps
   * @default 0
   */
  progress?: number;
  /**
   * 进度条主体的颜色
   *
   * @type {string}
   * @memberof IProgressProps
   */
  progressColor?: string;
  /**
   * 进度条背景的颜色
   *
   * @type {string}
   * @memberof IProgressProps
   */
  bgColor?: string;
  /**
   * 文字的颜色
   *
   * @type {string}
   * @memberof IProgressProps
   */
  textColor?: string;
  /**
   * 是否需要动画效果
   *
   * @type {boolean}
   * @memberof IProgressProps
   * @default true
   */
  animate?: boolean;
  /**
   * 动画持续时间
   *
   * @type {number}
   * @memberof IProgressProps
   */
  animationDuration?: number;
  /**
   * 是否展示百分比文案
   *
   * @type {boolean}
   * @memberof IProgressProps
   * @default true
   */
  showPercentage?: boolean;
  /**
   * 是否展示 "%"
   *
   * @type {boolean}
   * @memberof IProgressProps
   * @default true
   */
  showPercentageSymbol?: boolean;
  /**
   * 文案与"%"之间的距离
   *
   * @type {number}
   * @memberof IProgressProps
   * @default 0
   */
  percentSpacing?: number;
  /**
   * 百分比文字节点的样式
   *
   * @type {CSSProperties}
   * @memberof IProgressProps
   */
  textStyle?: CSSProperties;
  /**
   * 自定义类名
   *
   * @type {string}
   * @memberof IProgressProps
   */
  className?: string;
  /**
   * 自定义样式
   *
   * @type {CSSProperties}
   * @memberof IProgressProps
   */
  style?: CSSProperties;
  /**
   * 环状进度条的宽度，只能传入百分比数值
   * @default 12.5
   * @type {string}
   * @memberof IProgressProps
   */
  circleLineWidth?: number;
  /**
   * 环状进度条两端的形状是否为圆形
   *
   * @default true
   * @type {boolean}
   * @memberof IProgressProps
   */
  roundedStroke?: boolean;
}
