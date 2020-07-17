export interface ISvgPureProps {
  /** svg 元素的 viewBox */
  viewBox?: string;
  /** svg 元素的类名 */
  className?: string;
  /** svg 元素的颜色 */
  color?: string;
  /** svg 元素的字号 */
  fontSize?: string | number;
  /** 子节点 */
  children?: React.ReactElement[] | React.ReactElement;
  /** 图标背景元素的百分比尺寸，宽/高默认为[0.7, 0.7] */
  bgSize?: number[];
  /** 图标背景元素颜色，不传入则不展示背景元素 */
  bgColor?: string;
}

export type ISvgProps = ISvgPureProps & React.SVGAttributes<SVGSVGElement>;
