import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

type IRadioIconStatus =
  | 'hover'
  | 'click'
  | 'checked'
  | 'unChecked'
  | 'checkedHover'
  | 'checkedClick';

export interface IRadioToken {
  marginRightInGroup: number;
  fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  iconSize: Record<IComponentSizeSpec, number>;
  checkedCenterSize: Record<IComponentSizeSpec, number>;
  checkedCenterBg: string;
  iconColor: Record<IRadioIconStatus, string>;
  borderColor: Record<IRadioIconStatus, string>;
}
