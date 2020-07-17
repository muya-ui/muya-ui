import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec, IFontSizeSpec } from '../../interfaces';
import { IShadowsSpecRecord } from '../shadows';

export interface IUploadToken {
  shadow: IShadowsSpecRecord;
  borderRadius: string;
  img: {
    borderRadius: string;
    hoverOpacity: number;
  };
  closeIcon?: React.FunctionComponent<ISvgProps>;
  fileIcon?: React.FunctionComponent<ISvgProps>;
  pictureWidth: Record<IComponentSizeSpec, number>;
  card: {
    titleMarginTop: Record<IComponentSizeSpec, number>;
    subTitleMarginTop: number;
    size: Record<
      IComponentSizeSpec,
      {
        width: number;
        height: number;
        imgWidth: number;
      }
    >;
    fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
    iconFontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
    background: {
      hover: string;
      clicked: string;
    };
  };
  progress: {
    height: Record<IComponentSizeSpec, number>;
    marginTop: Record<IComponentSizeSpec, number>;
  };
  retryButton: {
    marginInOtherType: number;
    marginInTypePicture: Record<IComponentSizeSpec, number>;
  };
  errorView: {
    fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
    buttonSize: Record<IComponentSizeSpec, IComponentSizeSpec>;
  };
  spinSize: Record<IComponentSizeSpec, IComponentSizeSpec>;
}
