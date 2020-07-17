import { IZIndexSpec } from './specs';

export interface IZIndex {
  spec: Record<IZIndexSpec, number>;
  pattern: {
    fixed: number;
    dialog: number;
    toast: number;
    popper: number;
  };
}
