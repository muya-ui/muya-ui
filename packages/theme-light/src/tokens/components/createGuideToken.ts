import { IGuideToken, IThemeWithoutComponents } from '../../interfaces';
import { colorUtils } from '../../utils';

export default function createGuideToken({
  spacing,
  colors,
  opacity,
}: IThemeWithoutComponents): IGuideToken {
  const { spec } = spacing;
  return {
    titleLevel: 5,
    closeIcon: {
      right: spec.s3,
      top: spec.s3,
      color: colors.pattern.icon.normal,
      fontSize: 10,
    },
    toolTips: {
      minWidth: 200,
      padding: `${spec.s6}px`,
      space: 20,
      boxShadow: '',
      borderRadius: 4,
    },
    nextButton: {
      marginTop: spec.s5,
    },
    mask: {
      opacity: 1,
      color: colorUtils.transparentize(opacity.pattern.maskButton, colors.spec.dark),
    },
    informIcon: {
      marginRight: spec.s4,
      color: colors.pattern.feature.info,
    },
    skip: {
      bottom: -32,
    },
  };
}
