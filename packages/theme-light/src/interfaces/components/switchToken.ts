import { IComponentSizeSpec } from '../specs';

export interface ISwitchToken {
  height: Record<IComponentSizeSpec, number>;
  minWidth: Record<IComponentSizeSpec, number>;
  borderRadius: string;
  fontSize: Record<IComponentSizeSpec, number>;
  activeBoxShadow: string;
  background: {
    checked: string;
    unChecked: string;
  };
  circleBackground: string;
  childrenMarginLeft: {
    checked: number;
    unChecked: number;
  };
  childrenMarginRight: {
    checked: number;
    unChecked: number;
  };
}
