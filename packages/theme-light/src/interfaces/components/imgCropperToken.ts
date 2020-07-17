import { ISvgProps } from '../../components/SvgIcon';

export interface IImgCropperToken {
  /** 默认的尺寸 */
  defaultSize: [number, number];
  /** 容器的边距 */
  cropperMarginBottom: number;
  /** 遮罩的颜色 */
  maskColor: string;
  /** 遮罩的边框颜色 */
  borderColor: string;
  borderRadius: Record<'normal' | 'circle' | 'round', string>;
  rotateIcon?: React.FunctionComponent<ISvgProps>;
  zoomIcon?: React.FunctionComponent<ISvgProps>;
  zoomOutIcon?: React.FunctionComponent<ISvgProps>;
  rotatePaddingLeft: number;
  sliderPadding: number;
}
