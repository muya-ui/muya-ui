import { IBadgeToken, IThemeWithoutComponents } from '../../interfaces';

export default function createBadgeToken({
  typography,
  colors,
  zIndex,
  spacing,
}: IThemeWithoutComponents): IBadgeToken {
  const { spec: colorsSpec } = colors;
  const { spec: spacingSpec } = spacing;
  const { spec: typographySpec } = typography;
  return {
    // 定位
    offset: spacingSpec.s4,
    // 盒模型
    padding: {
      xl: spacingSpec.s3,
      l: spacingSpec.s3,
      m: spacingSpec.s3,
      s: spacingSpec.s2,
    },
    height: {
      dot: {
        xl: 10,
        l: 10,
        m: 10,
        s: 6,
      },
      text: {
        xl: 16,
        l: 16,
        m: 16,
        s: 12,
      },
    },
    // 颜色
    backgroundColor: {
      stroke: colorsSpec.light,
      fill: colorsSpec.danger2,
    },
    borderColor: colorsSpec.danger2,
    color: colorsSpec.light,
    // 文字
    fontWeight: typographySpec.fontWeight.semibold,
    fontSize: {
      xl: 12,
      l: 12,
      m: 12,
      s: 10,
    },
    // 其他
    zIndex: zIndex.spec.s1,
  };
}
