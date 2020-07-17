import React from 'react';
import { ReactourStepContentArgs } from 'reactour';

import { IPopperPlacement } from '../Popper';
import { ITriggerArrowStyle } from '../Trigger';
import { ICustomStyleBaseProps } from '../types';

/**
 * @styles content 内容
 * @styles skip 跳过
 * @styles next 下一项
 * @styles text 文本
 * @styles close 关闭
 * @styles inform inform 图标
 * @styles title 标题
 * @styles subTitle 子标题
 */
export type IGuideStyleKeys =
  | 'content'
  | 'skip'
  | 'next'
  | 'text'
  | 'close'
  | 'inform'
  | 'title'
  | 'subTitle';
export type IGuideStepPosition = 'left' | 'right' | 'top' | 'bottom';

export interface IGuideStep {
  /**
   * 引导文案或自定义引导框
   */
  content: React.ReactNode | ((args: ReactourStepContentArgs) => React.ReactNode);
  /**
   * 副标题文案
   */
  subTitle?: string;
  /**
   * DOM 选择器
   */
  selector: string;
  /**
   * 引导弹出位置。如果选择的 DOM 靠近屏幕右侧边界且 position 为 right，引导框位置将会自适应改变为 left
   * @default bottom
   */
  position?: IGuideStepPosition;
  /**
   * 箭头指示位置。特殊情况下需要自定义箭头位置，比如选择的 DOM 靠近屏幕右侧边界
   * @default `${position}-start`
   */
  arrowPosition?: IPopperPlacement;
}

export interface IGuideProps extends ICustomStyleBaseProps<IGuideStyleKeys> {
  /**
   * 引导步骤配置
   */
  steps: Array<IGuideStep>;
  /**
   * 关闭事件
   */
  onRequestClose: () => void;
  /**
   * 自定义箭头大小、颜色
   */
  arrowStyle?: ITriggerArrowStyle;
  /**
   * 是否显示 Close Icon
   * @default true
   */
  showClose?: boolean;
  /**
   * 是否显示跳过文案
   * @default true
   */
  showSkip?: boolean;
  /**
   * 跳过文案
   * @default 跳过引导
   */
  skipText?: string;
  /**
   * 下一步文案
   * @default 下一步(index/total)
   */
  nextText?: string;
  /**
   * 确认完成引导文案
   * @default 完成
   */
  confirmText?: string;
  /**
   * 高亮框边距
   * @default 0
   */
  maskSpace?: number;
  /**
   * 高亮框圆角
   * @default 0
   */
  rounded?: number;
  /**
   * 点击蒙层是否触发关闭事件
   * @default false
   */
  closeWithMask?: boolean;
  /**
   * 蒙层的 className
   */
  maskClassName?: string;
  /**
   * tooltips的 className
   */
  tooltipsClassName?: string;
  /**
   * selector 元素是否可以进行交互
   * @default true
   */
  disableInteraction?: boolean;
}
