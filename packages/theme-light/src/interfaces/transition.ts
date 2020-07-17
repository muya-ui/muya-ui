import { IDurationSpec, IEasingSpec } from './specs';

export interface ITransition {
  spec: {
    duration: Record<IDurationSpec, number>;
    easing: Record<IEasingSpec, string>;
  };
  pattern: {
    easing: {
      enter: string;
      leave: string;
      status: string;
    };
    duration: {
      popper: number;
      dialog: number;
      status: number;
    };
  };
}
