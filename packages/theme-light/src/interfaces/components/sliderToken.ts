export interface ISliderToken {
  /** 滑块大小 */
  circleSize: number;
  circleColor: string;
  circleBorderWidth: number;
  circleBorderColor: string;
  circleBorderHoverColor: string;
  /** 滑块激活的时候的大小 */
  circleActiveSize: number;
  /** 滑块激活的时候的外圈border的尺寸 */
  circleActiveBorderSize: number;
  /** 滑块激活的时候的外圈border的颜色 */
  circleActiveBorderColor: string;
  circleActiveBoxShadow: string;
  /** 轨道的高度 */
  trackHeight: number;
  /** 轨道的背景色 */
  trackBgColor: string;
  trackHoverBgColor: string;
  trackActiveBgColor: string;
  /** 根节点的 */
  rootPadding: number;
  /** 刻度和轨道间的距离 */
  markRowGutter: number;
  markPointSize: number;
  markPointBorderSize: number;
  markPointBorderColor: string;
}
