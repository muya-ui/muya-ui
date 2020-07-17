import { IImgPreviewToken, IThemeWithoutComponents } from '../../interfaces';

export default function createImgPreviewToken({
  spacing,
  typography,
  colors,
  shadows,
  opacity,
}: IThemeWithoutComponents): IImgPreviewToken {
  const { spec: spacingSpec } = spacing;
  const {
    spec: { fontSize },
  } = typography;
  return {
    spinColor: colors.spec.light,
    responsiveWidth: [900, 1128],
    imgWrapper: {
      marginTop: spacingSpec.s9,
      scrollBarSize: spacingSpec.s2,
    },
    imgPagination: {
      paddingVertical: spacingSpec.s9,
      height: 120,
      itemWidth: 64,
      itemHeight: 64,
      itemMrginRight: spacingSpec.s5,
      itemOpacity: opacity.spec.s2,
      itemActiveBorderSize: 3,
      buttonWidth: 30,
      buttonHeight: 48,
      buttonFontSize: fontSize.s4,
      buttonOffset: -42,
      borderActiveColor: colors.spec.brand,
    },
    pageButton: {
      fontSize: 40,
      color: colors.spec.light,
      boxShadow: shadows.spec.s2,
      opacity: opacity.spec.s3,
      spacing: spacingSpec.s7,
    },
    closeIcon: {
      top: spacingSpec.s9,
      right: spacingSpec.s9,
      fontSize: fontSize.s6,
      color: colors.pattern.icon.normal,
    },
    imgActions: {
      bottom: spacingSpec.s9,
    },
  };
}
