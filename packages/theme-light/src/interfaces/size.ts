import { IBorderRadiusSpec, IComponentSizeSpec } from './specs';

export interface ISize {
  spec: {
    borderRadius: Record<IBorderRadiusSpec, string>;
    width: Record<IComponentSizeSpec, number>;
    height: Record<IComponentSizeSpec, number>;
  };
  pattern: {
    expandIcon: { width: number; height: number };
  };
}
