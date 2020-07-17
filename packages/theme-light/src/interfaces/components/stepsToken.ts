import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec } from '../specs';

type IStepStatus = 'wait' | 'finish' | 'process' | 'error' | 'hover' | 'clicked';

export interface IStepsToken {
  content: {
    fontSize: Record<IComponentSizeSpec, number>;
    lineHeight: number;
    fontWeight: number;
    color: Record<IStepStatus, string>;
    background: Record<IStepStatus, string>;
  };
  progressLine: {
    bgColor: string;
    finishBgColor: string;
  };
  title: {
    color: Record<IStepStatus, string>;
  };
  circle: {
    size: Record<IComponentSizeSpec, number>;
    marginRight: Record<IComponentSizeSpec, number>;
  };
  description: {
    maxWidth: number;
    marginLeft: Record<IComponentSizeSpec, number>;
    paddingLeft: Record<IComponentSizeSpec, number>;
    marginTop: number;
  };
  finishIcon?: React.FunctionComponent<ISvgProps>;
  errorIcon?: React.FunctionComponent<ISvgProps>;
}
