import { IComponentSizeSpec } from '../specs';

export interface IBadgeToken {
  padding: Record<IComponentSizeSpec, number>;
  fontWeight: number;
  fontSize: Record<IComponentSizeSpec, number>;
  height: {
    dot: Record<IComponentSizeSpec, number>;
    text: Record<IComponentSizeSpec, number>;
  };
  offset: number;
  zIndex: number;
  backgroundColor: {
    stroke: string;
    fill: string;
  };
  borderColor: string;
  color: string;
}
