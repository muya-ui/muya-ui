import { ISliderBaseProps } from '../Slider/types';
import { ICustomStyleBaseProps } from '../types';

/**
 * @styles container 剪裁区域容器
 * @styles mask 剪裁区域遮罩
 * @styles content 剪裁区域内容，放图片的 div
 * @styles img 图片节点
 * @styles row 操作区域的容器
 * @styles zoomOut 缩小按钮的 div
 * @styles zoomButton 缩放按钮
 * @styles sliderContainer slider容器
 * @styles slider slider
 * @styles rotateContainer 旋转按钮的 div
 * @styles rotateButton 旋转按钮
 * @styles zoom 放大按钮的 div
 */
export type IImgCropperStyleKeys =
  | 'container'
  | 'mask'
  | 'content'
  | 'img'
  | 'row'
  | 'zoomOut'
  | 'zoomButton'
  | 'sliderContainer'
  | 'slider'
  | 'rotateContainer'
  | 'rotateButton'
  | 'zoom';

export interface IImgCropperPureProps extends ICustomStyleBaseProps<IImgCropperStyleKeys> {
  /** 图片地址 */
  src?: string;
  /**
   * 剪裁框的尺寸
   */
  size?: [number, number];
  /**
   * 剪裁区域外边的黑色区域是根据 padding 控制的，可以覆盖这个，快速设置
   * 默认是 (size / 0.7 - size) / 2
   */
  boxPadding?: React.CSSProperties['padding'];
  /**
   * 剪裁框的形状
   * @default 'normal'
   */
  shape?: 'normal' | 'round' | 'circle';
  /**
   * 缩放的步长，scale = scale * (1 ± wheelScaleStep)
   * 必须大于 0，小于 1
   * @default 0.01
   */
  wheelScaleStep?: number;
  /**
   * 禁用滚轮缩放
   */
  disableWheel?: boolean;
  /**
   * 给 Slider 传
   * @default 0.1
   */
  scaleStep?: number;
  /**
   * 必须 >= 1
   * @default 1
   */
  scaleMin?: number;
  /**
   * 必须 >= 1
   * @default 4
   */
  scaleMax?: number;
  /**
   * 默认的缩放比例
   * @default 1
   */
  defaultScale?: number;
  /**
   * 回弹检查的延时时间
   * @default 200ms
   */
  backDelay?: number;
  /**
   * slider 的样式重置
   */
  sliderStyles?: ISliderBaseProps['styles'];
}

export interface IImgCropperElement extends HTMLDivElement {
  /** 获取剪裁的图片 canvas 节点 */
  getImg(radio?: number): HTMLCanvasElement | null;
}

export type IImgCropperProps = IImgCropperPureProps & React.HTMLAttributes<HTMLDivElement>;
