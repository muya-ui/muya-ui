import { IOpacitySpec } from './specs';

export interface IOpacityPattern {
  mask: number;
  maskButton: number;
  disabled: number;
}

export interface IOpacity {
  spec: Record<IOpacitySpec, number>;
  pattern: IOpacityPattern;
}
