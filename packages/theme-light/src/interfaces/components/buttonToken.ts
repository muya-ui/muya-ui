import { IStatusColor } from '../colors';
import { IComponentSizeSpec } from '../specs';

type IButtonType =
  | 'primary'
  | 'strong'
  | 'normal'
  | 'secondary'
  | 'weak'
  | 'danger'
  | 'success'
  | 'warning';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export interface IButtonToken {
  padding: Record<IComponentSizeSpec, number>;
  borderRadius: {
    normal: string;
    group: string;
    circle: string;
    round: string;
  };
  /** 相邻按钮间距 */
  siblingSpacing: Record<IComponentSizeSpec, number>;
  /** 默认按钮文字的 font-weight */
  fontWeight: number;
  /** lighter 按钮文字的 font-weight */
  fineFontWeight: number;
  typeColor: Record<IButtonType, IStatusColor>;
  lightTypeColor: Record<IButtonType, IStatusColor>;

  /** 背景色是否使用 background-image */
  typeBgImage: PartialRecord<IButtonType, IStatusColor>;
  /** plain=false 背景色单独设置 */
  typeBgColor: PartialRecord<IButtonType, IStatusColor>;
  /** 单独设置每个类型的文字色 */
  textColor: PartialRecord<IButtonType, string>;
  /** 单独设置每个类型的 border 色 */
  borderColor: Record<IButtonType, string>;
  /** 文字按钮的类型色，默认用的 typeColor 可以单独设置 */
  inlineButtonTypeColor: PartialRecord<IButtonType, IStatusColor>;
  statusOpacity: {
    hover: number;
    click: number;
  };
  weakLevels: IStatusColor[];
  /** 按钮的默认文字颜色 */
  defaultColor: string;
  /** 蒙层按钮的背景色 */
  maskColor: string;
  fontSize: Record<IComponentSizeSpec, number>;
  lineHeight: Record<IComponentSizeSpec, number>;
  sidePadding: number;
  /** 按钮 z-index 优先级，在 ButtonGroup 中用到 */
  zIndexOrder: Record<IButtonType, number>;
  /** hover的 */
  hoverZIndex: number;
  /** 选中的 */
  selectedZIndex: number;
  /** plain是否代表淡色按钮 **/
  plainIsLight: boolean;
  /** loading 节点的位置 */
  loadingPosition: 'suffix' | 'prefix';
  /** 主题默认的shape **/
  defaultShape: string;
  /** plain 按钮 hover、click 是否高亮 */
  plainColorHighlight: boolean;
}
