import { IImgSuffix } from '@muya-ui/utils';

import { IImgOption, IImgPureProps } from './types';

export interface IImgHookArgs extends Pick<IImgPureProps, 'src' | 'onLoaded' | 'onError'> {
  suffixs: IImgSuffix;
  options: IImgOption;
  imgRef: React.RefObject<HTMLElement>;
  loadingDelay?: number;
}
