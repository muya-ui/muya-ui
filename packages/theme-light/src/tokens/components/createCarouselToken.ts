import { ICarouselToken, IThemeWithoutComponents } from '../../interfaces';

export default function createCarouselToken({
  colors,
  opacity,
  size,
  spacing,
}: IThemeWithoutComponents): ICarouselToken {
  const { spec: colorsSpec } = colors;
  return {
    indicator: {
      bottom: 16,
      padding: '0 20px',
    },
    PagerButton: {
      bgColor: colorsSpec.dark,
      iconColor: colorsSpec.light,
      width: {
        xl: 30,
        l: 24,
        m: 20,
        s: 20,
      },
      height: {
        xl: 48,
        l: 40,
        m: 32,
        s: 32,
      },
      iconSize: {
        xl: 18,
        l: 16,
        m: 14,
        s: 14,
      },
      borderRadius: size.spec.borderRadius.s1,
      opacity: opacity.spec.s4,
      hoverOpacity: opacity.spec.s3,
    },
    IndexIndicator: {
      borderWidth: 4,
      selectedSize: 60,
      size: 32,
      color: colorsSpec.light,
      gutter: spacing.spec.s4,
      opacity: opacity.spec.s4,
      hoverOpacity: opacity.spec.s3,
    },
  };
}
