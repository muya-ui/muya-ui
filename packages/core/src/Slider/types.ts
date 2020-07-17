import { ITriggerProps } from '../Trigger/types';
import { ICustomStyleBaseProps } from '../types';
import { Omit } from '../types/index';

/**
 * @styles startCircle 第一个滑块
 * @styles endCircle 第2个滑块
 * @styles markPoint 刻度在轨道上的点
 * @styles markPointInclude 刻度在轨道上的点，同时被区间包含
 * @styles marksRow 刻度的行
 * @styles markLabel 刻度的Label
 * @styles track 轨道
 * @styles range 激活区间
 */
export type ISliderStyleKeys =
  | 'startCircle'
  | 'endCircle'
  | 'markPoint'
  | 'markPointInclude'
  | 'marksRow'
  | 'markLabel'
  | 'track'
  | 'range';

export interface ISliderMarkItem {
  /** mark 容器的样式 */
  style?: React.CSSProperties;
  /** 标签本身 */
  label: React.ReactNode;
}

export type ISliderMark = React.ReactNode | ISliderMarkItem;

export interface ISliderMarks {
  /** key 必须在 min 和 max 之间的数值 */
  [key: number]: ISliderMark;
}

export interface ISliderBaseProps extends ICustomStyleBaseProps<ISliderStyleKeys> {
  /**
   * 最小值
   * @default 0
   */
  min?: number;
  /**
   * 最大值
   * @default 100
   */
  max?: number;
  /** 步进值 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示提示 */
  tooltipVisible?: boolean;
  /** 提示的位置 */
  tooltipPlacement?: ITriggerProps['placement'];
  /** 是否垂直 */
  vertical?: boolean;
  /**
   * 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
   */
  marks?: ISliderMarks;
  /** 是否只能拖到刻度上 */
  marksOnly?: boolean;
  /** 不显示刻度的标签 */
  markLabelDisabled?: boolean;
  /**
   * 自动吸附到刻度上的距离，注意这里指的数值[min ~ max]，而不是UI上的距离
   * @default 1
   */
  snapDistance?: number;
  /**
   * 鼠标移动的节流设置
   * @default 50
   */
  mousemoveThrottleDelay?: number;
  /**
   * 数值有效小数位数
   * @default 2
   */
  fractionDigits?: number;
  /**
   * Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。
   * @default (value: number) => string
   * */
  tipFormatter?: (value: number) => React.ReactNode;
}

export interface ISliderPureProps extends ISliderBaseProps {
  /** Slider 的值 */
  value?: number;
  /** Slider 的默认值 */
  defaultValue?: number;
  /** 值变化事件 */
  onChange?: (value: number) => void;
  /** onmouseup 触发 */
  onAfterChange?: (value: number) => void;
}

export interface IRangeSliderPureProps extends ISliderBaseProps {
  /** RangeSlider 的值 */
  value?: number[];
  /** RangeSlider 的默认值 */
  defaultValue?: number[];
  onChange?: (value: [number, number]) => void;
  onAfterChange?: (value: [number, number]) => void;
}

type IDOMBase = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>;

export type ISliderProps = ISliderPureProps & IDOMBase;
export type IRangeSliderProps = IRangeSliderPureProps & IDOMBase;
