import { IComponentSizeSpec } from '../specs';

export interface ISpinToken {
  maskOpacity: number;
  icon: {
    fontSize: Record<IComponentSizeSpec, number>;
    padding: Record<IComponentSizeSpec, string>;
  };
  desc: {
    fontSize: Record<IComponentSizeSpec, number>;
    paddingRight: Record<IComponentSizeSpec, number>;
  };
}
