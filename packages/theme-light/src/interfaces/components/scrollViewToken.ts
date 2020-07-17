import { IComponentSizeSpec } from '../specs';

export interface IScrollViewToken {
  scrollBar: {
    size: Record<IComponentSizeSpec, number>;
    borderRadius: string;
    background: string;
    hoverBackground: string;
  };
  padding: number;
}
