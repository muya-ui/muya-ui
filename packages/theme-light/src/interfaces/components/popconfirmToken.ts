import { ISvgProps } from '../../components/SvgIcon';

export type IPopconfirmIconType = 'error' | 'info' | 'warning';

export interface IPopconfirmToken {
  icons?: Record<IPopconfirmIconType, React.FunctionComponent<ISvgProps>>;
  width: string;
  paddingLeftWithType: number;
  translateX: number;
}
