import { ISizeSpecBaseProps } from '../types';

export interface IInputNumberArrowStatusProps {
  up: boolean;
  down: boolean;
}

export interface IInputNumberArrowWrapperProps extends ISizeSpecBaseProps {
  arrowDisabled: IInputNumberArrowStatusProps;
  changeStep: (type: 'up' | 'down') => void;
  iconSize?: number;
}
