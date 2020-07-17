import { IImgCropperToken, IThemeWithoutComponents } from '../../interfaces';
import { colorUtils } from '../../utils';

export default function createImgCropperToken({
  colors,
  size,
}: IThemeWithoutComponents): IImgCropperToken {
  const {
    spec: { borderRadius },
  } = size;
  return {
    defaultSize: [210, 210],
    cropperMarginBottom: 24,
    maskColor: colorUtils.transparentize(0.5, colors.spec.dark),
    borderColor: colors.spec.light,
    borderRadius: {
      normal: '0px',
      circle: borderRadius.s4,
      round: borderRadius.s5,
    },
    rotatePaddingLeft: 16,
    sliderPadding: 16,
  };
}
