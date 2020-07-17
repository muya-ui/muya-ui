import { IThemeWithoutComponents, IUploadToken } from '../../interfaces';

export default function createUploadToken({
  colors,
  shadows,
  size,
  opacity,
  spacing,
}: IThemeWithoutComponents): IUploadToken {
  const {
    spec: { borderRadius },
  } = size;
  const { spec: spacingSpec } = spacing;
  return {
    shadow: shadows.spec.s2,
    borderRadius: borderRadius.s2,
    img: {
      borderRadius: borderRadius.s2,
      hoverOpacity: opacity.spec.s1,
    },
    pictureWidth: {
      s: 56,
      m: 80,
      l: 96,
      xl: 96,
    },
    card: {
      titleMarginTop: {
        s: spacingSpec.s2,
        m: spacingSpec.s4,
        l: spacingSpec.s4,
        xl: spacingSpec.s4,
      },
      subTitleMarginTop: spacingSpec.s2,
      size: {
        s: {
          width: 200,
          height: 64,
          imgWidth: 48,
        },
        m: {
          width: 240,
          height: 80,
          imgWidth: 64,
        },
        l: {
          width: 280,
          height: 96,
          imgWidth: 80,
        },
        xl: {
          width: 280,
          height: 96,
          imgWidth: 80,
        },
      },
      fontLevel: {
        s: 's1',
        m: 's2',
        l: 's2',
        xl: 's2',
      },
      iconFontLevel: {
        s: 's2',
        m: 's2',
        l: 's2',
        xl: 's3',
      },
      background: {
        hover: colors.spec.neutral10.normal,
        clicked: colors.spec.neutral10.hover,
      },
    },
    progress: {
      height: {
        s: 4,
        m: 4,
        l: 6,
        xl: 6,
      },
      marginTop: {
        s: spacingSpec.s2,
        m: spacingSpec.s2,
        l: spacingSpec.s3,
        xl: spacingSpec.s3,
      },
    },
    retryButton: {
      marginInOtherType: spacingSpec.s4,
      marginInTypePicture: {
        s: spacingSpec.s2,
        m: spacingSpec.s2,
        l: spacingSpec.s3,
        xl: spacingSpec.s3,
      },
    },
    errorView: {
      fontLevel: {
        s: 's1',
        m: 's1',
        l: 's2',
        xl: 's2',
      },
      buttonSize: {
        s: 's',
        m: 's',
        l: 'm',
        xl: 'm',
      },
    },
    spinSize: {
      s: 's',
      m: 's',
      l: 'm',
      xl: 'm',
    },
  };
}
